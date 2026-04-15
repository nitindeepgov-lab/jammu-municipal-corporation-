# BillDesk UAT Escalation Pack - Empty Create-Order Response

## Executive Summary
We are facing a production-blocking issue in BillDesk UAT. Authenticated create-order calls are returning HTTP 200 with an empty body, while control probes from the same environment return normal error JSON. This strongly indicates gateway edge/security handling, routing profile mismatch, or allowlisting/policy mismatch, not client-side JOSE parsing.

## Business Impact
- Online payment initialization is failing.
- Citizens cannot start payment flow.
- Endpoint impacted: create-order.
- Severity requested: P1.

## Integration Context
- Merchant ID: UATJMC02V2
- Client ID: uatjmc02v2
- Environment: UAT
- API Endpoint: https://uat1.billdesk.com/u2/payments/ve1_2/orders/create
- Mode: Symmetric JOSE (JWE plus JWS)
- Platform: Render (Node/Strapi)
- Observed Render egress IP: 74.220.48.243

## Error Timeline and Evidence

### Phase 1: Payload validation error (resolved)
- BillDesk response indicated invalid additional_info.
- Observed error code: AIIDE0001.
- Action taken: additional_info changed to strict 7-value string array.
- Result: moved past this specific validation failure.

### Phase 2: JOSE parsing errors while troubleshooting (resolved as parser hardening)
- Observed app-side error: Invalid Compact JWS.
- Action taken:
   - Added support for direct JWE responses.
   - Added support for plain JSON response bodies.
   - Added support for JSON-quoted token strings.
- Result: parser coverage improved; not the primary blocker now.

### Phase 3: Current blocker (active)
- Authenticated create-order call receives:
   - HTTP 200
   - Content-Length: 0
   - No Content-Type
   - Set-Cookie present (TS token)
   - Empty body
- Retry with cookie reuse still returns same empty body.
- Sample trace IDs from empty responses:
   - 1776229789475fa629dfd85ea79776d71d5
   - 177622979034400d0fb8cc63a09288f5f0b

### Control evidence from same environment
- Invalid token probe from Render path returns normal structured error:
   - HTTP 401
   - application/json
   - error_code GNAUE0003 (Authentication failed)
- This proves endpoint reachability and baseline routing are functional.

### Comparative evidence from local signed JOSE probe
- Same merchant/client/key setup, signed request to same UAT endpoint.
- Returned non-empty JOSE error payload decoding to:
   - HTTP 401
   - error_code GNAUE0006
   - message: Request from unauthorized ip
- This confirms BillDesk applies source-IP based policy checks in this flow.

## What We Already Changed on Our Side
1. additional_info format corrected to strict 7 string entries.
2. JOSE response parser hardened for JWS, direct JWE, JSON body, and quoted token body.
3. Byte-level response logging added for status, content-length, content-type, token segments, and headers.
4. Retry logic added for empty 200 responses.
5. Retry with TS cookie propagation implemented.
6. BD-Timestamp unit toggled and tested in runtime diagnostics.
7. Control probes executed from same runtime path.

## Current Technical Conclusion
Most probable causes are on BillDesk side of the UAT path:
- IP allowlist or egress network policy mismatch for authenticated JOSE flow.
- Merchant-client routing/profile mismatch.
- Edge security/WAF policy suppressing body for this merchant profile.

This is unlikely to be a simple client parsing issue, because the body is empty before parsing.

## Support We Should Demand from BillDesk

### Support Type and Priority
1. Raise as P1 integration incident.
2. Assign L3 gateway/network engineer plus merchant onboarding/profile engineer.
3. Start a live bridge call for coordinated trace validation.

### Specific Actions to Demand
1. Confirm and apply exact source IP allowlisting for UAT merchant profile, including all required CIDR or fixed egress IPs.
2. Validate merchant-client-key mapping for UATJMC02V2 and uatjmc02v2 on create-order route.
3. Share gateway-side logs for our trace IDs and exact rejection reason.
4. Confirm if edge policy can return empty 200 with TS cookie and no body, and under what conditions.
5. Confirm mandatory header requirements for this merchant profile, including timestamp expectations.
6. Provide a known-good signed test transaction from their side against our merchant profile and share expected response contract.
7. Provide written RCA and remediation ETA after fix.

### SLA to Request
1. Initial technical acknowledgement within 1 hour.
2. L3 diagnostic update within 4 hours.
3. Final fix or mitigation plan within 1 business day.

## Ready-to-Send Email Draft

Subject: P1 UAT Incident - Authenticated Create-Order Returning Empty 200 Response

Hello BillDesk Support Team,

We need urgent L3 support for a UAT production-blocking issue.

Merchant details:
- Merchant ID: UATJMC02V2
- Client ID: uatjmc02v2
- Environment: UAT
- Endpoint: /u2/payments/ve1_2/orders/create
- Integration mode: Symmetric JOSE (JWE plus JWS)

Issue:
- Authenticated create-order requests consistently return HTTP 200 with empty body.
- Response has Content-Length 0, no Content-Type, and TS cookie present.
- Retry with cookie reuse still returns empty body.

Sample trace IDs:
- 1776229789475fa629dfd85ea79776d71d5
- 177622979034400d0fb8cc63a09288f5f0b

Supporting evidence:
1. Control probe from same runtime path with invalid token returns normal 401 JSON (error_code GNAUE0003).
2. Local signed JOSE probe returns non-empty 401 JOSE payload decoding to GNAUE0006 (Request from unauthorized ip).
3. This indicates network/profile/security policy behavior on authenticated flow rather than client parser failure.

Observed egress IP from runtime diagnostics:
- 74.220.48.243

Urgent requests:
1. Confirm and apply source IP allowlisting for this merchant profile.
2. Validate merchant-client-key mapping and routing profile for create-order.
3. Share gateway-side logs for above trace IDs and exact rejection reason.
4. Confirm if edge policy can produce empty 200 with TS cookie and no body.
5. Provide L3 bridge support and remediation ETA.

Please treat this as P1 and assign network plus onboarding/profile specialists.

Regards,
JMC Integration Team

## Internal Checklist Before Sending
1. Confirm current egress IP again from live runtime diagnostics.
2. Attach latest failing trace IDs and timestamps.
3. Attach one control-probe success sample and one authenticated-empty sample.
4. Include contact person and preferred bridge-call window.
