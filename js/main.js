// Add at the beginning of your main.js file
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// Smooth scroll to top on page refresh
history.scrollRestoration = 'manual';
window.onload = function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    // Initialize floating particles
    createFloatingParticles();
    
    // Initialize skill animations
    initSkillAnimations();
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Floating Particles Animation
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }
    
    setInterval(createParticle, 300);
}

// Skill Progress Animation
function initSkillAnimations() {
    const skillsData = [
        { name: 'Web Development', level: 90 },
        { name: 'Mobile Apps', level: 85 },
        { name: 'Database Design', level: 80 },
        { name: 'Game Development', level: 75 }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.getElementById('skills-container');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    function animateSkills() {
        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = '';
        
        skillsData.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="--skill-width: ${skill.level}%"></div>
                </div>
            `;
            skillsContainer.appendChild(skillItem);
            
            setTimeout(() => {
                const progressBar = skillItem.querySelector('.skill-progress');
                progressBar.classList.add('animate');
            }, 100);
        });
    }
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.classList.add('typing-animation');
    }
}

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
        
        // Create project cards
        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
        
        // Initialize typing animation after content is loaded
        setTimeout(initTypingAnimation, 500);
        
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
            <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjRmZmRhIiBvcGFjaXR5PSIwLjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjRmZmRhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvamVjdCBJbWFnZTwvdGV4dD48L3N2Zz4='">
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

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    initThemeToggle();
    initScrollToTop();
});