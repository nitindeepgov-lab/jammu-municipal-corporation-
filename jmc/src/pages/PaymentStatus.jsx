import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SubpageTemplate from '../components/SubpageTemplate'
import { STRAPI_URL } from '../config/api'

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
  ERROR: 'error',
}

const TOKEN_KEYS = [
  'transaction_response',
  'transactionResponse',
  'txnResponse',
  'response',
  'jws',
  'payload',
]

export default function PaymentStatus() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState(STATUS.IDLE)
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState(null)

  const token = useMemo(() => {
    for (const key of TOKEN_KEYS) {
      const value = searchParams.get(key)
      if (value) return value
    }
    return ''
  }, [searchParams])

  useEffect(() => {
    if (!token) {
      setStatus(STATUS.IDLE)
      setMessage('No payment response token was found in the return URL.')
      return
    }

    const verify = async () => {
      setStatus(STATUS.LOADING)
      setMessage('Verifying payment status...')

      try {
        const res = await fetch(`${STRAPI_URL}/api/billdesk/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transactionResponse: token }),
        })

        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(data.error?.message || 'Unable to verify payment.')
        }

        const result = data.data || {}
        const statusMessage =
          result.statusMessage ||
          (result.status === '0300'
            ? 'SUCCESS'
            : result.status === '0002'
            ? 'PENDING'
            : 'FAILED')

        const mappedStatus =
          statusMessage === 'SUCCESS'
            ? STATUS.SUCCESS
            : statusMessage === 'PENDING'
            ? STATUS.PENDING
            : STATUS.FAILED

        setStatus(mappedStatus)
        setMessage(statusMessage)
        setDetails({
          orderId: result.orderId || '',
          transactionId: result.transactionId || '',
          amount: result.amount || '',
          authStatus: result.status || '',
          statusMessage,
        })
      } catch (error) {
        setStatus(STATUS.ERROR)
        setMessage(error.message || 'Unable to verify payment.')
      }
    }

    verify()
  }, [token])

  const statusLabel =
    status === STATUS.SUCCESS
      ? 'Payment Successful'
      : status === STATUS.PENDING
      ? 'Payment Pending'
      : status === STATUS.FAILED
      ? 'Payment Failed'
      : status === STATUS.ERROR
      ? 'Verification Error'
      : 'Payment Status'

  return (
    <SubpageTemplate
      title="Payment Status"
      breadcrumb={[
        { name: 'Citizen Services', to: '/services' },
        { name: 'Payment Status', to: null },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-gray-900 font-semibold text-base">{statusLabel}</p>
              <p className="text-gray-400 text-xs mt-1">Return URL processing page</p>
            </div>
            <Link
              to="/pay-online"
              className="text-xs text-[#003366] font-semibold hover:underline"
            >
              Back to Pay Online
            </Link>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">{message}</p>
          </div>

          {status === STATUS.LOADING && (
            <div className="mt-4 text-xs text-gray-400">Please wait...</div>
          )}

          {details && (
            <div className="grid sm:grid-cols-2 gap-4 mt-6 text-xs">
              <div>
                <p className="text-gray-400">Order ID</p>
                <p className="text-gray-900 font-mono">{details.orderId || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Transaction ID</p>
                <p className="text-gray-900 font-mono">{details.transactionId || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Amount</p>
                <p className="text-gray-900">₹ {details.amount || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Auth Status</p>
                <p className="text-gray-900">{details.authStatus || '-'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs text-gray-600">
          If you do not see a final status, please verify the payment in the CMS using the receipt Order ID or Transaction ID.
        </div>
      </div>
    </SubpageTemplate>
  )
}
