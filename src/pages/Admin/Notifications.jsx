import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const Notifications = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-[70vh] text-center">
      <Clock size={48} className="text-blue-500 mb-4 animate-pulse" />
      <h2 className="text-2xl font-bold text-white mb-2">Notifications Page</h2>
      <p className="text-gray-500">Coming Soon: Maa team ikkada work chesthundi.</p>
    </motion.div>
  );
};
export default Notifications;