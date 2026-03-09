export default function SVGFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* 粗糙纸张纹理滤镜 */}
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>

        {/* 手绘彩色铅笔滤镜 */}
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          <feGaussianBlur stdDeviation="0.3" />
        </filter>

        {/* 马克笔滤镜 */}
        <filter id="marker">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>

        {/* 水彩纹理滤镜 */}
        <filter id="watercolor">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" />
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>
    </svg>
  )
}
