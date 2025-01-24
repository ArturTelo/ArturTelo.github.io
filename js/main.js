// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Fetch and load content
async function loadContent() {
    try {
        const response = await fetch('/data/content.json');
        const data = await response.json();
        
        // Update hero section
        document.getElementById('site-title').textContent = data.hero.title;
        document.getElementById('hero-title').textContent = data.hero.title;
        document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
        
        // Update about section
        document.getElementById('about-title').textContent = data.about.title;
        document.getElementById('about-description').textContent = data.about.description;
        
        // Create skills
        const skillsContainer = document.getElementById('skills-container');
        data.about.skills.forEach(skill => {
            const skillElement = document.createElement('span');
            skillElement.className = 'skill-tag';
            skillElement.textContent = skill;
            skillsContainer.appendChild(skillElement);
        });
        
        // Create project cards
        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link" target="_blank">View Project →</a>
        </div>
    `;
    
    return card;
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize content loading
document.addEventListener('DOMContentLoaded', loadContent);