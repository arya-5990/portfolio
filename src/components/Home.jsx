import { useData } from '../context/DataContext';

const Home = () => {
  const { data, loading } = useData();
  const general = data?.general;

  if (loading || !general) return <section className="home" id="home"></section>;
  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3>Hello, I am</h3>
        <h1>{general.name}</h1>
        <p>{general.tagline}</p>
        <p></p>
        <div className="social-media">
          {general.socialLinks?.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="profession-container">
        <div className="profession-box">
          <div className="profession" style={{ '--i': 0 }}>
            <i className='bx bx-code-alt'></i>
            <h3>{general.tag1}</h3>
          </div>
          <div className="profession" style={{ '--i': 1 }}>
            <i className='bx bx-globe'></i>
            <h3>{general.tag2}</h3>
          </div>
          <div className="profession" style={{ '--i': 2 }}>
            <i className='bx bx-briefcase-alt'></i>
            <h3>{general.tag3}</h3>
          </div>
          <div className="profession" style={{ '--i': 3 }}>
            <i className='bx bx-data'></i>
            <h3>{general.tag4}</h3>
          </div>
          <div className="circle"></div>
        </div>
        <div className="overlay"></div>
      </div>

      <div className="home-img">
        <img src={general.heroImage} alt={general.name} />
      </div>
    </section>
  )
}

export default Home
