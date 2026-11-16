import { motion } from 'framer-motion'

// Subtle one-time scroll reveal. Keep hover transforms on a child, not on this wrapper.
export default function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
