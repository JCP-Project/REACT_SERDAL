import { motion } from "framer-motion";
import { useEffect } from "react";

const IntroScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    // Automatically end intro after a delay (or tie to animation end)
    const timer = setTimeout(() => {
      localStorage.setItem("hasSeenIntro", "true");
      onFinish();
    }, 3000); // adjust as needed

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-4xl font-bold"
      >
        Welcome to My App
      </motion.h1>
    </motion.div>
  );
};

export default IntroScreen;
