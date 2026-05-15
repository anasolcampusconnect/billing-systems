import React from 'react';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

const Ticketing = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[70vh] text-center">
      <Ticket size={64} className="text-blue-500 mb-6 animate-pulse" />
      <h2 className="text-3xl font-extrabold text-white mb-3">Ticketing</h2>
      <p className="text-gray-400 max-w-md">Coming Soon: Maa development team ee feature meeda work chesthundi.</p>
    </motion.div>
  );
};
export default Ticketing;