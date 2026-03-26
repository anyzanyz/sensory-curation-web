import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCurationStore } from '../store/useCurationStore';
import './PrismShaderMaterial';

// Ensure TypeScript recognizes our custom shader material element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      prismAuroraMaterial: any;
    }
  }
}

function PrismMesh() {
  const materialRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<any>(null);

  const { isPlaying, isAudioInitialized, setAudioInitialized } = useCurationStore();

  useEffect(() => {
    // Initialize Web Audio API on first interaction or when instructed
    const initAudio = () => {
      if (analyserRef.current) return;
      
      const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
      if (!audioElement) return;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      setAudioInitialized(true);
    };

    const handleInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [setAudioInitialized]);

  useEffect(() => {
    const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
    if (audioElement && isAudioInitialized) {
      if (isPlaying) {
        audioElement.play().catch(console.error);
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, isAudioInitialized]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      if (analyserRef.current && dataArrayRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Calculate average frequency and bass
        let sum = 0;
        let bassSum = 0;
        const length = dataArrayRef.current.length;
        
        for (let i = 0; i < length; i++) {
          sum += dataArrayRef.current[i];
          if (i < 10) bassSum += dataArrayRef.current[i]; // Lower frequencies (bass)
        }
        
        const avgFreq = sum / length / 255.0;
        const avgBass = bassSum / 10 / 255.0;

        // Smoothly transition uniforms
        materialRef.current.uFrequency = THREE.MathUtils.lerp(materialRef.current.uFrequency, avgFreq, 0.1);
        materialRef.current.uBass = THREE.MathUtils.lerp(materialRef.current.uBass, avgBass, 0.1);
      } else {
        // Fallback to idle animation when paused
        materialRef.current.uFrequency = THREE.MathUtils.lerp(materialRef.current.uFrequency, 0, 0.05);
        materialRef.current.uBass = THREE.MathUtils.lerp(materialRef.current.uBass, 0, 0.05);
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10, 64, 64]} />
      {/* @ts-ignore - custom shader element registered via extend */}
      <prismAuroraMaterial 
        ref={materialRef} 
        transparent
        // Neon colors based on user rules
        uColor1={new THREE.Color("#00FFFF")} // Cyan
        uColor2={new THREE.Color("#FF00FF")} // Magenta
        uColor3={new THREE.Color("#00FF00")} // Lime
      />
    </mesh>
  );
}

export function CanvasEngine() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <PrismMesh />
    </Canvas>
  );
}
