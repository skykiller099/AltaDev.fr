import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
import { ScrollTrigger } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-background').appendChild(renderer.domElement);

// Create a torus knot
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

camera.position.z = 30;

// Post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
composer.addPass(bloomPass);

function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  composer.render();
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// Particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: 0x00ffff
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse interaction
document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();

  // Update particles
  particlesMesh.rotation.y = -0.1 * elapsedTime;

  if(mouseX > 0) {
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008);
    particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00008);
  }

  // Render
  composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();

// GSAP Animations
gsap.from('.hero h1', {
  duration: 1,
  y: 100,
  opacity: 0,
  ease: 'power3.out',
  delay: 0.5
});

gsap.from('.hero p', {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: 'power3.out',
  delay: 0.8
});

gsap.from('.cta-button', {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: 'power3.out',
  delay: 1.1
});

// Scroll animations
gsap.utils.toArray('.fade-in').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
});

// Parallax effect
gsap.utils.toArray('.parallax-bg').forEach(layer => {
  const depth = layer.dataset.depth;
  const movement = -(layer.offsetHeight * depth);
  gsap.fromTo(layer, {y: 0}, {
    y: movement,
    ease: 'none',
    scrollTrigger: {
      trigger: layer,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});


// Logo animation
gsap.to('.logo', {
  rotation: 360,
  duration: 2,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true
});

// Grid item hover animation
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {scale: 1.05, duration: 0.3, ease: 'power2.out'});
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, {scale: 1, duration: 0.3, ease: 'power2.out'});
  });
});
