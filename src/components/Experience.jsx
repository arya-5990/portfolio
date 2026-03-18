import { useData } from '../context/DataContext';

const Experience = () => {
  const { data, loading } = useData();
  const experiences = data?.experiences || [];

  if (loading) return <section className="services" id="experience"></section>;

  return (
    <section className="services" id="experience">
      <h2 className="heading"><span>Experience's</span></h2>

      <div className="services-container">
        {experiences.map((exp, index) => (
          <div className="services-box" key={exp.id || index}>
            {exp.logo && <img src={exp.logo} alt={`${exp.name} Logo`} className="company-logo" />}
            <h4>{exp.name}</h4>
            <div className="role-section">
              <h3>{exp.position}</h3>
              <p><strong>{exp.dates}</strong></p>
              <ul>
                {exp.description.split('\n').map((point, i) => (
                  <li key={i}>{point.replace('• ', '').trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Experience
