"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Environment,
  Float,
  Torus,
  Box,
  Octahedron,
  Stars,
  Sparkles,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Globe,
  SparklesIcon,
  Rocket,
  Users,
  TrendingUp,
  Award,
  Play,
  ChevronDown,
} from "lucide-react"
import type * as THREE from "three"

// Enhanced 3D Floating Objects
function FloatingGeometry({ position, geometry, color, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2
    }
  })

  const GeometryComponent =
    geometry === "sphere" ? Sphere : geometry === "torus" ? Torus : geometry === "box" ? Box : Octahedron

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <GeometryComponent
        ref={meshRef}
        position={position}
        args={geometry === "torus" ? [0.5, 0.2, 16, 32] : [0.8]}
        scale={0.8}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </GeometryComponent>
    </Float>
  )
}

// Main Hero 3D Scene
function HeroScene() {
  const { viewport } = useThree()

  return (
    <>
      <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} />

      {/* Main Central Sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[1.2, 100, 200]} scale={1.5}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.6}
            speed={2}
            roughness={0}
            metalness={1}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      {/* Floating Geometric Objects */}
      <FloatingGeometry position={[-3, 1, -2]} geometry="torus" color="#ec4899" speed={0.8} />
      <FloatingGeometry position={[3, -1, -1]} geometry="octahedron" color="#06b6d4" speed={1.2} />
      <FloatingGeometry position={[-2, -2, 1]} geometry="box" color="#10b981" speed={0.6} />
      <FloatingGeometry position={[2.5, 2, 0]} geometry="sphere" color="#f59e0b" speed={1.4} />

      {/* Ambient and Point Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#06b6d4" />
    </>
  )
}

// Secondary 3D Scene for Features Section
function FeatureScene() {
  return (
    <>
      <Stars radius={100} depth={30} count={500} factor={4} saturation={0} fade speed={0.5} />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <Torus args={[1, 0.3, 16, 32]} scale={0.8}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
            emissive="#06b6d4"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
    </>
  )
}

// Enhanced Feature Card with 3D Elements
function EnhancedFeatureCard({
  icon: Icon,
  title,
  description,
  delay,
  gradient,
}: {
  icon: any
  title: string
  description: string
  delay: number
  gradient: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="relative bg-black/60 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <CardContent className="p-8 relative z-10">
          <motion.div
            className="flex items-center space-x-4 mb-6"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-lg opacity-50`} />
              <div className={`relative p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </motion.div>

          <p className="text-gray-300 leading-relaxed text-lg">{description}</p>

          <motion.div
            className="mt-6 flex items-center text-purple-400 font-semibold cursor-pointer"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Mouse Follower Component
function MouseFollower() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10)
      mouseY.set(e.clientY - 10)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed w-5 h-5 bg-purple-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  )
}

export default function StrikingHulyLanding() {
  const [email, setEmail] = useState("")
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const features = [
    {
      icon: Zap,
      title: "Lightning Performance",
      description:
        "Experience blazing-fast speeds with our quantum-optimized infrastructure that processes millions of operations per second.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Shield,
      title: "Quantum Security",
      description:
        "Military-grade encryption with quantum-resistant algorithms that protect your data against future threats.",
      gradient: "from-green-400 to-blue-500",
    },
    {
      icon: Rocket,
      title: "Infinite Scale",
      description:
        "Auto-scaling architecture that grows with your ambitions, from startup to enterprise without limits.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Globe,
      title: "Global Edge Network",
      description: "Deploy instantly across 200+ edge locations worldwide with sub-millisecond latency everywhere.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Users,
      title: "Collaborative Intelligence",
      description:
        "AI-powered collaboration tools that understand your team's workflow and optimize productivity automatically.",
      gradient: "from-pink-400 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description:
        "Advanced machine learning algorithms that predict trends and optimize your business decisions in real-time.",
      gradient: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <MouseFollower />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <Suspense fallback={null}>
              <HeroScene />
              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            </Suspense>
          </Canvas>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 -z-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 -z-5" />

        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity, scale: scaleProgress }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-base font-medium backdrop-blur-sm">
              <SparklesIcon className="w-4 h-4 mr-2" />
              The Future is Here
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Build
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Beyond
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Limits
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Experience the next evolution of digital creation with our revolutionary platform that transforms
            imagination into reality through cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Building
                <Rocket className="ml-3 h-6 w-6" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span>Deploy in seconds</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center relative">
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-1.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
              />
            </div>
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Trusted by Millions
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              Join the revolution that's transforming how the world builds digital experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: 50, suffix: "M+", label: "Active Developers", icon: Users },
              { number: 99.99, suffix: "%", label: "Uptime SLA", icon: Shield },
              { number: 200, suffix: "+", label: "Global Regions", icon: Globe },
              { number: 24, suffix: "/7", label: "Expert Support", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                </div>

                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-3">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>

                <div className="text-gray-400 text-lg font-medium group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-4 relative">
        {/* 3D Background for Features */}
        <div className="absolute inset-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <FeatureScene />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover the cutting-edge capabilities that set us apart from everything else in the market.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <EnhancedFeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Ready to Build the Future?
            </h2>

            <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              Join millions of developers who are already building tomorrow's applications with our revolutionary
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-12">
              <Input
                type="email"
                placeholder="Enter your email to get started"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 rounded-full px-8 py-4 text-lg focus:border-purple-500/50 transition-all duration-300"
              />
              <Button
                size="lg"
                className="relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/25 overflow-hidden min-w-fit"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-base text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>Deploy in 30 seconds</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.div
              className="flex items-center space-x-3 mb-8 md:mb-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50" />
                <div className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Star className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Huly
              </span>
            </motion.div>

            <div className="flex space-x-12 text-lg text-gray-400">
              {["Privacy", "Terms", "Contact", "Docs", "Blog"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-lg">&copy; 2024 Huly. Crafted with ❤️ for the future of development.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
