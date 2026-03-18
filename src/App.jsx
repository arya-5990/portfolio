import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // ScrollReveal
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/scrollreveal'
    script.async = true
    script.onload = () => {
      if (window.ScrollReveal) {
        const sr = window.ScrollReveal({
          distance: '80px',
          duration: 2000,
          delay: 200,
        })
        sr.reveal('.home-content, .heading', { origin: 'top' })
        sr.reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper', { origin: 'bottom' })
        sr.reveal('.home-content h1, .about-img img', { origin: 'left' })
        sr.reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' })
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default App
