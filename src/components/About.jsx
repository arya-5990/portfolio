import { useData } from '../context/DataContext';

const About = () => {
  const { data, loading } = useData();
  const about = data?.about;

  if (loading || !about) return <section className="about" id="about"></section>;
  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="heading">{about.heading.split(' ')[0]} <span>{about.heading.split(' ').slice(1).join(' ')}</span></h2>
        <h3>{about.subheading}</h3>
        {about.description1 && <p>{about.description1}</p>}
        {about.description2 && <p>{about.description2}</p>}
        {about.description3 && <p>{about.description3}</p>}
      </div>
    </section>
  )
}

export default About
