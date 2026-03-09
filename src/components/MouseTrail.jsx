import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MouseTrail() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }

      setTrails((prev) => [...prev.slice(-8), newTrail])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTrails((prev) => prev.slice(1))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="absolute w-3 h-3 rounded-full bg-warmOrange/30"
          style={{
            left: trail.x,
            top: trail.y,
            filter: 'blur(2px)',
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
