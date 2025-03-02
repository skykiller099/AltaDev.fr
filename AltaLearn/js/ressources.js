document.addEventListener('DOMContentLoaded', () => {
    const resourceItems = document.querySelectorAll('.resource-item');

    resourceItems.forEach(item => {
        const downloadBtn = item.querySelector('.cyber-btn');
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const fileName = e.target.getAttribute('href').split('/').pop();
            simulateDownload(fileName);
        });
    });

    function simulateDownload(fileName) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = `Téléchargement de ${fileName} commencé...`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                    window.location.href = `../resources/${fileName}`;
                }, 300);
            }, 2000);
        }, 100);
    }

    // Initialisation de l'effet tilt
    VanillaTilt.init(document.querySelectorAll(".resource-item"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
});
