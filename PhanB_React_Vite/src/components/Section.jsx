export default function Section({ title, children }) {
  return (
    <section className="section-block" style={{ marginBottom: '24px' }}>
      <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
