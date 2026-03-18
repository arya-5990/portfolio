const certifications = [
  {
    logo: '/images/calanjiyam_logo.jpeg',
    logoAlt: 'Calanjiyam Logo',
    title: 'Junior Assistant Developer',
    issuer: 'Calanjiyam Consultancies',
    file: '/certificates/Arya Sharma JAD Certificate - Calanjiyam.pdf',
  },
  {
    logo: '/images/calanjiyam_logo.jpeg',
    logoAlt: 'Calanjiyam Logo',
    title: 'Letter of Recommendation',
    issuer: 'Calanjiyam Consultancies',
    file: '/certificates/Arya Sharma -  Letter of RecommendationCalanjiyam.pdf',
  },
  {
    logo: '/images/mittal.png',
    logoAlt: 'Mittal Alliance Logo',
    title: 'Completion Letter',
    issuer: 'Mittal Alliance Industries',
    file: '/certificates/Arya Sharma Completion letter(mittal).pdf',
  },
  {
    logo: '/images/mittal.png',
    logoAlt: 'Mittal Alliance Logo',
    title: 'Letter of Recommendation',
    issuer: 'Mittal Alliance Industries',
    file: '/certificates/Arya Sharma Letter Of Recommentation(mittal).pdf',
  },
  {
    logo: '/images/Coursera-Logo_600x600.svg.png',
    logoAlt: 'Coursera Logo',
    title: 'Data Structures & Algorithms',
    issuer: 'Coursera',
    file: '/certificates/Coursera DSA.pdf',
  },
  {
    logo: '/images/IITINDORE.png',
    logoAlt: 'IIT Indore Logo',
    title: 'Fluxus Hackathon',
    issuer: 'Participation Certificate',
    file: '/certificates/FLUXUS HACKATHON.pdf',
  },
]

const Certifications = () => {
  return (
    <section className="certifications" id="certifications">
      <h2 className="heading">My <span>Certifications</span></h2>
      <div className="certifications-container">
        {certifications.map((cert, index) => (
          <div className="certificate-card" key={index}>
            <div className="certificate-logo">
              <img src={cert.logo} alt={cert.logoAlt} />
            </div>
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
            <a href={cert.file} target="_blank" rel="noreferrer" className="certificate-link">
              <i className='bx bx-link-external'></i> View Certificate
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications
