"use client";

import { Button } from "@/components/ui/button";
import { FullscreenIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

interface OrbitalElements {
  argOfPeriapsis: number;
  period: number;
  eccentricity: number;
  semiMajorAxis: number;
  epoch: number;
  inclination: number;
}

export interface Planet {
  lightEmitting?: boolean;
  name: string;
  customOrbit: string;
  radius: number;
  type: string;
  id: number;
  fetchElements?: boolean;
  elements?: OrbitalElements; // Este campo es opcional
  orbitColor?: string;
}

export default function Three({ host }: { host: Planet[] }) {
  console.log(host);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const canvasWidth = 400;
  const canvasHeight = 200;

  const setCanvasSize = (width: number, height: number) => {
    if (rendererRef.current) {
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;

    setCanvasSize(canvasWidth, canvasHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      renderer.domElement.style.width = `${canvasWidth}px`;
      renderer.domElement.style.height = `${canvasHeight}px`;
    }
    const element = mountRef.current as HTMLElement;

    function crearLinea(puntos: THREE.Vector3[], color: number) {
      const geometría = new THREE.BufferGeometry().setFromPoints(puntos);
      const material = new THREE.LineBasicMaterial({ color });
      return new THREE.Line(geometría, material);
    }

    const lineX = crearLinea(
      [new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)],
      0xffffff
    );
    const lineY = crearLinea(
      [new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)],
      0xffffff
    );
    const lineZ = crearLinea(
      [new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 5)],
      0xffffff
    );

    scene.add(lineX);
    scene.add(lineY);
    scene.add(lineZ);

    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("/textures/sun.jpg");
    const aridTexture = textureLoader.load("/textures/arid.jpg");

    host.forEach((h, index) => {
      const materialEsfera =
        index === 0
          ? new THREE.MeshBasicMaterial({ map: sunTexture })
          : new THREE.MeshBasicMaterial({ map: aridTexture });

      const factor = 100000;
      const tamañoEsfera =
        index === 0 ? h.radius / (factor * 5) : h.radius / factor;

      const geometríaEsfera = new THREE.SphereGeometry(tamañoEsfera, 32, 32);
      const esfera = new THREE.Mesh(geometríaEsfera, materialEsfera);

      const distancia = tamañoEsfera * 3; // Ajustar la distancia para evitar solapamiento
      esfera.position.set(index * distancia, 0, 0);
      scene.add(esfera);

      // Crear el texto como un sprite
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!; // Usamos "!" para afirmar que no es null

      context.font = "32px Arial";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.fillText(
        h.name || `Esfera ${index + 1}`,
        canvas.width / 2,
        canvas.height / 2
      );

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);

      // Ajustar la posición del sprite para que esté encima de la esfera
      sprite.position.set(index * 2, tamañoEsfera + 0.5, 0);
      sprite.scale.set(2, 1, 1); // Ajustar el tamaño del texto si es necesario
      scene.add(sprite);
    });

    camera.position.z = 5;

    const controls = new OrbitControls(camera, element);
    camera.position.set(3, 3, 3);
    controls.update();

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 1500, 1000);
    light.castShadow = true;

    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (document.fullscreenElement) {
        setCanvasSize(window.innerWidth, window.innerHeight);
      } else {
        setCanvasSize(canvasWidth, canvasHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (mountRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mountRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="flex items-center justify-center" ref={mountRef}/>
  );
}
