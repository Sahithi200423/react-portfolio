import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function HeroCanvas3D() {
  const mountRef = useRef(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // If WebGL is not supported, set fallback
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGLError(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let renderer, scene, camera, particleSystem, linesMesh;

    try {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 700;

      // 1. Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.z = 240;

      // 2. WebGL Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      // 3. Particles Configuration
      const particleCount = 75;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 350;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 150;

        velocities.push({
          x: (Math.random() - 0.5) * 0.25,
          y: (Math.random() - 0.5) * 0.25,
          z: (Math.random() - 0.5) * 0.2,
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Particle Material - adapting to dark/light theme
      const particleColor = isDark ? 0x00f2fe : 0x0077b6;
      const particleMaterial = new THREE.PointsMaterial({
        color: particleColor,
        size: 3.5,
        transparent: true,
        opacity: isDark ? 0.75 : 0.6,
        blending: THREE.AdditiveBlending,
      });

      particleSystem = new THREE.Points(geometry, particleMaterial);
      scene.add(particleSystem);

      // Optional Connecting Lines Geometry
      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0x8a2be2 : 0x7209b7,
        transparent: true,
        opacity: isDark ? 0.18 : 0.12,
      });

      const maxConnections = 120;
      const linePositions = new Float32Array(maxConnections * 6);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      // Handle Window Resize
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight || 700;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize, { passive: true });

      // Mouse interactivity (subtle parallax)
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / width - 0.5) * 20;
        mouseY = ((e.clientY - rect.top) / height - 0.5) * -20;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Animation Loop
      const animate = () => {
        if (!prefersReducedMotion) {
          const pos = particleSystem.geometry.attributes.position.array;
          let lineIdx = 0;
          const linePos = linesMesh.geometry.attributes.position.array;

          for (let i = 0; i < particleCount; i++) {
            pos[i * 3] += velocities[i].x;
            pos[i * 3 + 1] += velocities[i].y;
            pos[i * 3 + 2] += velocities[i].z;

            // Bounce on boundaries
            if (pos[i * 3] < -180 || pos[i * 3] > 180) velocities[i].x *= -1;
            if (pos[i * 3 + 1] < -120 || pos[i * 3 + 1] > 120) velocities[i].y *= -1;
            if (pos[i * 3 + 2] < -80 || pos[i * 3 + 2] > 80) velocities[i].z *= -1;

            // Connect nearby points
            for (let j = i + 1; j < particleCount; j++) {
              const dx = pos[i * 3] - pos[j * 3];
              const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
              const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

              if (dist < 55 && lineIdx < maxConnections) {
                linePos[lineIdx * 6] = pos[i * 3];
                linePos[lineIdx * 6 + 1] = pos[i * 3 + 1];
                linePos[lineIdx * 6 + 2] = pos[i * 3 + 2];
                linePos[lineIdx * 6 + 3] = pos[j * 3];
                linePos[lineIdx * 6 + 4] = pos[j * 3 + 1];
                linePos[lineIdx * 6 + 5] = pos[j * 3 + 2];
                lineIdx++;
              }
            }
          }

          particleSystem.geometry.attributes.position.needsUpdate = true;
          linesMesh.geometry.setDrawRange(0, lineIdx * 2);
          linesMesh.geometry.attributes.position.needsUpdate = true;

          // Gentle rotation & mouse inertia
          scene.rotation.y += 0.0008;
          camera.position.x += (mouseX - camera.position.x) * 0.04;
          camera.position.y += (mouseY - camera.position.y) * 0.04;
          camera.lookAt(scene.position);
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Clean up resources on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        if (geometry) geometry.dispose();
        if (particleMaterial) particleMaterial.dispose();
        if (lineGeometry) lineGeometry.dispose();
        if (lineMaterial) lineMaterial.dispose();
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, using CSS mesh fallback:', err);
      setHasWebGLError(true);
    }
  }, [isDark]);

  if (hasWebGLError) {
    return <div className="hero-mesh-fallback" aria-hidden="true" />;
  }

  return (
    <div
      ref={mountRef}
      className="hero-3d-canvas-wrap"
      aria-hidden="true"
    />
  );
}
