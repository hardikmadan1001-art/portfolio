import { motion } from "motion/react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export default function WordReveal({
  text,
  className = "",
  delay = 0.1,
  stagger = 0.045,
  once = true,
}: Props) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-18% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 14, filter: "blur(12px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.55, ease: EASE },
            },
          }}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
