const serverNames = [
    "L'Ombre Numérique",
];

function changeServerName() {
    const serverNameElement = document.getElementById('server-name');
    const newName = serverNames[Math.floor(Math.random() * serverNames.length)];
    serverNameElement.textContent = newName;
    serverNameElement.classList.add('glitch');
    setTimeout(() => {
        serverNameElement.classList.remove('glitch');
    }, 1000);
}

setInterval(changeServerName, 10000); // Change le nom toutes les 10 secondes
