import { ShaderAnimation } from './components/ui/shader-animation';
import { ControlsOverlay } from './components/ControlsOverlay';
import { motion } from 'framer-motion';

const bgMusic = '/test_audio.mp3';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

function App() {
  return (
    <div className="relative w-full min-h-screen bg-white text-gray-900 selection:bg-gray-200">
      
      {/* 0. Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <ShaderAnimation />
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center px-6"
        >
          <motion.h1 
            variants={fadeUpSlow}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] font-light"
          >
            aurore.
          </motion.h1>
          <motion.p 
            variants={fadeUp}
            className="mt-8 text-sm md:text-base tracking-[0.3em] uppercase text-white/70 font-medium drop-shadow-md"
          >
            The Sensory Curation
          </motion.p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.5, duration: 1 }}
           className="z-20"
        >
          <ControlsOverlay />
        </motion.div>
      </section>

      {/* 1. Philosophy Section (The Paradigm Shift) */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full py-48 md:py-72 px-6 flex flex-col items-center justify-center text-center bg-white"
      >
        <motion.span variants={fadeUp} className="text-xs text-gray-400 tracking-widest font-semibold uppercase mb-6">Chapter 00. Why Now</motion.span>
        <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-light mb-24 text-black max-w-4xl leading-tight">
          당신의 여백을 채우는 <br className="hidden md:block"/>가장 우아한 파동
        </motion.h2>
        <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-500 leading-loose font-light text-base md:text-lg">
          우리는 고정된 배경음악 시대를 넘어, 당신의 공간이 스스로 호흡하게 만듭니다.<br/>
          단순한 시청을 넘어선 'Spatial Styling'. 유저가 자신의 공간 무드를 <br className="hidden md:block"/>
          음악과 빛으로 직접 조율하는 스크린 큐레이션을 경험하세요.
        </motion.p>
      </motion.section>

      {/* 2. The Origin Story & Paradigm Shift (3-Col) */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full py-48 md:py-72 px-8 bg-gray-50 border-y border-gray-100 flex flex-col items-center"
      >
        <motion.span variants={fadeUp} className="text-xs text-gray-400 tracking-widest font-semibold uppercase mb-6">Chapter 01. The Brand</motion.span>
        <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-5xl font-light mb-40 text-center text-black">A New Visual Language</motion.h3>
        
        <motion.div variants={staggerContainer} className="grid-3-col w-full max-w-6xl text-center">
          <motion.div variants={fadeUp} className="flex flex-col items-center group">
            <h4 className="font-serif italic text-2xl text-black mb-12">Spatial Styling</h4>
            <p className="text-gray-500 text-sm leading-relaxed px-4 font-light">
              몰입이 아닌 연출. 유저가 자기 공간의 무드를 음악과 빛으로 직접 설계합니다. 방 한구석의 디지털 스크린이 인테리어의 마지막 레이어로 작동합니다.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center group">
            <h4 className="font-serif italic text-2xl text-black mb-12">Prism Aurora</h4>
            <p className="text-gray-500 text-sm leading-relaxed px-4 font-light">
              기계적으로 상하운동을 반복하던 EQ의 시대는 끝났습니다. 음원의 주파수와 리듬을 매끄러운 프리즘 컬러의 유체 파동으로 번역합니다.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center group">
            <h4 className="font-serif italic text-2xl text-black mb-12">Weather Sync</h4>
            <p className="text-gray-500 text-sm leading-relaxed px-4 font-light">
              유저 접속 지역의 실시간 날씨 데이터와 연동하여 최적의 오디오와 시각 파동을 제안(Nudge)합니다. 당신의 창밖의 풍경 위에 무드를 덧칠합니다.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 3. Naming Strategy */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full py-48 md:py-72 px-6 flex flex-col items-center text-center bg-white"
      >
        <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-5xl font-light mb-32 text-black">Naming System</motion.h3>
        <motion.div variants={staggerContainer} className="flex flex-col md:flex-row gap-12 lg:gap-24 max-w-5xl items-baseline justify-center">
          <motion.div variants={fadeUp} className="text-center">
            <h4 className="text-3xl font-serif text-black mb-4 tracking-tight">aurore.</h4>
            <p className="text-xs text-gray-400 font-light uppercase tracking-widest mb-4">빛의 새벽, 프리즘 오로라</p>
            <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed">로고의 o에서 번져나가는 모션 아이덴티티와 이름이 분리불가능하게 결합됩니다. 마침표(.)가 절대적 시그니처입니다.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            <h4 className="text-3xl font-serif text-black mb-4 tracking-tight">amid x</h4>
            <p className="text-xs text-gray-400 font-light uppercase tracking-widest mb-4">확장형 콜라보 시스템</p>
            <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed">B2B 호텔 라이선스(amid x Shilla)나 시간대(amid x 3am) 등 무한 확장 가능한 프레임워크입니다.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            <h4 className="text-3xl font-serif text-black mb-4 tracking-tight">nuance.</h4>
            <p className="text-xs text-gray-400 font-light uppercase tracking-widest mb-4">미세한 차이 큐레이션</p>
            <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed">공간의 미세한 온도와 무드의 차이를 조율한다는 철학이 담긴 대중적 네이밍 후보입니다.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 4. Experience Scenarios (3-Col) */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full py-48 md:py-72 px-8 bg-gray-900 border-y border-gray-800 flex flex-col items-center text-white"
      >
        <motion.span variants={fadeUp} className="text-xs text-white/50 tracking-widest font-semibold uppercase mb-6">Chapter 02. Scenarios</motion.span>
        <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-5xl font-light mb-40 text-center text-white">Where Senses Meet</motion.h3>
        
        <motion.div variants={staggerContainer} className="grid-3-col w-full max-w-6xl text-center">
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8">
              <span className="text-white font-serif italic text-lg">L</span>
            </div>
            <h4 className="text-xl font-medium text-white tracking-widest mb-8 uppercase">Living Room</h4>
            <p className="text-white/60 text-sm leading-relaxed px-4 font-light">
              TV as Decor. 벽걸이 TV에 프리즘 레이어를 띄우기만 해도 방 안이 갤러리로 변모합니다. 누구나 손쉽게 공간 오너십을 갖습니다.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8">
              <span className="text-white font-serif italic text-lg">M</span>
            </div>
            <h4 className="text-xl font-medium text-white tracking-widest mb-8 uppercase">Mobility</h4>
            <p className="text-white/60 text-sm leading-relaxed px-4 font-light">
              Private Lounge. 차량 인포테인먼트 스크린의 프리즘 파동이 실내 앰비언트 라이트와 연동되어 음악에 맞춰 드라이브 무드를 전환합니다.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8">
              <span className="text-white font-serif italic text-lg">P</span>
            </div>
            <h4 className="text-xl font-medium text-white tracking-widest mb-8 uppercase">Personal</h4>
            <p className="text-white/60 text-sm leading-relaxed px-4 font-light">
              Pocket Mood. 모바일 화면의 파동이 어두운 방에서 가장 섬세한 미세 조명 역할을 수행합니다. 터치 하나로 나만의 비밀 공간을 엽니다.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 5. Business & Roadmap (3-Col) */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full py-48 md:py-72 px-8 bg-white flex flex-col items-center"
      >
        <motion.span variants={fadeUp} className="text-xs text-gray-400 tracking-widest font-semibold uppercase mb-6">Chapter 03. Growth</motion.span>
        <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-5xl font-light mb-40 text-center text-black">Actionable Roadmap</motion.h3>
        
        <motion.div variants={staggerContainer} className="grid-3-col w-full max-w-6xl text-center">
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <h4 className="font-serif italic text-xl text-black mb-8">Phase 1. Digital UX</h4>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-12">Software First (Bugs)</p>
            <p className="text-gray-500 text-sm leading-relaxed px-4 font-light">
              벅스 앱 환경 내에서 로고 중심의 프리즘 파동 시각화 및 영상 배경을 완벽하게 오버레이하여 유저 체류 시간을 압도적으로 연장합니다.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <h4 className="font-serif italic text-xl text-black mb-8">Phase 2. Spatial OS</h4>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-12">PoC Test (Offline)</p>
            <p className="text-gray-500 text-sm leading-relaxed px-4 font-light">
              인지도를 바탕으로 5성급 호텔 라운지와 로컬 핵심 브랜드(힙 플레이스 등)에 공간 제어 시스템 세일즈 파이프라인을 전개합니다.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <h4 className="font-serif italic text-xl text-black mb-8">Phase 3. Zero Friction</h4>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-12">Scale & Sell</p>
            <p className="text-gray-500 text-sm leading-relaxed px-4 font-light">
              추가 공사 없이 'Zero CAPEX' URL 송출만으로 스크린 무드를 점유하는 엔터프라이즈 라이선스 사업과 Space Drop 바이럴 루프를 가동합니다.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 6. Footer */}
      <footer className="w-full py-32 px-6 flex flex-col items-center justify-center border-t border-gray-100 bg-gray-50">
        <h2 className="font-serif text-3xl font-light text-black tracking-tighter mb-8">aurore.</h2>
        <div className="flex gap-8 mb-12 text-sm text-gray-400 font-light">
          <span className="hover:text-black hover:underline cursor-pointer italic transition-colors">The Origin</span>
          <span className="hover:text-black hover:underline cursor-pointer italic transition-colors">Living Canvas</span>
          <span className="hover:text-black hover:underline cursor-pointer italic transition-colors">Space Drop</span>
        </div>
        <p className="text-xs text-gray-300 font-light">© 2026 Sensory Curation. Designed with Absolute Minimalism.</p>
      </footer>

      {/* Hidden Audio Element */}
      <audio id="audio-player" src={bgMusic} crossOrigin="anonymous" loop />
    </div>
  )
}

export default App
