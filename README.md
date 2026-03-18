# Arya Sharma - Personal Portfolio

This is my personal portfolio website, built to showcase my skills, experience, projects, and certifications. Recently migrated from vanilla HTML/CSS/JS to a modern **React + Vite** architecture while maintaining the original UI design.

## 🚀 Live Demo
*(You can add your live deployment URL here, e.g., https://arya-sharma-portfolio.vercel.app)*

## 🛠️ Built With

- **React.js** (Frontend UI library)
- **Vite** (Build tool and development server)
- **Vanilla CSS** (Custom styling with complete CSS variables for theming)
- **Boxicons** (Icons)
- **ScrollReveal** (Scroll animations)

## ✨ Features

- **Fully Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices.
- **Dark/Light Mode**: Integrated theme toggler mapping directly to CSS variables.
- **Dynamic Content Rendering**: Experiences, Skills, Projects, and Certifications are mapped from easily maintainable configuration arrays.
- **Scroll Animations**: Smooth entrance animations for all sections as you scroll.
- **Sticky Navigation**: Header navigation automatically updates based on the current active section.
- **Component-Based Architecture**: Modular structure dividing the page logically into reusable components (Header, Home, About, Skills, etc.).

## 📂 Project Structure

```bash
portfolioo/
├── public/                 # Static assets (images, certificates, favicon)
├── src/
│   ├── components/         # React components for each section
│   │   ├── Header.jsx      # Navigation & Theme toggler
│   │   ├── Home.jsx        # Landing hero section
│   │   ├── About.jsx       # About me info
│   │   ├── Skills.jsx      # Map of technical skills
│   │   ├── Experience.jsx  # Work history
│   │   ├── Portfolio.jsx   # Project showcase
│   │   ├── Certifications.jsx # Certificates list
│   │   ├── Contact.jsx     # Contact info
│   │   └── Footer.jsx      # Footer
│   ├── App.jsx             # Main App layout component
│   ├── main.jsx            # React DOM entry point
│   └── index.css           # Global stylesheet (formerly style.css)
├── index.html              # Vite HTML template
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arya-5990/portfolio.git
   cd portfolioo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   The built files will be output to the `dist/` directory, ready to be deployed to platforms like Vercel, Netlify, or GitHub Pages.

## 📫 Contact

- **Email:** [aryasha4906c@gmail.com](mailto:aryasha4906c@gmail.com)
- **LinkedIn:** [Arya Sharma](https://www.linkedin.com/in/arya-sharma-1963b030a/)
- **GitHub:** [@arya-5990](https://github.com/arya-5990)
