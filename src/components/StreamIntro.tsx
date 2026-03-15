'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreamIntroProps {
  onComplete: () => void;
  guestName: string | null;
}

export default function StreamIntro({ onComplete, guestName }: StreamIntroProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'live' | 'exit'>('loading');
  const [dots, setDots] = useState('');

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Progress animation
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(99, Math.floor((elapsed / duration) * 99));
      setProgress(p);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    const timer1 = setTimeout(() => {
      setProgress(100);
    }, 2800);

    const timer2 = setTimeout(() => {
      setPhase('live');
    }, 3200);

    const timer3 = setTimeout(() => {
      setPhase('exit');
    }, 5200);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 5700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          onClick={() => {
            if (phase === 'live') {
              setPhase('exit');
              setTimeout(onComplete, 500);
            }
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, #FE2C55 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, #25F4EE 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {phase === 'loading' ? (
            <div className="flex flex-col items-center gap-8 px-10 w-full max-w-sm">
              {/* TikTok-style logo area */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-6xl mb-2">💒</div>
                <div
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
                  className="text-white text-2xl tracking-widest"
                >
                  THE LOVE STREAM
                </div>
                <div className="text-xs text-gray-400 tracking-[4px] uppercase">
                  Wedding Live 2026
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full shimmer-bar rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Đang kết nối stream{dots}</span>
                  <span className="font-mono text-pink-500">{progress}%</span>
                </div>
              </div>

              {/* Loading hints */}
              <div className="text-center">
                {progress < 30 && (
                  <p className="text-gray-500 text-sm">Đang tải stream{dots}</p>
                )}
                {progress >= 30 && progress < 60 && (
                  <p className="text-gray-500 text-sm">Đang kết nối tới buổi lễ{dots}</p>
                )}
                {progress >= 60 && progress < 90 && (
                  <p className="text-gray-500 text-sm">Đang chuẩn bị hoa cưới{dots}</p>
                )}
                {progress >= 90 && progress < 100 && (
                  <p className="text-yellow-500 text-sm font-semibold">
                    Gần xong rồi! {progress}%{dots}
                  </p>
                )}
                {progress === 100 && (
                  <p className="text-green-400 text-sm font-bold">Kết nối thành công! ✓</p>
                )}
              </div>

              {/* Guest greeting */}
              {guestName && (
                <div className="glass-card px-6 py-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Thiệp mời gửi đến</p>
                  <p className="text-white font-bold text-lg">{guestName}</p>
                  <p className="text-xs text-pink-400">💌 Bạn được mời đặc biệt</p>
                </div>
              )}
            </div>
          ) : (
            // LIVE NOW phase
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex flex-col items-center gap-6 text-center px-8"
            >
              {/* Flash effect */}
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 bg-white pointer-events-none"
              />

              <div className="flex items-center gap-3">
                <div className="live-badge text-base px-4 py-1.5">
                  <div className="live-dot" />
                  LIVE
                </div>
              </div>

              <div
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '4px' }}
                className="text-white leading-none"
              >
                <div className="text-5xl text-glow-red">NOW!</div>
                <div className="text-3xl text-glow-cyan mt-1">STREAMING</div>
              </div>

              <div className="text-3xl">💒💕</div>

              <div className="glass-card px-8 py-4">
                <p className="text-gray-300 text-sm">Đám cưới trực tiếp của</p>
                <p className="text-white font-bold text-xl mt-1">Quang Hào &amp; Hồng Nhung</p>
                <p className="text-pink-400 text-sm mt-1">28.06.2026</p>
              </div>

              <p className="text-gray-400 text-sm animate-pulse">Chạm để vào xem →</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
