import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let toastCount = 0;

export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const toast = ({ title, description, variant = 'default' }) => {
    const id = toastCount++;
    const newToast = { id, title, description, variant };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);

    return id;
  };

  return { toasts, toast };
};

export const Toaster = ({ toasts = [] }) => {
  return (
    
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:flex-col md:max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="mb-2 rounded-lg bg-white p-4 shadow-lg"
          >
            {toast.title && <h3 className="font-semibold">{toast.title}</h3>}
            {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
