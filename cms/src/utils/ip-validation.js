'use strict';

const net = require('net');

/**
 * Normalize a raw header value into a valid IP string (or null).
 * Handles:
 * - Comma-separated lists (x-forwarded-for)
 * - Forwarded header "for=" syntax
 * - IPv6-mapped IPv4 (::ffff:1.2.3.4)
 * - Bracketed IPv6 with port
 * - IPv4 with port (1.2.3.4:12345)
 *
 * @param {string | null | undefined} rawIp
 * @returns {string | null} Cleaned IP or null
 */
function normalizeIp(rawIp) {
  if (typeof rawIp !== 'string') {
    return null;
  }

  let candidate = rawIp.trim();
  if (!candidate) {
    return null;
  }

  // Take first IP from comma-separated list
  if (candidate.includes(',')) {
    candidate = candidate.split(',')[0].trim();
  }

  // Handle Forwarded header "for=" prefix
  if (candidate.toLowerCase().startsWith('for=')) {
    candidate = candidate.slice(4).trim();
  }

  // Strip enclosing quotes
  candidate = candidate.replace(/^"|"$/g, '');

  // Handle bracketed IPv6 [::1]:port
  if (candidate.startsWith('[')) {
    const endIndex = candidate.indexOf(']');
    if (endIndex > 0) {
      candidate = candidate.slice(1, endIndex);
    }
  }

  // Strip IPv6-mapped IPv4 prefix
  if (candidate.startsWith('::ffff:')) {
    candidate = candidate.slice(7);
  }

  // Strip port from IPv4 (1.2.3.4:12345)
  if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.split(':')[0];
  }

  return net.isIP(candidate) ? candidate : null;
}

/**
 * Check whether an IP is a valid *public* IPv4 that BillDesk will accept.
 * Rejects: null, IPv6, 0.0.0.0, loopback, RFC-1918 private, and link-local ranges.
 *
 * @param {string | null} ip
 * @returns {boolean}
 */
function isPublicIPv4(ip) {
  if (typeof ip !== 'string' || net.isIP(ip) !== 4) {
    return false;
  }

  // Reject obviously invalid
  if (ip === '0.0.0.0' || ip.startsWith('127.')) {
    return false;
  }

  // Reject RFC-1918 private ranges
  if (ip.startsWith('10.')) return false;
  if (ip.startsWith('172.')) {
    const second = parseInt(ip.split('.')[1], 10);
    if (second >= 16 && second <= 31) return false;
  }
  if (ip.startsWith('192.168.')) return false;

  // Reject link-local
  if (ip.startsWith('169.254.')) return false;

  return true;
}

/**
 * Extract the real client IP from a Koa context.
 * Priority order mirrors what Render / Cloudflare populate.
 *
 * @param {Object} ctx - Koa context
 * @returns {{ ip: string | null, source: string }}
 */
function getDeviceIp(ctx) {
  const headers = ctx.request.headers || {};

  // Ordered list of candidate sources (most reliable first behind a CDN/proxy)
  const sources = [
    { name: 'cf-connecting-ip', value: headers['cf-connecting-ip'] },
    { name: 'true-client-ip', value: headers['true-client-ip'] },
    { name: 'x-real-ip', value: headers['x-real-ip'] },
    { name: 'x-forwarded-for', value: headers['x-forwarded-for'] },
    { name: 'x-client-ip', value: headers['x-client-ip'] },
    { name: 'ctx.request.ip', value: ctx.request.ip },
    { name: 'ctx.ip', value: ctx.ip },
    { name: 'remoteAddress', value: ctx.req?.socket?.remoteAddress },
  ];

  for (const { name, value } of sources) {
    const ip = normalizeIp(value);
    if (isPublicIPv4(ip)) {
      return { ip, source: name };
    }
  }

  // Env fallback (statically configured Render egress IP)
  const fallback = normalizeIp(process.env.BILLDESK_FALLBACK_DEVICE_IP || '');
  if (isPublicIPv4(fallback)) {
    return { ip: fallback, source: 'BILLDESK_FALLBACK_DEVICE_IP' };
  }

  return { ip: null, source: 'none' };
}

module.exports = {
  normalizeIp,
  isPublicIPv4,
  getDeviceIp,
};
