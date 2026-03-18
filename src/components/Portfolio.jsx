const projects = [
  {
    isDual: true,
    images: [
      { src: '/images/chatsphere 1.jpeg', alt: 'ChatSphere App Screenshot 1' },
      { src: '/images/chatsphere 2.jpeg', alt: 'ChatSphere App Screenshot 2' },
    ],
    title: 'ChatSphere',
    description:
      'A secure real-time chat app built with React Native, Expo, Firebase, and Cloudinary. Features instant messaging with read receipts, voice notes, media sharing, secure authentication, and a sleek, responsive UI with dark/light mode. Production-ready with strong security and data protection.',
    link: 'https://github.com/arya-5990/ChatSphere',
  },
  {
    image: '/images/clouddatahub.png',
    alt: 'Cloud Data Hub Website',
    title: 'Cloud Data Hub',
    description:
      'A comprehensive employee management system for chartered accountant firms. Developed during internship at Mittal Alliance Industries. Solely responsible for building the entire backend from scratch to production level. Currently working perfectly in production.',
    link: 'https://www.cloudatahub.com/',
  },
  {
    image: '/images/lotus.png',
    alt: 'Lotus Education Website',
    title: 'Lotus Education Platform',
    description:
      'An online education platform with course management, video content, and community support. Developed during internship at Calanjiyam Consultancies and Technologies.',
    link: 'https://lotuseducation.tech/',
  },
  {
    image: '/images/portfolio2.png',
    alt: 'Shree Sainath Packaging',
    title: 'Shree Sainath Packaging ',
    description: 'Took an offline packaging company digital with this project. ',
    link: 'https://shreesainathpackeging.netlify.app/',
  },
  {
    image: '/images/portfolio3.png',
    alt: 'AI Chatbot',
    title: 'Ai Powered ChatBot',
    description: 'An Ai powered chatbot project using python and chatterbot library',
    link: 'https://github.com/arya-5990/Chatbot.git',
  },
  {
    image: '/images/bruno.png',
    alt: 'Bruno Speaks Website',
    title: 'Bruno Speaks',
    description:
      'A blogging website with admin panel for blog management. Developed during internship at Mittal Alliance Industries. My main contribution was implementing backend logic and database schema design.',
    link: 'https://brunospeaks.com/',
  },
]

const Portfolio = () => {
  return (
    <section className="portfolio" id="portfolio">
      <h2 className="heading">Latest <span>Project</span></h2>

      <div className="portfolio-container">
        {projects.map((project, index) => (
          <div className="portfolio-box" key={index}>
            {project.isDual ? (
              <div className="portfolio-dual-image">
                {project.images.map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt} />
                ))}
              </div>
            ) : (
              <img src={project.image} alt={project.alt} />
            )}
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
