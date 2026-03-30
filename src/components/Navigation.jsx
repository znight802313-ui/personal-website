import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '初见', icon: '🏠' },
    { path: '/about', label: '我的档案', icon: '✨' },
    { path: '/articles', label: '漫游手记', icon: '📮' },
    { path: '/portfolio', label: '宇宙陈列', icon: '🎨' },
  ]

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
              <Link to={item.path}>
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
