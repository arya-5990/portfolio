const Experience = () => {
  return (
    <section className="services" id="experience">
      <h2 className="heading"><span>Experience's</span></h2>

      <div className="services-container">
        {/* Mittal Alliance */}
        <div className="services-box">
          <img src="/images/mittal.png" alt="Mittal Alliance Logo" className="company-logo" />
          <h4>Mittal Alliance Industries Private Limited</h4>
          <div className="role-section">
            <h3>Back End Developer</h3>
            <p><strong>May 2025 - June 2025 &amp; August 2025 - September 2025 · Remote</strong></p>
            <ul>
              <li>Designed and developed RESTful APIs using Node.js and Express.js</li>
              <li>Implemented authentication and user management using Firebase Authentication</li>
              <li>Integrated MongoDB and Firestore for efficient data storage</li>
              <li>Collaborated with frontend teams to ensure seamless API integration and smooth data flow</li>
              <li>Managed databases, authentication, and server deployments</li>
              <li>Optimized application performance, ensured data security, and improved backend reliability</li>
            </ul>
          </div>
        </div>

        {/* Calanjiyam */}
        <div className="services-box">
          <img src="/images/calanjiyam_logo.jpeg" alt="Calanjiyam Logo" className="company-logo" />
          <h4>Calanjiyam Consultancies and Technologies</h4>
          <div className="role-section">
            <h3>Junior Assistant Developer</h3>
            <p><strong>Apr 2025 - Jul 2025 · 4 mos · Remote</strong></p>
            <ul>
              <li>Took increased responsibility in real client projects</li>
              <li>Supported backend logic and API integration</li>
              <li>Worked closely with senior developers to improve code quality and application performance</li>
            </ul>
          </div>
          <div className="role-section">
            <h3>Web Development Intern</h3>
            <p><strong>Feb 2025 - Apr 2025 · 3 mos · Remote</strong></p>
            <ul>
              <li>Worked on full-stack web development using HTML, CSS, JavaScript, and backend technologies</li>
              <li>Assisted in building and optimizing dynamic web applications</li>
              <li>Debugged, tested, and enhanced existing features</li>
              <li>Collaborated with team members to deliver client-focused solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
