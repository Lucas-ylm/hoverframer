import { motion } from 'framer-motion';

interface SplitRevealTextProps {
  text: string;
  delay?: number;
}

export function SplitRevealText({ text, delay = 0 }: SplitRevealTextProps) {
  const words = text.split(' ');
  const leftWords = words.slice(0, Math.ceil(words.length / 2));
  const rightWords = words.slice(Math.ceil(words.length / 2));

  return (
    <div className="relative flex justify-center overflow-hidden">
      <motion.div
        className="text-right mr-2"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: delay
        }}
      >
        {leftWords.join(' ')}
      </motion.div>
      <motion.div
        className="text-left ml-2"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: delay + 0.1
        }}
      >
        {rightWords.join(' ')}
      </motion.div>
    </div>
  );
}