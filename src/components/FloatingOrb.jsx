import { motion } from "framer-motion";

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1],
      }}
      transition={{
          duration: 6,
          repeat: Infinity,
          delay,
          ease: "easeInOut"
      }}
  />
);
export default FloatingOrb;
