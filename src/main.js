
import * as THREE from "three";
import "./style.css";

// =============================================
// RESPONSIVE PIXEL RATIO
// =============================================

function getHomePixelRatio() {
  if (window.innerWidth <= 520) return 1.1;
  if (window.innerWidth <= 800) return 1.3;

  return Math.min(window.devicePixelRatio || 1, 1.7);
}

// =============================================
// 1. HOME — ORIGINAL ATEER PERFUME BOTTLE
// =============================================

const container = document.querySelector("#three-container");

if (container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight || 1,
    0.1,
    100
  );

  camera.position.set(0, 0.15, 8.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });

  renderer.setSize(
    container.clientWidth || 1,
    container.clientHeight || 1
  );

  renderer.setPixelRatio(getHomePixelRatio());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  container.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 1.4));

  const keyLight = new THREE.PointLight(0xffd79a, 55, 20);
  keyLight.position.set(3, 3, 4);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x8e9bb5, 38, 18);
  rimLight.position.set(-3, 1, -2);
  scene.add(rimLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 2);
  frontLight.position.set(0, 2, 5);
  scene.add(frontLight);

  // Main bottle
  const bottle = new THREE.Group();
  scene.add(bottle);

  const darkGlass = new THREE.MeshPhysicalMaterial({
    color: 0x171713,
    metalness: 0.48,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.08
  });

  const gold = new THREE.MeshStandardMaterial({
    color: 0xc5a56d,
    metalness: 0.88,
    roughness: 0.22
  });

  const labelMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8c49b,
    metalness: 0.55,
    roughness: 0.38
  });

  // Bottle body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 2.45, 0.72, 4, 4, 2),
    darkGlass
  );

  body.position.y = -0.18;
  bottle.add(body);

  // Shoulders
  const shoulder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.54, 0.72, 0.35, 48),
    darkGlass
  );

  shoulder.position.y = 1.22;
  bottle.add(shoulder);

  // Neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.31, 0.31, 0.28, 40),
    gold
  );

  neck.position.y = 1.52;
  bottle.add(neck);

  // Cap
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.37, 0.37, 0.66, 48),
    gold
  );

  cap.position.y = 1.98;
  bottle.add(cap);

  const capTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.37, 0.07, 48),
    new THREE.MeshStandardMaterial({
      color: 0xe0c58d,
      metalness: 0.9,
      roughness: 0.18
    })
  );

  capTop.position.y = 2.345;
  bottle.add(capTop);

  // Front plaque
  const plaque = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.72, 0.035),
    labelMaterial
  );

  plaque.position.set(0, -0.18, 0.38);
  bottle.add(plaque);

  // ATEER label
  const labelCanvas = document.createElement("canvas");

  labelCanvas.width = 512;
  labelCanvas.height = 300;

  const ctx = labelCanvas.getContext("2d");

  ctx.fillStyle = "#d8c49b";
  ctx.fillRect(0, 0, 512, 300);

  ctx.strokeStyle = "#8f7040";
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 15, 482, 270);

  ctx.textAlign = "center";
  ctx.fillStyle = "#211d16";

  ctx.font = "bold 62px Georgia";
  ctx.fillText("ATEER", 256, 145);

  ctx.font = "20px Arial";
  ctx.fillText("EAU DE PARFUM", 256, 190);

  ctx.font = "15px Arial";
  ctx.fillText("THE ESSENCE OF ELEGANCE", 256, 230);

  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;

  const printedLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.63),
    new THREE.MeshBasicMaterial({ map: labelTexture })
  );

  printedLabel.position.set(0, -0.18, 0.405);
  bottle.add(printedLabel);

  // Gold bottom line
  const baseLine = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.025, 0.018),
    gold
  );

  baseLine.position.set(0, -1.17, 0.37);
  bottle.add(baseLine);

  // =====================================
  // HOME GOLD PARTICLES
  // =====================================

  const particleCount = 125;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = [];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 7;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1;

    particleSpeeds.push(0.15 + Math.random() * 0.4);
  }

  const particleGeometry = new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xd8b36d,
    size: 0.045,
    transparent: true,
    opacity: 0.88,
    sizeAttenuation: true,
    depthWrite: false
  });

  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  // =====================================
  // HOME MOUSE INTERACTION
  // =====================================

  let targetRotationY = 0;
  let targetRotationX = 0;

  container.addEventListener("pointermove", (event) => {
    const bounds = container.getBoundingClientRect();

    const pointerX = (event.clientX - bounds.left) / bounds.width;
    const pointerY = (event.clientY - bounds.top) / bounds.height;

    targetRotationY = (pointerX - 0.5) * 1.5;
    targetRotationX = (pointerY - 0.5) * 0.35;
  });

  container.addEventListener("pointerleave", () => {
    targetRotationY = 0;
    targetRotationX = 0;
  });

  // =====================================
  // HOME RESPONSIVE
  // =====================================

  const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(getHomePixelRatio());
    renderer.setSize(width, height);
  });

  resizeObserver.observe(container);

  // =====================================
  // HOME ANIMATION
  // =====================================

  const clock = new THREE.Clock();

  let homeAnimationId;

  function animateHome() {
    homeAnimationId = requestAnimationFrame(animateHome);

    const elapsed = clock.getElapsedTime();

    bottle.rotation.y +=
      (targetRotationY - bottle.rotation.y) * 0.055;

    bottle.rotation.x +=
      (targetRotationX - bottle.rotation.x) * 0.055;

    bottle.position.y = Math.sin(elapsed * 0.8) * 0.045;

    bottle.rotation.y += Math.sin(elapsed * 0.35) * 0.0008;

    particles.rotation.y = elapsed * 0.025;

    const positions = particleGeometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += particleSpeeds[i] * 0.008;
      positions[i * 3] += Math.sin(elapsed + i) * 0.0008;

      if (positions[i * 3 + 1] > 3) {
        positions[i * 3 + 1] = -3;
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animateHome();

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(homeAnimationId);
    resizeObserver.disconnect();

    particleGeometry.dispose();
    particleMaterial.dispose();

    renderer.dispose();
  });
}


// =============================================
// 2. COLLECTION — PRODUCT LABEL TEXTURE
// =============================================

function createProductLabel(title, color = "#d8c49b") {
  const canvas = document.createElement("canvas");

  canvas.width = 512;
  canvas.height = 300;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 300);

  ctx.strokeStyle = "#947747";
  ctx.lineWidth = 5;
  ctx.strokeRect(15, 15, 482, 270);

  ctx.textAlign = "center";
  ctx.fillStyle = "#211d16";

  ctx.font = "bold 68px Georgia";
  ctx.fillText("ATEER", 256, 125);

  ctx.font = "bold 30px Georgia";
  ctx.fillText(title, 256, 180);

  ctx.font = "19px Arial";
  ctx.fillText("EAU DE PARFUM", 256, 225);

  ctx.font = "15px Arial";
  ctx.fillText("THE ESSENCE OF ELEGANCE", 256, 255);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}


// =============================================
// 3. COLLECTION — CREATE THREE BOTTLES
// =============================================

function createProductBottle(type) {
  const bottle = new THREE.Group();

  const gold = new THREE.MeshStandardMaterial({
    color: 0xc5a56d,
    metalness: 0.88,
    roughness: 0.2
  });

  const goldLight = new THREE.MeshStandardMaterial({
    color: 0xe0c58d,
    metalness: 0.9,
    roughness: 0.17
  });

  let bodyMaterial;
  let body;
  let frontZ = 0.4;
  let labelColor = "#d8c49b";

  // ---------------------------------
  // OUD — BLACK LUXURY BOTTLE
  // ---------------------------------

  if (type === "oud") {
    bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x171713,
      metalness: 0.45,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.08
    });

    body = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 1.85, 0.62, 4, 4, 2),
      bodyMaterial
    );

    body.position.y = -0.18;
    bottle.add(body);

    const shoulder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.62, 0.32, 48),
      bodyMaterial
    );

    shoulder.position.y = 0.91;
    bottle.add(shoulder);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.22, 40),
      gold
    );

    neck.position.y = 1.17;
    bottle.add(neck);

    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.52, 0.65),
      gold
    );

    cap.position.y = 1.53;
    bottle.add(cap);

    const capTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.61, 0.05, 0.61),
      goldLight
    );

    capTop.position.y = 1.815;
    bottle.add(capTop);

    frontZ = 0.325;
    labelColor = "#d8c49b";
  }

  // ---------------------------------
  // ROSE — PINK LUXURY BOTTLE
  // ---------------------------------

  if (type === "rose") {
    bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc98291,
      metalness: 0.28,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });

    body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 1.85, 64),
      bodyMaterial
    );

    body.position.y = -0.18;
    bottle.add(body);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.34, 0.27, 48),
      gold
    );

    neck.position.y = 0.91;
    bottle.add(neck);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.36, 0.58, 48),
      gold
    );

    cap.position.y = 1.335;
    bottle.add(cap);

    const capTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.33, 0.36, 0.06, 48),
      goldLight
    );

    capTop.position.y = 1.655;
    bottle.add(capTop);

    frontZ = 0.645;
    labelColor = "#ead0cc";
  }

  // ---------------------------------
  // AMBER — HEXAGONAL AMBER BOTTLE
  // ---------------------------------

  if (type === "amber") {
    bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9c531c,
      metalness: 0.38,
      roughness: 0.19,
      clearcoat: 1,
      clearcoatRoughness: 0.08
    });

    body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.72, 1.85, 6),
      bodyMaterial
    );

    body.rotation.y = Math.PI / 6;
    body.position.y = -0.18;
    bottle.add(body);

    const shoulder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.37, 0.55, 0.28, 6),
      bodyMaterial
    );

    shoulder.rotation.y = Math.PI / 6;
    shoulder.position.y = 0.91;
    bottle.add(shoulder);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.24, 6),
      gold
    );

    neck.position.y = 1.17;
    bottle.add(neck);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.58, 6),
      gold
    );

    cap.rotation.y = Math.PI / 6;
    cap.position.y = 1.58;
    bottle.add(cap);

    const capTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.35, 0.06, 6),
      goldLight
    );

    capTop.rotation.y = Math.PI / 6;
    capTop.position.y = 1.9;
    bottle.add(capTop);

    frontZ = 0.645;
    labelColor = "#e3c18b";
  }

  // ---------------------------------
  // PRODUCT LABEL
  // ---------------------------------

  const labelTexture = createProductLabel(
    type.toUpperCase(),
    labelColor
  );

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(
      type === "oud" ? 0.9 : 0.95,
      0.55
    ),
    new THREE.MeshBasicMaterial({
      map: labelTexture
    })
  );

  label.position.set(0, -0.18, frontZ + 0.025);
  bottle.add(label);

  // Gold base decoration
  const baseLine = new THREE.Mesh(
    new THREE.BoxGeometry(
      type === "oud" ? 1.12 : 1.1,
      0.025,
      0.025
    ),
    gold
  );

  baseLine.position.set(0, -1.08, frontZ);
  bottle.add(baseLine);

  return bottle;
}


// =============================================
// 4. COLLECTION — INITIALIZE PRODUCT CANVASES
// =============================================

const productCanvases = document.querySelectorAll(".product-canvas");

productCanvases.forEach((canvas) => {
  const type = canvas.dataset.bottle;

  if (!["oud", "rose", "amber"].includes(type)) {
    console.warn("Unknown perfume bottle:", type);
    return;
  }

  const productScene = new THREE.Scene();

  const productCamera = new THREE.PerspectiveCamera(
    35,
    1,
    0.1,
    100
  );

  productCamera.position.set(0, 0.1, 5.8);

  const productRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power"
  });

  productRenderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 1.25)
  );

  productRenderer.outputColorSpace = THREE.SRGBColorSpace;
  productRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  productRenderer.toneMappingExposure = 1.2;

  // Product lighting
  productScene.add(
    new THREE.AmbientLight(0xffffff, 1.7)
  );

  const productKeyLight = new THREE.PointLight(
    0xffd79a,
    35,
    15
  );

  productKeyLight.position.set(3, 3, 4);
  productScene.add(productKeyLight);

  const productRimLight = new THREE.PointLight(
    0x9b8a75,
    20,
    15
  );

  productRimLight.position.set(-3, 1, -3);
  productScene.add(productRimLight);

  const productFrontLight = new THREE.DirectionalLight(
    0xffffff,
    2
  );

  productFrontLight.position.set(0, 2, 5);
  productScene.add(productFrontLight);

  // Create product bottle
  const productBottle = createProductBottle(type);

  // Adjust bottle sizes
  if (type === "oud") {
    productBottle.scale.set(0.88, 0.88, 0.88);
  }

  if (type === "amber") {
    productBottle.scale.set(0.90, 0.90, 0.90);
  }

  productScene.add(productBottle);

  // Mouse interaction
  let targetX = 0;
  let targetY = 0;

  canvas.addEventListener("pointermove", (event) => {
    const bounds = canvas.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    targetY = (x - 0.5) * 0.8;
    targetX = (y - 0.5) * 0.3;
  });

  canvas.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  // Responsive product canvas
  function resizeProduct() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    productCamera.aspect = width / height;
    productCamera.updateProjectionMatrix();

    const productPixelRatio =
      window.innerWidth <= 520 ? 1 :
      window.innerWidth <= 800 ? 1.1 :
      Math.min(window.devicePixelRatio || 1, 1.25);

    productRenderer.setPixelRatio(productPixelRatio);
    productRenderer.setSize(width, height, false);
  }

  const productResizeObserver = new ResizeObserver(resizeProduct);
  productResizeObserver.observe(canvas);

  resizeProduct();

  // Product animation
  const productClock = new THREE.Clock();

  let productAnimationId;

  function animateProduct() {
    if (!canvas.isConnected) {
      cancelAnimationFrame(productAnimationId);
      productResizeObserver.disconnect();
      productRenderer.dispose();
      return;
    }

    productAnimationId = requestAnimationFrame(animateProduct);

    const elapsed = productClock.getElapsedTime();

    productBottle.rotation.y +=
      (targetY - productBottle.rotation.y) * 0.06;

    productBottle.rotation.x +=
      (targetX - productBottle.rotation.x) * 0.06;

    productBottle.position.y =
      Math.sin(elapsed * 0.9) * 0.045;

    productRenderer.render(productScene, productCamera);
  }

  animateProduct();
});


// =============================================
// 5. GOLD CURSOR SPOTLIGHT
// =============================================

const glow = document.querySelector(".cursor-glow");

if (glow && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateGlow() {
    requestAnimationFrame(animateGlow);

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
  }

  animateGlow();
}


// =============================================
// 6. RESPONSIVE MOBILE NAVIGATION
// =============================================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  // Close menu after clicking a link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });

  // Reset menu when returning to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      mainNav.classList.remove("nav-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  });
}
