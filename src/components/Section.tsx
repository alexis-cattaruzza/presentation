import React, { useRef } from "react";
import type { PropsWithChildren } from "react";
import { motion, type Variants } from "framer-motion";

type Props = {
  id?: string;
  children?: React.ReactNode;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.06 * i,
      ease: "easeOut",
    },
  }),
};

export default function Section({ id, children }: PropsWithChildren<Props>) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className="section-snap"
      style={{ 
        minHeight: "calc(100dvh + 80px)",
        paddingTop: "20px",
        paddingBottom: "20px"
      }}
    >
      <div className="section-inner">
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants}
          custom={0}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
