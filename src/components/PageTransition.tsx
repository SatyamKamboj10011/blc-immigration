import { motion } from 'motion/react';

const ease = [0.76, 0, 0.24, 1] as const;

// A brand-green curtain that sweeps up off the screen each time a page mounts.
export default function PageTransition() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-brand-900"
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease, delay: 0.15 }}
    >
      <motion.img
        src="/logo.png"
        alt=""
        className="h-14 w-auto rounded-md bg-white p-1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1], scale: [0.8, 1, 1] }}
        transition={{ duration: 0.5, times: [0, 0.5, 1] }}
      />
    </motion.div>
  );
}
