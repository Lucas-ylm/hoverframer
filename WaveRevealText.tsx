import { motion } from 'framer-motion';

interface WaveRevealTextProps {
  text: string;
  delay?: number;
}

export function WaveRevealText({ text, delay = 0 }: WaveRevealTextProps) {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  };
  
  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: letter === ' ' ? '0.3em' : '0' }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}