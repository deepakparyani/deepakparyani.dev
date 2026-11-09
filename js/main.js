// Enhanced JavaScript with animations

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Mobile navigation
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
    const setMenu = (open) => {
        mobileMenu.classList.toggle('hidden', !open);
        navToggle.setAttribute('aria-expanded', String(open));
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = open ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
    };

    navToggle.addEventListener('click', () => {
        setMenu(mobileMenu.classList.contains('hidden'));
    });

    // Close the menu once a destination is picked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenu(false);
    });
}

// Particle Background
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particlesRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Initialize particles
if (!prefersReducedMotion) {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animateParticles() {
    if (!particlesRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

if (!prefersReducedMotion) {
    particlesRunning = true;
    animateParticles();
}

// Stop the loop while the tab is in the background
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        particlesRunning = false;
    } else if (!prefersReducedMotion && !particlesRunning) {
        particlesRunning = true;
        animateParticles();
    }
});

// Mouse parallax effect
if (!prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        particles.forEach((particle, index) => {
            const speed = (index % 5 + 1) * 0.01;
            particle.x += mouseX * speed;
            particle.y += mouseY * speed;
        });
    });
}

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Dynamic skill pill animation
const skillPills = document.querySelectorAll('.skill-pill');
skillPills.forEach((pill, index) => {
    pill.style.animationDelay = `${index * 0.1}s`;
});

// Hover/magnetic effects are skipped for visitors who prefer reduced motion
if (!prefersReducedMotion) {
    skillPills.forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            pill.style.transform = 'scale(1.1) rotate(2deg)';
        });
        pill.addEventListener('mouseleave', () => {
            pill.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Magnetic button effect
    const buttons = document.querySelectorAll('button, .tilt-card');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 10;
            const deltaY = (e.clientY - centerY) / 10;

            button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// GitHub stats - real API call, falls back to the static numbers in the HTML
async function fetchGitHubStats() {
    const reposEl = document.getElementById('github-repos');
    if (!reposEl) return;

    try {
        const response = await fetch('https://api.github.com/users/deepakparyani');
        if (!response.ok) return;

        const data = await response.json();
        const updates = {
            'github-repos': data.public_repos,
            'github-followers': data.followers
        };

        Object.entries(updates).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el && typeof value === 'number') {
                el.textContent = String(value);
            }
        });
    } catch (error) {
        // Offline or rate limited - the hardcoded fallback is already on the page
        console.log('GitHub stats unavailable, keeping static values');
    }
}

// Initialize everything
window.addEventListener('load', () => {
    fetchGitHubStats();
    
    // Preload animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 500);
});

// Back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});