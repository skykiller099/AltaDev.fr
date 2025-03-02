const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Création du dragon stylisé
const dragonGeometry = new THREE.BufferGeometry();
const dragonMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

const dragonPoints = [];
for (let i = 0; i < 100; i++) {
    const t = i / 100 * Math.PI * 2;
    dragonPoints.push(
        new THREE.Vector3(
            Math.sin(t * 3) * Math.cos(t * 2) * 50,
            Math.cos(t * 5) * 30,
            Math.sin(t * 2) * 50
        )
    );
}

dragonGeometry.setFromPoints(dragonPoints);
const dragon = new THREE.Line(dragonGeometry, dragonMaterial);
scene.add(dragon);

camera.position.z = 100;

function animate() {
    requestAnimationFrame(animate);

    dragon.rotation.x += 0.01;
    dragon.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
