import { useData } from '../context/DataContext';

const Certifications = () => {
  const { data, loading } = useData();
  const certifications = data?.certifications || [];

  if (loading) return <section className="certifications" id="certifications"></section>;

  return (
    <section className="certifications" id="certifications">
      <h2 className="heading">My <span>Certifications</span></h2>
      <div className="certifications-container">
        {certifications.map((cert, index) => (
          <div className="certificate-card" key={cert.id || index}>
            <div className="certificate-logo">
              {cert.logo && <img src={cert.logo} alt={`${cert.issuer} Logo`} />}
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
