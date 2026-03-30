import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useRef } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import MouseTrail from './components/MouseTrail'
import SVGFilters from './components/SVGFilters'
import AudioController from './components/Home/AudioController'

// 非首屏页面懒加载
const About = lazy(() => import('./pages/About'))
const Articles = lazy(() => import('./pages/Articles'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const ImageGeneratorTest = lazy(() => import('./pages/ImageGeneratorTest'))

function AppContent() {
  // 全局音量状态
  const [volume, setVolume] = useState(0.5)
  const [previousVolume, setPreviousVolume] = useState(0.5)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const hideTimeoutRef = useRef(null)

  const handleVolumeControlEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setShowVolumeControl(true)
  }

  const handleVolumeControlLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false)
    }, 1000)
  }

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume)
      setVolume(0)
    } else {
      setVolume(previousVolume > 0 ? previousVolume : 0.5)
    }
  }

  return (
    <>
      <SVGFilters />
      <MouseTrail />
      <div className="min-h-screen">
        <Navigation />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-earthBrown/50 font-handwriting text-xl">加载中...</div>}>
          <Routes>
            <Route path="/" element={<Home volume={volume} setVolume={setVolume} />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/image-test" element={<ImageGeneratorTest />} />
          </Routes>
        </Suspense>
      </div>
      <AudioController
        volume={volume}
        setVolume={setVolume}
        showVolumeControl={showVolumeControl}
        handleVolumeControlEnter={handleVolumeControlEnter}
        handleVolumeControlLeave={handleVolumeControlLeave}
        toggleMute={toggleMute}
      />
    </>
  )
}

function App() {
  return (
    <Router basename="/personal-website">
      <AppContent />
    </Router>
  )
}

export default App
