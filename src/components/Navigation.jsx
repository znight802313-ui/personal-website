import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function Navigation({ hasEntered = true, onNavigate }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const navItems = [
    { path: '/', label: '初见', icon: '🏠' },
    { path: '/about', label: '灵魂解剖', icon: '✨' },
    { path: '/articles', label: '思想档案', icon: '📮' },
    { path: '/portfolio', label: '宇宙陈列', icon: '🎨' },
  ]

  // 为每个导航项生成随机位置
  const randomPositions = useMemo(() =>
    navItems.map(() => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      rotate: Math.random() * 60 - 30
    }))
  , [])

  // 如果是首页且未入场，显示随机分布的导航项
  if (isHomePage && !hasEntered) {
    return (
      <>
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            className="fixed z-40"
            style={{
              left: `${randomPositions[index].x}vw`,
              top: `${randomPositions[index].y}vh`,
              x: '-50%',
              y: '-50%',
            }}
            initial={false}
            animate={{
              rotate: randomPositions[index].rotate,
              opacity: 0.6,
              scale: 0.8,
            }}
          >
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/40 pointer-events-none">
              <div className="flex items-center gap-2 font-handwriting text-lg text-earthBrown/90">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </>
    )
  }

  // 正常状态的导航栏
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
        style={{ filter: 'url(#rough)' }}
      >
        <ul className="flex gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={onNavigate}>
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-handwriting text-lg ${
                    location.pathname === item.path
                      ? 'bg-warmOrange text-white'
                      : 'text-earthBrown hover:bg-sageGreen/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  )
}
