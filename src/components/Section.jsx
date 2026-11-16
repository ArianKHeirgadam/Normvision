// Standard page section: full-width band + centered .wrap container.
export default function Section({ className, id, wrap, style, children }) {
  return (
    <section className={className} id={id} style={style}>
      <div className={wrap ? `wrap ${wrap}` : 'wrap'}>{children}</div>
    </section>
  )
}
