// Debug utility to check API URL
console.log('🔍 Debug Info:');
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Final API URL:', import.meta.env.VITE_API_URL || 'http://localhost:5000');

export default {};
