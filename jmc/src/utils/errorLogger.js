/**
 * Centralized error logging utility
 */

const isDevelopment = import.meta.env.DEV;

/**
 * Log error with context
 * @param {string} context - Where the error occurred
 * @param {Error|string} error - The error object or message
 * @param {Object} additionalData - Any additional context
 */
export const logError = (context, error, additionalData = {}) => {
  const errorMessage = error?.message || error;
  const errorStack = error?.stack;

  if (isDevelopment) {
    console.group(`❌ Error in ${context}`);
    console.error("Message:", errorMessage);
    if (errorStack) console.error("Stack:", errorStack);
    if (Object.keys(additionalData).length > 0) {
      console.error("Additional Data:", additionalData);
    }
    console.groupEnd();
  } else {
    // In production, you might want to send to a service like Sentry
    console.error(`[${context}]`, errorMessage);
  }
};

/**
 * Log warning with context
 * @param {string} context - Where the warning occurred
 * @param {string} message - Warning message
 */
export const logWarning = (context, message) => {
  if (isDevelopment) {
    console.warn(`⚠️ [${context}]`, message);
  }
};

/**
 * Log info message
 * @param {string} context - Context
 * @param {string} message - Info message
 */
export const logInfo = (context, message) => {
  if (isDevelopment) {
    console.info(`ℹ️ [${context}]`, message);
  }
};
