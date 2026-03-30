import { useEffect, useRef, useCallback } from 'react'

export default function MouseTrail() {
  const canvasRef = useRef(null)
  const trailsRef = useRef([])
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, moved: false })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const now = Date.now()

    // 添加新的 trail 点（如果鼠标移动了）
    if (mouseRef.current.moved) {
      trailsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        born: now,
      })
      mouseRef.current.moved = false
    }

    // 清除过期的点（800ms 生命周期）
    trailsRef.current = trailsRef.current.filter(t => now - t.born < 800)

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制每个 trail 点
    for (const trail of trailsRef.current) {
      const age = (now - trail.born) / 800 // 0 → 1
      const opacity = 0.6 * (1 - age)
      const radius = 6 * (1 - age)
      if (opacity <= 0 || radius <= 0) continue

      ctx.beginPath()
      ctx.arc(trail.x, trail.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 155, 113, ${opacity})`
      ctx.fill()
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.moved = true
    }
    window.addEventListener('mousemove', handleMouseMove)

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
