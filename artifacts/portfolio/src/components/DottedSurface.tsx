import { useEffect, useRef, useState } from 'react';
import { useTheme } from './theme-provider';

export function DottedSurface() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [webglFailed, setWebglFailed] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Test WebGL availability before importing Three.js
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    let cleanupFn: (() => void) | undefined;

    import('three').then((THREE) => {
      if (!mountRef.current) return;

      const dotColor = isDark ? 0x4a5568 : 0xcbd5e1;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);
      camera.position.z = 1000;
      camera.position.y = 500;
      camera.lookAt(0, 0, 0);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        setWebglFailed(true);
        return;
      }

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const SEPARATION = 100;
      const AMOUNTX = 50;
      const AMOUNTY = 50;
      const numParticles = AMOUNTX * AMOUNTY;
      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);

      let idx = 0, j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[idx] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          positions[idx + 1] = 0;
          positions[idx + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scales[j] = 1;
          idx += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const dotCanvas = document.createElement('canvas');
      dotCanvas.width = 32;
      dotCanvas.height = 32;
      const ctx = dotCanvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(dotCanvas);

      const material = new THREE.PointsMaterial({
        color: dotColor,
        size: 12,
        map: texture,
        alphaTest: 0.5,
        transparent: true,
        opacity: 0.7,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let count = 0;
      let mouseX = 0;
      let mouseY = 0;
      let windowHalfX = w / 2;
      let windowHalfY = h / 2;

      const onPointerMove = (event: PointerEvent) => {
        if (event.isPrimary === false) return;
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      };

      const onWindowResize = () => {
        if (!mountRef.current) return;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        windowHalfX = width / 2;
        windowHalfY = height / 2;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      document.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onWindowResize);

      const animate = () => {
        animRef.current = requestAnimationFrame(animate);

        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 + 500 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        const pos = particles.geometry.attributes.position.array as Float32Array;
        const sc = particles.geometry.attributes.scale.array as Float32Array;

        let i = 0, k = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            pos[i + 1] =
              Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
            sc[k] =
              (Math.sin((ix + count) * 0.3) + 1) * 8 +
              (Math.sin((iy + count) * 0.5) + 1) * 8;
            i += 3;
            k++;
          }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;

        renderer.render(scene, camera);
        count += 0.1;
      };

      animate();

      cleanupFn = () => {
        document.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onWindowResize);
        if (animRef.current) cancelAnimationFrame(animRef.current);
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
      };
    }).catch(() => {
      setWebglFailed(true);
    });

    return () => {
      if (cleanupFn) cleanupFn();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [theme]);

  if (webglFailed) {
    return (
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen"
    />
  );
}
