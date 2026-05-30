'use strict';

/**
 * Input validation utilities for JMC CMS API endpoints.
 */

/**
 * Validate Indian mobile number (10 digits, starts with 6-9).
 * @param {string} mobile
 * @returns {{ valid: boolean, message?: string }}
 */
function validateMobile(mobile) {
  if (!mobile || typeof mobile !== 'string') {
    return { valid: false, message: 'Mobile number is required' };
  }
  const cleaned = mobile.trim().replace(/\s+/g, '');
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return { valid: false, message: 'Mobile number must be a valid 10-digit Indian mobile number' };
  }
  return { valid: true };
}

/**
 * Validate email format (optional — returns valid if empty).
 * @param {string} [email]
 * @returns {{ valid: boolean, message?: string }}
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return { valid: true }; // Email is optional
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Email address is not in a valid format' };
  }
  return { valid: true };
}

/**
 * Validate payment amount.
 * Must be a finite number greater than 0.
 * @param {string|number} amount
 * @returns {{ valid: boolean, value?: number, message?: string }}
 */
function validateAmount(amount) {
  if (amount === null || amount === undefined || amount === '') {
    return { valid: false, message: 'Amount is required' };
  }
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return { valid: false, message: 'Amount must be a valid number greater than 0' };
  }
  // Max sanity check — BillDesk typically limits to 10 lakh per transaction
  if (parsed > 1000000) {
    return { valid: false, message: 'Amount exceeds maximum allowed value' };
  }
  return { valid: true, value: parsed };
}

/**
 * Validate customer name.
 * @param {string} name
 * @returns {{ valid: boolean, message?: string }}
 */
function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, message: 'Customer name is required' };
  }
  if (name.trim().length > 200) {
    return { valid: false, message: 'Customer name is too long (max 200 characters)' };
  }
  return { valid: true };
}

module.exports = {
  validateMobile,
  validateEmail,
  validateAmount,
  validateName,
};
