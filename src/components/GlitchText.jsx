import { motion } from 'framer-motion'; // ADD THIS LINE

const GlitchText = ({ children, className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{
      textShadow: [
        "0 0 0 transparent",
        "2px 0 0 #ff0080, -2px 0 0 #00ffff",
        "0 0 0 transparent"
      ]
    }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default GlitchText;