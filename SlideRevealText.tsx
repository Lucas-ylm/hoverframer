import { motion } from 'framer-motion';

interface SlideRevealTextProps {
  text: string;
  delay?: number;
}

export function SlideRevealText({ text, delay = 0 }: SlideRevealTextProps) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: [0.25, 1, 0.5, 1],
          delay,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}