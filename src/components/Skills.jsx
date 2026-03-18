const skills = [
  { name: 'C', icon: 'bx bx-code' },
  { name: 'C++', icon: 'bx bx-code-alt' },
  { name: 'Java', icon: 'bx bxl-java' },
  { name: 'Python', icon: 'bx bxl-python' },
  { name: 'HTML', icon: 'bx bxl-html5' },
  { name: 'CSS', icon: 'bx bxl-css3' },
  { name: 'JavaScript', icon: 'bx bxl-javascript' },
  { name: 'jQuery', icon: 'bx bxl-jquery' },
  { name: 'MySQL', icon: 'bx bx-data' },
  { name: 'Firebase', icon: 'bx bxl-firebase' },
  { name: 'MongoDB', icon: 'bx bxl-mongodb' },
  { name: 'Data Structures', icon: 'bx bx-data' },
  { name: 'Algorithms', icon: 'bx bx-brain' },
  { name: 'MERN Stack', icon: 'bx bx-layer' },
  { name: 'MEAN Stack', icon: 'bx bx-layer' },
  { name: 'PHP', icon: 'bx bxl-php' },
  { name: 'Laravel', icon: 'bx bxl-php' },
  { name: 'Project Management', icon: 'bx bx-briefcase-alt' },
]

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="heading">My <span>Skills</span></h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index} data-skill={skill.name}>
            <div className="skill-icon">
              <i className={skill.icon}></i>
            </div>
            <h3>{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
