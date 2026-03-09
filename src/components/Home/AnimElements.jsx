import { motion } from 'framer-motion'

// 元素包装组件 - 处理初始随机位置和归位动画
export const AnimatedElement = ({ children, hasEntered, randomPos, finalPos, delay = 0, className = '' }) => {
  return (
    <motion.div
      className={className}
      style={{
        position: hasEntered ? 'relative' : 'absolute',
        zIndex: hasEntered ? 'auto' : 10,
      }}
      initial={false}
      animate={{
        left: hasEntered ? 'auto' : `${randomPos.x}%`,
        top: hasEntered ? 'auto' : `${randomPos.y}%`,
        x: hasEntered ? 0 : '-50%',
        y: hasEntered ? 0 : '-50%',
        rotate: hasEntered ? 0 : randomPos.rotate,
        opacity: hasEntered ? 1 : 0.3,
        filter: hasEntered ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{
        duration: 1.5,
        delay: hasEntered ? delay : 0,
        type: 'spring',
        stiffness: 50,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  )
}

// 元素包装组件 - 处理随机位置和归位动画
export const ScatteredElement = ({ children, randomPos, delay = 0, hasEntered }) => {
  return (
    <motion.div
      style={{
        position: hasEntered ? 'relative' : 'fixed',
        zIndex: hasEntered ? 'auto' : 10,
      }}
      initial={false}
      animate={{
        left: hasEntered ? 'auto' : `${randomPos.x}vw`,
        top: hasEntered ? 'auto' : `${randomPos.y}vh`,
        x: hasEntered ? 0 : '-50%',
        y: hasEntered ? 0 : '-50%',
        rotate: hasEntered ? 0 : randomPos.rotate,
        opacity: hasEntered ? 1 : 0.6,
        scale: hasEntered ? 1 : 0.8,
      }}
      transition={{
        duration: 1.8,
        delay: hasEntered ? delay : 0,
        type: 'spring',
        stiffness: 60,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  )
}
