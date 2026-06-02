// assets/js/three-scene.js

const canvas3d = document.getElementById('bg-3d');
if (canvas3d && window.THREE) {
    const scene = new THREE.Scene();

    // Perspective camera, looking down at an angle
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, -60, 120);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas3d,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ==========================================
    // 1. GENERATE PARTICLE DATA
    // ==========================================
    const particleCount = 15000;
    const geometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(particleCount * 3);
    const swirlPositions = new Float32Array(particleCount * 3);
    const gridPositions = new Float32Array(particleCount * 3);

    // Grid math
    const gridSize = 400;
    const segments = Math.floor(Math.sqrt(particleCount));

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // --- STATE B: GRID POSITIONS ---
        // Lay them out flat on the XY plane
        const xGrid = ((i % segments) / segments - 0.5) * gridSize;
        const yGrid = (Math.floor(i / segments) / segments - 0.5) * gridSize;
        gridPositions[i3] = xGrid;
        gridPositions[i3 + 1] = yGrid;
        gridPositions[i3 + 2] = 0; // z is flat initially

        // --- STATE A: SWIRL/BLACK HOLE POSITIONS ---
        // Create a twisting spiral in 3D
        const radius = Math.random() * 60;
        const theta = radius * 0.2 + Math.random() * Math.PI * 2;
        const yOffset = (Math.random() - 0.5) * (150 - radius * 2); // Cone/Vortex shape

        const xSwirl = Math.cos(theta) * radius;
        const zSwirl = Math.sin(theta) * radius;

        swirlPositions[i3] = xSwirl;
        swirlPositions[i3 + 1] = zSwirl;
        swirlPositions[i3 + 2] = yOffset;

        // Initial state is Swirl
        currentPositions[i3] = swirlPositions[i3];
        currentPositions[i3 + 1] = swirlPositions[i3 + 1];
        currentPositions[i3 + 2] = swirlPositions[i3 + 2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

    // ==========================================
    // 2. MATERIAL (BLACK DOTS)
    // ==========================================
    const material = new THREE.PointsMaterial({
        color: 0x000000,
        size: 1.5,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    // Rotate so the flat plane is horizontal
    particles.rotation.x = -Math.PI / 2;
    scene.add(particles);

    // ==========================================
    // 3. INTERACTIVITY & ANIMATION LOGIC
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;

    // Raycaster for mouse repelling
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    let transitionProgress = 0;

    function animate() {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        // 1. Morph Transition (Swirl -> Grid)
        if (transitionProgress < 1.0) {
            transitionProgress += 0.003; // Smooth speed
            if (transitionProgress > 1.0) transitionProgress = 1.0;

            // Ease out cubic
            const ease = 1 - Math.pow(1 - transitionProgress, 3);

            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = swirlPositions[i3] + (gridPositions[i3] - swirlPositions[i3]) * ease;
                positions[i3 + 1] = swirlPositions[i3 + 1] + (gridPositions[i3 + 1] - swirlPositions[i3 + 1]) * ease;
                positions[i3 + 2] = swirlPositions[i3 + 2] + (gridPositions[i3 + 2] - swirlPositions[i3 + 2]) * ease;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Keep spinning while in swirl state
            particles.rotation.z += 0.02 * (1 - ease);
        }

        // 2. Rhythmic Waves & Mouse Repel (Once morph is halfway done)
        if (transitionProgress > 0.3) {
            const easeGrid = (transitionProgress - 0.3) * (1 / 0.7);
            const positions = particles.geometry.attributes.position.array;

            // Mouse Intersection
            raycaster.setFromCamera(mouse, camera);
            const intersectTarget = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, intersectTarget);

            let localTarget = null;
            if (intersectTarget) {
                localTarget = particles.worldToLocal(intersectTarget.clone());
            }

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];

                // Rhythmic Waves
                const distCenter = Math.sqrt(x * x + y * y);
                const wave1 = Math.sin(distCenter * 0.05 - time * 2) * 5;
                const wave2 = Math.cos(x * 0.04 + time) * 3;

                let targetZ = (wave1 + wave2) * easeGrid;

                // Mouse Repel (Magnet)
                if (localTarget) {
                    const dx = x - localTarget.x;
                    const dy = y - localTarget.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 50) {
                        const repelForce = (50 - dist) * 1.2;
                        targetZ -= repelForce * easeGrid; // Push down
                    }
                }

                positions[i3 + 2] = targetZ;
            }
            particles.geometry.attributes.position.needsUpdate = true;
        }

        // Camera Parallax
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-60 - mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();
}
