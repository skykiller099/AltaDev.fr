document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            loadPage(page);
        });
    });

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                content.classList.add('fade-in');
                setTimeout(() => {
                    content.classList.remove('fade-in');
                }, 500);
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }

    // Charger la page d'accueil par défaut
    loadPage('pages/accueil.html');
});
