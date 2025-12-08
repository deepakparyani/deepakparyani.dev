// Enhanced JavaScript with animations

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

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
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    particles.forEach((particle, index) => {
        const speed = (index % 5 + 1) * 0.01;
        particle.x += mouseX * speed;
        particle.y += mouseY * speed;
    });
});

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

// GitHub Stats (with mock data for demo)
async function fetchGitHubStats() {
    try {
        // For demo purposes - replace with real API call if needed
        setTimeout(() => {
            document.getElementById('github-repos').textContent = '42';
            document.getElementById('github-stars').textContent = '150+';
            document.getElementById('github-followers').textContent = '89';
        }, 1000);
    } catch (error) {
        console.log('Using mock data');
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

// Typing effect for hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Store original and re-render with animation
        heroTitle.innerHTML = '<span class="gradient-text glow-text">Deepak</span>';
        setTimeout(() => {
            typeWriter(heroTitle, "Hi, I'm Deepak", 150);
        }, 500);
    }
});