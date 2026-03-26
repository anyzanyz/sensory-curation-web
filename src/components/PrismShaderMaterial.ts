import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// A custom shader that creates a fluid, organic "Prism Aurora" effect
// rather than a mechanical EQ bar. It uses a simplex noise approach 
// modified by audio frequency and bass data.
export const PrismAuroraMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 0,
    uBass: 0,
    uColor1: new THREE.Color("#00BFFF"), // Deeper Cyan
    uColor2: new THREE.Color("#FF007F"), // Deeper Magenta
    uColor3: new THREE.Color("#009900"), // Deeper Lime
    uResolution: new THREE.Vector2()
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uBass;

    // Simple 3D noise function snippet could be injected here
    // For simplicity, we use sine waves combined with uBass
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Organic displacement based on bass
      vec3 pos = position;
      float noise = sin(pos.x * 5.0 + uTime) * cos(pos.y * 5.0 + uTime);
      pos.z += noise * uBass * 0.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uFrequency;
    uniform float uBass;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Create a fluid gradient
      vec2 st = vUv;
      
      // Center coordinates
      vec2 center = vec2(0.5);
      float dist = distance(st, center);
      
      // Create a central "o" hole (The logo's 'o' character static center hole)
      // "the logo's 'o' character features a static, clean center hole and an outer edge that exhibits a slow, sharp, and jagged wave motion"
      float holeMask = smoothstep(0.2, 0.25, dist);
      
      // Wave motion on the outer edge
      float angle = atan(st.y - 0.5, st.x - 0.5);
      float wave = sin(angle * 10.0 + uTime * 2.0) * 0.05 * uFrequency;
      wave += cos(angle * 5.0 - uTime) * 0.05 * uBass;
      
      float ringMaks = smoothstep(0.3 + wave, 0.35 + wave, dist);
      float finalMask = holeMask * (1.0 - ringMaks);

      // Mix colors based on position and time
      vec3 color = mix(uColor1, uColor2, sin(st.x * 10.0 + uTime) * 0.5 + 0.5);
      color = mix(color, uColor3, cos(st.y * 10.0 - uTime) * 0.5 + 0.5);
      
      // Enhance brightness based on audio
      color *= (1.0 + uFrequency * 2.0);

      // We only draw the glowing wave, rest is transparent
      // Decrease base alpha so it blends cleaner on white
      float alpha = finalMask * (0.3 + uBass * 0.4);
      
      // Add general ambient flow (soft background gradient) if outside the ring
      float bgFlow = smoothstep(0.4, 1.0, dist) * 0.05 * uFrequency;
      
      // Combine
      gl_FragColor = vec4(color, alpha + bgFlow);
    }
  `
);

// Register the material to R3F
extend({ PrismAuroraMaterial });
