import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import moznoLogo3d from "../../assets/mozno-logo-3d.glb";

import { MoznoLoaderMinimal } from "./Loader";

let glbCachePromise = null;
let glbCacheScene = null;

function getWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

const MoznoGLBLoader = ({ active = true }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(active);

  const [webglSupported] = useState(() => {
    if (typeof window === "undefined") return false;
    return getWebGLSupport();
  });

  const [hasMounted, setHasMounted] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!webglSupported) return;
    if (!containerRef.current) return;

    if (!rendererRef.current) {
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0.2, 2.5);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      rendererRef.current = renderer;

      containerRef.current.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0x10b981, 1.1);
      dir.position.set(2, 2, 2);
      scene.add(dir);

      glbCachePromise =
        glbCachePromise ||
        new Promise((resolve, reject) => {
          const loader = new GLTFLoader();
          loader.load(
            moznoLogo3d,
            (gltf) => {
              glbCacheScene = gltf.scene;
              resolve(glbCacheScene);
            },
            undefined,
            (err) => reject(err),
          );
        });

      glbCachePromise
        .then((cachedScene) => {
          if (!sceneRef.current) return;

          const cloned = cachedScene.clone(true);
          modelRef.current = cloned;
          cloned.position.set(0, 0, 0);
          cloned.scale.set(0.9, 0.9, 0.9);

          sceneRef.current.add(cloned);

          renderer.render(sceneRef.current, cameraRef.current);
          setHasMounted(true);
          setLoadFailed(false);
        })
        .catch(() => {
          setLoadFailed(true);
        });

      const handleResize = () => {
        const w = containerRef.current?.clientWidth || window.innerWidth;
        const h = containerRef.current?.clientHeight || window.innerHeight;
        if (!w || !h) return;
        if (cameraRef.current) cameraRef.current.aspect = w / h;
        if (cameraRef.current) cameraRef.current.updateProjectionMatrix();
        if (rendererRef.current) {
          rendererRef.current.setSize(w, h);
          rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [webglSupported]);

  useEffect(() => {
    if (!webglSupported) return;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const model = modelRef.current;
      if (model && activeRef.current && !prefersReducedMotion) {
        model.rotation.y += 0.01;
        model.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };

    if (active) {
      if (!rafRef.current) animate();
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [active, webglSupported, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        const domEl = rendererRef.current.domElement;
        if (domEl?.parentNode) domEl.parentNode.removeChild(domEl);
        rendererRef.current.dispose();
      }
    };
  }, []);

  if (!webglSupported) return <MoznoLoaderMinimal />;

  if (active && (!hasMounted || loadFailed)) return <MoznoLoaderMinimal />;

  if (!hasMounted && !active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/50"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity 180ms ease",
      }}
    >
      <div
        ref={containerRef}
        className="w-72 h-72 sm:w-80 sm:h-80 relative"
        style={{
          filter: "drop-shadow(0 18px 36px rgba(16,185,129,0.15))",
        }}
      />
    </div>
  );
};

export default MoznoGLBLoader;

