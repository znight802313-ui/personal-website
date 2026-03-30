import { motion } from 'framer-motion'

export default function PolaroidFrame({
  imageHovered,
  setImageHovered,
  showVideo,
  setShowVideo,
  videoRef,
  profilePhoto,
  profileVideo
}) {
  return (
    <motion.div
        className="flex justify-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
      <motion.div
        className="polaroid-frame relative bg-white p-4 shadow-2xl"
        onHoverStart={() => setImageHovered(true)}
        onHoverEnd={() => setImageHovered(false)}
        onClick={() => setShowVideo(!showVideo)}
        whileHover={{
          y: -20,
          rotate: 5,
          scale: 1.08,
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          filter: 'url(#rough)',
          willChange: 'transform',
          cursor: 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M16,28 Q8,20 6,14 Q4,8 8,6 Q12,4 16,10 Q20,4 24,6 Q28,8 26,14 Q24,20 16,28 Z\' fill=\'%23E76F51\' opacity=\'0.85\' stroke=\'%23F4A261\' stroke-width=\'1.5\'/%3E%3C/svg%3E") 16 16, pointer',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(244, 162, 97, 0.2)',
        }}
      >
        {/* 光晕层 - 用 opacity 替代 boxShadow 动画 */}
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(244, 162, 97, 0.4)' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* 拍立得相框背景 */}
        <div className="w-80 h-96 relative overflow-hidden rounded-sm">
          {!showVideo ? (
            <img
              src={profilePhoto}
              alt="个人照片"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={profileVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        </div>

        {/* 拍立得底部文字 - 放在白色相框区域 */}
        <div className="mt-3 text-center">
          <p className="font-handwriting text-earthBrown text-lg">
            黎碎 · 2026
          </p>
        </div>

        {/* 手绘胶带装饰 */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-warmOrange/30 rotate-3"
          style={{ filter: 'url(#rough)', willChange: 'transform' }}
          animate={{ rotate: imageHovered ? -3 : 3 }}
        />

        {/* 悬停时的星星装饰 */}
        {imageHovered && (
          <>
            {[...Array(9)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${10 + (i % 3) * 35}%`,
                  top: `${5 + Math.floor(i / 3) * 30}%`,
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 20px rgba(244, 162, 97, 0.6))',
                }}
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1.2],
                  rotate: [0, 360, 720],
                  opacity: [0, 1, 0.9]
                }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.span>
            ))}
            {/* 中心爆发的光芒 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="w-64 h-64 rounded-full bg-gradient-radial from-warmOrange/40 via-sageGreen/20 to-transparent blur-3xl" />
            </motion.div>
            {/* 环绕光环 */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 rounded-sm"
                style={{
                  border: '2px solid rgba(244, 162, 97, 0.3)',
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.2 + i * 0.1],
                  opacity: [0.6, 0, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
