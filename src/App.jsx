import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Articles from './pages/Articles'
import Portfolio from './pages/Portfolio'
import ImageGeneratorTest from './pages/ImageGeneratorTest'
import MouseTrail from './components/MouseTrail'
import SVGFilters from './components/SVGFilters'

function AppContent() {
  const location = useLocation()
  const [hasEnteredHome, setHasEnteredHome] = useState(() => {
    // 从 sessionStorage 读取状态
    return sessionStorage.getItem('hasEnteredHome') === 'true'
  })

  // 当路径变化时，如果不是首页，标记为已入场
  useEffect(() => {
    if (location.pathname !== '/') {
      setHasEnteredHome(true)
      sessionStorage.setItem('hasEnteredHome', 'true')
    }
  }, [location.pathname])

  const handleHomeEntered = () => {
    setHasEnteredHome(true)
    sessionStorage.setItem('hasEnteredHome', 'true')
  }

  const handleNavigate = () => {
    // 导航时确保标记为已入场
    if (!hasEnteredHome) {
      setHasEnteredHome(true)
      sessionStorage.setItem('hasEnteredHome', 'true')
    }
  }

  return (
    <>
      <SVGFilters />
      <MouseTrail />
      <div className="min-h-screen">
        <Navigation
          hasEntered={location.pathname !== '/' || hasEnteredHome}
          onNavigate={handleNavigate}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                hasEnteredFromParent={hasEnteredHome}
                onEnter={handleHomeEntered}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/image-test" element={<ImageGeneratorTest />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
