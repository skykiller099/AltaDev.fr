const challenges = {
    base64: {
        title: "Déchiffrement de Base64",
        description: "Décodez le message suivant :",
        message: "Le hacking éthique est essentiel",
        encoded: btoa("Le hacking éthique est essentiel"),
        hint: "Utilisez un décodeur Base64 en ligne ou écrivez votre propre fonction de décodage."
    },
    sql: {
        title: "Injection SQL",
        description: "Trouvez une injection SQL qui vous permettra de vous connecter en tant qu'administrateur :",
        query: "SELECT * FROM users WHERE username = '[INPUT]' AND password = 'password'",
        solution: "' OR '1'='1",
        hint: "Pensez à comment vous pourriez rendre la condition toujours vraie."
    },
    reverse: {
        title: "Reverse Engineering",
        description: "Analysez le code assembleur suivant et trouvez le flag caché :",
        asm: `
section .text
global _start

_start:
    mov eax, 0x67616c66
    mov ebx, 0x7b435442
    mov ecx, 0x52657665
    mov edx, 0x7273655f
    mov esi, 0x4d617374
    mov edi, 0x65727d
    ; Le flag est caché dans les registres
`,
        flag: "CTB{Reverse_Master}",
        hint: "Les valeurs dans les registres sont en hexadécimal. Essayez de les convertir en ASCII."
    }
};

let currentChallenge = null;

function startChallenge(type) {
    if (currentChallenge) {
        document.querySelector(`[data-challenge="${currentChallenge}"]`).classList.remove('active');
    }
    currentChallenge = type;
    document.querySelector(`[data-challenge="${type}"]`).classList.add('active');
    
    const workspace = document.getElementById('challenge-workspace');
    const challenge = challenges[type];
    
    let content = `
        <h3 class="challenge-title">${challenge.title}</h3>
        <p>${challenge.description}</p>
        <div class="challenge-content">
    `;
    
    switch(type) {
        case 'base64':
            content += `
                <p>Message codé: <span class="encoded-message">${challenge.encoded}</span></p>
                <input type="text" id="challenge-input" placeholder="Entrez le message décodé">
            `;
            break;
        case 'sql':
            content += `
                <p>Requête SQL: <code>${challenge.query}</code></p>
                <input type="text" id="challenge-input" placeholder="Entrez votre injection SQL">
            `;
            break;
        case 'reverse':
            content += `
                <pre class="asm-code">${challenge.asm}</pre>
                <input type="text" id="challenge-input" placeholder="Entrez le flag">
            `;
            break;
    }
    
    content += `
            <button class="btn cyber-btn" onclick="checkChallenge('${type}')">Vérifier</button>
            <button class="btn cyber-btn hint-btn" onclick="showHint('${type}')">Indice</button>
        </div>
    `;
    
    workspace.innerHTML = content;
    workspace.style.display = 'block';
    
    // Animation d'apparition
    workspace.classList.add('fade-in');
    setTimeout(() => workspace.classList.remove('fade-in'), 500);
}

function checkChallenge(type) {
    const input = document.getElementById('challenge-input').value;
    const challenge = challenges[type];
    let isCorrect = false;
    
    switch(type) {
        case 'base64':
            isCorrect = input === challenge.message;
            break;
        case 'sql':
            isCorrect = input === challenge.solution;
            break;
        case 'reverse':
            isCorrect = input === challenge.flag;
            break;
    }
    
    if (isCorrect) {
        showNotification("Bravo ! Défi réussi !", "success");
    } else {
        showNotification("Essayez encore !", "error");
    }
}

function showHint(type) {
    const hint = challenges[type].hint;
    showNotification(hint, "info");
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const challengeButtons = document.querySelectorAll('.start-challenge');
    challengeButtons.forEach(button => {
        button.addEventListener('click', () => {
            startChallenge(button.getAttribute('data-challenge'));
        });
    });
});
