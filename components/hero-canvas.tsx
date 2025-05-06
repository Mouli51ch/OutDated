"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasRef.current.appendChild(renderer.domElement)

    // Camera position
    camera.position.z = 30

    // Create a group for all objects
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 6000

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position - create a sphere distribution
      const radius = 50 * Math.pow(Math.random(), 1 / 3)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)

      // Color - gradient from teal to purple with some variation
      const colorRatio = Math.random()
      // R component - purple has high R
      colorArray[i] = 0.1 + colorRatio * 0.5
      // G component - teal has high G
      colorArray[i + 1] = 0.8 - colorRatio * 0.6
      // B component - both teal and purple have high B
      colorArray[i + 2] = 0.8

      // Scale - random sizes for particles
      scaleArray[i / 3] = Math.random() * 2 + 0.5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Create shader material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    mainGroup.add(particlesMesh)

    // Create grid for futuristic effect
    const gridSize = 100
    const gridDivisions = 20
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x00fff5,
      transparent: true,
      opacity: 0.15,
    })

    // Horizontal grid
    const horizontalGrid = new THREE.GridHelper(gridSize, gridDivisions, 0x9945ff, 0x00fff5)
    horizontalGrid.position.y = -20
    horizontalGrid.material = gridMaterial
    mainGroup.add(horizontalGrid)

    // Vertical grid
    const verticalGridGeometry = new THREE.BufferGeometry()
    const verticalGridPositions = []
    const step = gridSize / gridDivisions

    for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
      // Vertical lines along z-axis
      verticalGridPositions.push(i, -20, -gridSize / 2)
      verticalGridPositions.push(i, -20, gridSize / 2)

      // Vertical lines along x-axis
      verticalGridPositions.push(-gridSize / 2, -20, i)
      verticalGridPositions.push(gridSize / 2, -20, i)
    }

    verticalGridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(verticalGridPositions, 3))
    const verticalGrid = new THREE.LineSegments(verticalGridGeometry, gridMaterial)
    mainGroup.add(verticalGrid)

    // Create digital rain effect (Matrix-like)
    const rainCount = 50
    const rainGeometry = new THREE.BufferGeometry()
    const rainPositions = []
    const rainColors = []

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      const y1 = 50
      const y2 = -50

      rainPositions.push(x, y1, z)
      rainPositions.push(x, y2, z)

      // Color gradient from top to bottom
      rainColors.push(0, 1, 0.8) // Teal at top
      rainColors.push(0.6, 0, 1) // Purple at bottom
    }

    rainGeometry.setAttribute("position", new THREE.Float32BufferAttribute(rainPositions, 3))
    rainGeometry.setAttribute("color", new THREE.Float32BufferAttribute(rainColors, 3))

    const rainMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    })

    const rain = new THREE.LineSegments(rainGeometry, rainMaterial)
    mainGroup.add(rain)

    // Create glowing orbs
    const orbsCount = 15
    const orbsGroup = new THREE.Group()

    for (let i = 0; i < orbsCount; i++) {
      const radius = Math.random() * 0.5 + 0.3
      const geometry = new THREE.SphereGeometry(radius, 16, 16)

      // Create glowing material
      const color = Math.random() > 0.5 ? 0x00fff5 : 0x9945ff
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
      })

      const orb = new THREE.Mesh(geometry, material)

      // Random position
      orb.position.x = (Math.random() - 0.5) * 60
      orb.position.y = (Math.random() - 0.5) * 60
      orb.position.z = (Math.random() - 0.5) * 60

      // Store initial position and random speed
      orb.userData.initialPosition = orb.position.clone()
      orb.userData.speed = Math.random() * 0.02 + 0.01
      orb.userData.amplitude = Math.random() * 5 + 3

      orbsGroup.add(orb)
    }

    mainGroup.add(orbsGroup)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point lights for glow effect
    const pointLight1 = new THREE.PointLight(0x00fff5, 1, 100)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x9945ff, 1, 100)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate main group slowly
      mainGroup.rotation.y = elapsedTime * 0.05
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1

      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]
        const z = positions[i3 + 2]

        // Create wave effect
        positions[i3] += Math.sin(elapsedTime * 0.5 + y * 0.05) * 0.02
        positions[i3 + 1] += Math.cos(elapsedTime * 0.3 + x * 0.05) * 0.02
        positions[i3 + 2] += Math.sin(elapsedTime * 0.4 + z * 0.05) * 0.02

        // Reset particles that get too far
        const distance = Math.sqrt(x * x + y * y + z * z)
        if (distance > 60) {
          positions[i3] *= 0.95
          positions[i3 + 1] *= 0.95
          positions[i3 + 2] *= 0.95
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true

      // Animate grid
      horizontalGrid.rotation.y = elapsedTime * 0.1
      verticalGrid.rotation.y = elapsedTime * 0.1

      // Animate rain
      const rainPositions = rainGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < rainCount * 2; i += 2) {
        const i3 = i * 3

        // Move rain down
        rainPositions[i3 + 1] -= 0.3
        rainPositions[i3 + 4] -= 0.3

        // Reset rain that goes below the grid
        if (rainPositions[i3 + 4] < -50) {
          rainPositions[i3 + 1] = 50
          rainPositions[i3 + 4] = -50
        }
      }
      rainGeometry.attributes.position.needsUpdate = true

      // Animate orbs
      orbsGroup.children.forEach((orb) => {
        const initialPos = orb.userData.initialPosition
        const speed = orb.userData.speed
        const amplitude = orb.userData.amplitude

        orb.position.x = initialPos.x + Math.sin(elapsedTime * speed) * amplitude
        orb.position.y = initialPos.y + Math.cos(elapsedTime * speed * 1.5) * amplitude
        orb.position.z = initialPos.z + Math.sin(elapsedTime * speed * 0.5) * amplitude
      })

      // Animate point lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.7) * 15
      pointLight1.position.y = Math.cos(elapsedTime * 0.5) * 15
      pointLight2.position.x = Math.cos(elapsedTime * 0.3) * 15
      pointLight2.position.y = Math.sin(elapsedTime * 0.5) * 15

      renderer.render(scene, camera)
      window.requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }

      // Clean up resources
      scene.remove(mainGroup)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      horizontalGrid.geometry.dispose()
      verticalGridGeometry.dispose()
      gridMaterial.dispose()
      rainGeometry.dispose()
      rainMaterial.dispose()

      orbsGroup.children.forEach((orb) => {
        ;(orb as THREE.Mesh).geometry
          .dispose()((orb as THREE.Mesh).material as THREE.Material)
          .dispose()
      })
    }
  }, [])

  return <div ref={canvasRef} className="absolute inset-0" />
}
