import { motion } from "framer-motion";
import { FaMusic } from "react-icons/fa";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1ed760] text-4xl text-black play-pulse"
        >
          <FaMusic />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-3xl font-black tracking-tight"
        >
          SONIC<span className="text-[#1ed760]">ORA</span>
        </motion.h1>

        <div className="mt-8 flex justify-center gap-1">
          {[1, 2, 3, 4].map((item) => (
            <motion.span
              key={item}
              animate={{ height: [8, 28, 12, 8] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: item * 0.12,
              }}
              className="w-1 rounded-full bg-[#1ed760]"
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-sm text-zinc-500"
        >
          Your sound. Your world.
        </motion.p>
      </div>
    </motion.div>
  );
}