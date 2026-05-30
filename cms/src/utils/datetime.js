'use strict';

const IST_OFFSET_MINUTES = 330; // UTC+5:30

/**
 * Generate BD-Timestamp in YYYYMMDDHHmmss format (IST).
 * BillDesk expects IST. Render servers run in UTC, so we shift explicitly.
 *
 * @param {Date} [date=new Date()] - Date object
 * @returns {string} Timestamp in YYYYMMDDHHmmss format
 */
function generateTimestamp(date = new Date()) {
  const istDate = new Date(date.getTime() + IST_OFFSET_MINUTES * 60 * 1000);

  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

/**
 * Generate order_date in ISO format with IST timezone.
 * Format: YYYY-MM-DDTHH:mm:ss+05:30
 *
 * @param {Date} [date=new Date()] - Date object
 * @returns {string} ISO timestamp with IST offset
 */
function generateOrderDate(date = new Date()) {
  const istDate = new Date(date.getTime() + IST_OFFSET_MINUTES * 60 * 1000);

  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
}

/**
 * Get the IST-adjusted Date components for diagnostics/display.
 * @param {Date} [date=new Date()]
 * @returns {{ year: number, month: string, day: string, hours: string, minutes: string, seconds: string, istTimestamp: string, localTimestamp: string }}
 */
function getISTComponents(date = new Date()) {
  const istDate = new Date(date.getTime() + IST_OFFSET_MINUTES * 60 * 1000);

  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

  const istTimestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const localTimestamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0'),
  ].join('');

  return { year, month, day, hours, minutes, seconds, istTimestamp, localTimestamp };
}

module.exports = {
  IST_OFFSET_MINUTES,
  generateTimestamp,
  generateOrderDate,
  getISTComponents,
};
