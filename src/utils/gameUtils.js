// Utility functions for input validation and sanitization

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove HTML tags and dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const validateGameMove = (position, gameState) => {
  // Validate position is within bounds
  if (position < 0 || position >= gameState.length) {
    return { valid: false, error: 'Position out of bounds' };
  }
  
  // Check if position is already taken
  if (gameState[position] !== '' && gameState[position] !== null) {
    return { valid: false, error: 'Position already taken' };
  }
  
  return { valid: true };
};

export const validateScore = (score) => {
  const numScore = parseInt(score);
  return !isNaN(numScore) && numScore >= 0 && numScore <= 10000;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
