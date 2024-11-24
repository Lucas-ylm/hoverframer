import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  delay?: number;
}

export function RevealText({ text, delay = 0 }: RevealTextProps) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.6, 0.01, -0.05, 0.95],
          delay: delay,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}