import { useData } from '../context/DataContext';

const Skills = () => {
  const { data, loading } = useData();
  const skills = data?.skills || [];

  if (loading) return <section className="skills" id="skills"></section>;

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
