function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <div className={`section-heading ${center ? 'text-center mx-auto' : ''}`} data-aos="fade-up">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default SectionHeading
