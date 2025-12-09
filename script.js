// Cache DOM elements
const sections = document.querySelectorAll('.section');
const videos = Object.fromEntries(
  ['home', 'about', 'contact', 'series'].map(id => [id, document.getElementById(`video-${id}`)])
);
const overlay = document.querySelector('.pixel-overlay');
let currentSection = 'home';

// Pixelate video transition
function pixelateTransition(newSection) {
    if (newSection === currentSection) return;

    overlay.classList.add('active');

    setTimeout(() => {
        videos[currentSection].classList.remove('active');
        videos[newSection].classList.add('active');

        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(newSection).classList.add('active');

        overlay.classList.remove('active');
        currentSection = newSection;
    }, 1000);
}

// Navbar click delegation
document.querySelector('.navbar').addEventListener('click', e => {
    const link = e.target.closest('a[data-section]');
    if (link) {
        pixelateTransition(link.dataset.section);
    }
});

// Series grid: play hover video and update title
const seriesTitle = document.querySelector('.series-title');
document.querySelectorAll('.video-item').forEach(item => {
    const vid = item.querySelector('video');
    vid.pause(); // Ensure first frame is shown

    item.addEventListener('mouseenter', () => {
        vid.play();
        seriesTitle.textContent = item.dataset.title;
    });

    item.addEventListener('mouseleave', () => vid.pause());
});

// Slide in/out observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('active', entry.isIntersecting));
}, { threshold: 0.5 });

document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));
