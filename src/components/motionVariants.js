// Shared Framer Motion variants (hero entrance).
export const box = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
export const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
}
