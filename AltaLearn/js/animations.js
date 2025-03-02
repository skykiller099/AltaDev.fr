document.addEventListener('DOMContentLoaded', () => {
    // Ajouter des animations aux éléments de la page
    const animatedElements = document.querySelectorAll('.feature-item, .resource-item, .challenge-item');
    
    animatedElements.forEach(element => {
        element.classList.add('slide-in');
    });

    // Animation pour le titre de la page
    const pageTitle = document.querySelector('h2');
    if (pageTitle) {
        pageTitle.classList.add('fade-in');
    }
});
