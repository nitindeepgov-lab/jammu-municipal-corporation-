/**
 * Date formatting utilities for JMC application
 */

/**
 * Format date string to Indian locale format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date (e.g., "15 Jan 2024")
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

/**
 * Format date to full format with day name
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date (e.g., "Monday, 15 January 2024")
 */
export const formatDateFull = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

/**
 * Check if date is in the past
 * @param {string} dateStr - ISO date string
 * @returns {boolean}
 */
export const isPastDate = (dateStr) => {
  if (!dateStr) return false;
  try {
    return new Date(dateStr) < new Date();
  } catch {
    return false;
  }
};
