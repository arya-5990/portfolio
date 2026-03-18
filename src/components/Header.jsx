import { useState, useEffect } from 'react'

const Header = ({ darkMode, setDarkMode }) => {
  const [sticky, setSticky] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header
      setSticky(window.scrollY > 100)

      // Active nav link
      const sections = document.querySelectorAll('section')
      sections.forEach(sec => {
        const top = window.scrollY
        const offset = sec.offsetTop - 150
        const height = sec.offsetHeight
        const id = sec.getAttribute('id')
        if (top >= offset && top < offset + height) {
          setActiveSection(id)
        }
      })

      // Close mobile menu on scroll
      setMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className={`header${sticky ? ' sticky' : ''}`}>
      <a href="#home" className="logo">Arya Sharma</a>
      <nav className={`navbar${menuOpen ? ' active' : ''}`}>
        <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={handleNavClick}>Home</a>
        <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={handleNavClick}>About</a>
        <a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={handleNavClick}>Skills</a>
        <a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={handleNavClick}>Experience</a>
        <a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''} onClick={handleNavClick}>Portfolio</a>
        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={handleNavClick}>Contact</a>
      </nav>
      <div
        className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'}`}
        id="darkMode-icon"
        onClick={toggleDarkMode}
      ></div>
      <div
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        id="menu-icon"
        onClick={toggleMenu}
      ></div>
    </header>
  )
}

export default Header
