import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const StaffTargets = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
       <Users size={48} className="mx-auto text-gray-700 mb-4" />
       <h3 className="text-xl font-bold text-gray-400">Staff Management</h3>
       <p className="text-gray-500">Manage your staff details and sales targets here.</p>
    </motion.div>
  );
};

export default StaffTargets;