"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // 이전에 devicePixelRatio 누락으로 인해 2배 축소(Zoom-out)되어 얇게 보이던 미학을 복구
        uv *= 2.0;
        
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        
        // 3개의 위치(정중앙, 우하단, 좌상단)에서 시간차를 두고 발생
        for(int k = 0; k < 3; k++) {
          float timeOffset = float(k) * 0.333;
          
          vec2 origin = vec2(0.0);
          if (k == 1) origin = vec2(2.5, -1.5); // 우측 하단
          else if (k == 2) origin = vec2(-2.5, 1.5); // 좌측 상단 (또는 좌측)
          
          vec2 currentUv = uv - origin;
          
          for(int j = 0; j < 3; j++){
            for(int i=0; i < 5; i++){
              float f = fract(t - timeOffset - 0.01*float(j)+float(i)*0.01);
              // 반경 도달 범위를 축소하고, 끝에 도달할수록 부드럽게 투명해지는 Fade 효과 적용 (서로 침범 방지)
              float radius = f * 3.5; 
              float fade = smoothstep(1.0, 0.5, f); 
              color[j] += fade * lineWidth*float(i*i) / abs(radius - length(currentUv) + mod(currentUv.x+currentUv.y, 0.2));
            }
          }
        }
        
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2(width * window.devicePixelRatio, height * window.devicePixelRatio) },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = width * window.devicePixelRatio
      uniforms.resolution.value.y = height * window.devicePixelRatio
    }

    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 -z-10"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}
