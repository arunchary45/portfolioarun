// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    mirror: false
});

// Initialize Typed.js
if (document.getElementById('role-text')) {
    new Typed('#role-text', {
        strings: ['Full-stack Web Developer', 'Aspiring AI/ML Engineer', 'Creative Coder'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });
}

// Set Current Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');
const html = document.documentElement;

// Check Local Storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    html.setAttribute('data-bs-theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeBtn.classList.replace('btn-outline-light', 'btn-outline-dark');
}

themeBtn.addEventListener('click', () => {
    if (html.getAttribute('data-bs-theme') === 'dark') {
        html.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeBtn.classList.replace('btn-outline-light', 'btn-outline-dark');
    } else {
        html.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeBtn.classList.replace('btn-outline-dark', 'btn-outline-light');
    }
});

// Navbar blur on scroll (optional enhancement)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

// Form Handling
const form = document.getElementById('contact-form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    /* 
    if (form.action.includes('YOUR_FORM_ID')) {
        alert('Please update the Formspree ID in the HTML code to enable form submission.');
        return;
    }
    */

    btn.disabled = true;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ms-2"></i>';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Oops! There was a problem sending your message.');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
});
