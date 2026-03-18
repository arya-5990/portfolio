import { useData } from '../context/DataContext';

const Portfolio = () => {
  const { data, loading } = useData();
  const projects = data?.projects || [];

  if (loading) return <section className="portfolio" id="portfolio"></section>;

  return (
    <section className="portfolio" id="portfolio">
      <h2 className="heading">Latest <span>Project</span></h2>

      <div className="portfolio-container">
        {projects.map((project, index) => (
          <div className="portfolio-box" key={project.id || index}>
            <img src={project.image} alt={project.title} />
            <div className="portfolio-layer">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noreferrer">
                <i className='bx bx-link-external'></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio
