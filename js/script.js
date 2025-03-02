document.addEventListener('DOMContentLoaded', (event) => {
    // Configuration des particules
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble:{ distance :400 , size :40 , duration :2 , opacity :8 , speed :3 }, repulse:{ distance :200 , duration :0.4 }, push:{ particles_nb :4 }, remove:{ particles_nb :2 } }
        },
        retina_detect:true
    });

    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Fonction pour vérifier si un élément est dans la vue
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Fonction pour gérer les animations au défilement
    const handleScrollAnimations = () => {
        document.querySelectorAll('.scroll-reveal, .fade-in').forEach((el) => {
            if (isInViewport(el)) {
                el.classList.add('visible');
            }
        });
    };

    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Appel initial pour les éléments visibles au chargement
    handleScrollAnimations();

    // Gestion du bouton "Retour en haut"
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
