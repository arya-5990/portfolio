const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3>Hello, I am</h3>
        <h1>Arya Sharma</h1>
        <p>
          MTech (IT) Student | Backend Developer (Node.js, Express, MongoDB) | MERN Stack Intern | Building Scalable Web APIs
        </p>
        <p></p>
        <div className="social-media">
          <a href="https://github.com/arya-5990" target="_blank" rel="noreferrer">
            <i className='bx bxl-github'></i>
          </a>
          <a href="https://www.linkedin.com/in/arya-sharma-1963b030a/" target="_blank" rel="noreferrer">
            <i className='bx bxl-linkedin'></i>
          </a>
        </div>
      </div>

      <div className="profession-container">
        <div className="profession-box">
          <div className="profession" style={{ '--i': 0 }}>
            <i className='bx bx-code-alt'></i>
            <h3>Software Developer</h3>
          </div>
          <div className="profession" style={{ '--i': 1 }}>
            <i className='bx bx-globe'></i>
            <h3>Web Developer</h3>
          </div>
          <div className="profession" style={{ '--i': 2 }}>
            <i className='bx bx-briefcase-alt'></i>
            <h3>Project Manager</h3>
          </div>
          <div className="profession" style={{ '--i': 3 }}>
            <i className='bx bx-data'></i>
            <h3>Database Engineer</h3>
          </div>
          <div className="circle"></div>
        </div>
        <div className="overlay"></div>
      </div>

      <div className="home-img">
        <img src="/images/home.png" alt="Arya Sharma" />
      </div>
    </section>
  )
}

export default Home
