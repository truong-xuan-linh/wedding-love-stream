'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '@/lib/weddingData';

interface StreamIntroProps {
  onComplete: () => void;
  guestName: string | null;
}

type Phase = 'sealed' | 'flipping' | 'revealed' | 'exit';

const PETALS = [
  { left: '8%',  top: '12%', emoji: '🌸', delay: 0 },
  { left: '22%', top: '72%', emoji: '🌺', delay: 0.6 },
  { left: '38%', top: '6%',  emoji: '💮', delay: 1.2 },
  { left: '55%', top: '85%', emoji: '🌷', delay: 0.3 },
  { left: '70%', top: '18%', emoji: '🌸', delay: 0.9 },
  { left: '85%', top: '60%', emoji: '🌺', delay: 1.5 },
  { left: '14%', top: '46%', emoji: '🌷', delay: 1.8 },
  { left: '92%', top: '35%', emoji: '💮', delay: 0.5 },
];

const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  background: 'linear-gradient(145deg, #fdf8f0 0%, #f7e8cc 55%, #f0d9b0 100%)',
  borderRadius: '16px',
  border: '1.5px solid rgba(212,175,55,0.45)',
  boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.7)',
};

export default function StreamIntro({ onComplete, guestName }: StreamIntroProps) {
  const [phase, setPhase] = useState<Phase>('sealed');
  const [flipDone, setFlipDone] = useState(false);
  const displayName = guestName || 'Bạn';

  const handleOpen = () => {
    if (phase !== 'sealed') return;
    setPhase('flipping');
    setTimeout(() => setPhase('revealed'), 900);
  };

  const handleEnter = () => {
    setPhase('exit');
    setTimeout(onComplete, 700);
  };

  const { groom, bride, wedding } = weddingData;

  /** Nội dung mặt sau thiệp — dùng lại cho cả 3D back-face lẫn plain div */
  const BackContent = (
    <>
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '10px',
        border: '1px solid rgba(180,140,30,0.3)',
        borderRadius: '10px', pointerEvents: 'none',
      }} />

      <div className="text-3xl mt-1">💒</div>

      <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#A07830', fontFamily: 'var(--font-body)' }}>
        THIỆP CƯỚI
      </p>

      <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      <div style={{ textAlign: 'center', lineHeight: 1.65 }}>
        <p style={{ fontSize: '12px', color: '#7A5828' }}>Trân trọng kính mời</p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: displayName.length > 14 ? '17px' : '20px',
          color: '#4A2C00',
          marginTop: '4px',
        }}>
          {displayName}
        </p>
        <p style={{ fontSize: '12px', color: '#7A5828', marginTop: '4px' }}>
          tham dự lễ thành hôn của
        </p>
      </div>

      <div style={{ textAlign: 'center', lineHeight: 1.3 }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#4A2C00', letterSpacing: '1px' }}>
          {groom.name}
        </p>
        <p style={{ fontSize: '13px', color: '#B8860B', margin: '2px 0' }}>&amp;</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#4A2C00', letterSpacing: '1px' }}>
          {bride.name}
        </p>
      </div>

      <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#7A5828', lineHeight: 2 }}>
        <p>📅 {wedding.dayOfWeek}, {wedding.dateDisplay}</p>
        <p>⛪ {wedding.venue.ceremony.name} • {wedding.venue.ceremony.time}</p>
        <p>🏛️ {wedding.venue.reception.name} • {wedding.venue.reception.time}</p>
      </div>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={handleEnter}
        style={{
          marginTop: '6px',
          background: 'linear-gradient(135deg, #C8941A, #D4AF37, #C8941A)',
          color: 'white',
          border: 'none',
          borderRadius: '24px',
          padding: '10px 28px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 18px rgba(200,148,26,0.45)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Vào xem ngay ✨
      </motion.button>
    </>
  );

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="invite-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
          style={{
            background: 'radial-gradient(ellipse at 40% 30%, #1e0c08 0%, #0e0808 55%, #050303 100%)',
          }}
        >
          {/* Floating petals */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {PETALS.map((p, i) => (
              <motion.div
                key={i}
                className="absolute text-xl select-none"
                style={{ left: p.left, top: p.top }}
                animate={{ y: [0, -18, 0], opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
              >
                {p.emoji}
              </motion.div>
            ))}
          </div>

          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '15%', left: '50%', transform: 'translateX(-50%)',
              width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Card area */}
          <div style={{ width: '100%', maxWidth: '300px' }}>

            {/* ── Sau khi flip xong: plain div, KHÔNG có bất kỳ 3D transform nào ── */}
            {flipDone ? (
              <div
                style={{
                  ...CARD_STYLE,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '28px 24px',
                  gap: '10px',
                  color: '#5C3A00',
                  position: 'relative',
                }}
              >
                {BackContent}
              </div>
            ) : (
              /* ── Trong khi sealed / flipping: 3D flip card ── */
              <div style={{ perspective: '1100px', width: '100%' }}>
                <motion.div
                  animate={{
                    rotateY: phase === 'flipping' || phase === 'revealed' ? 180 : 0,
                  }}
                  transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                  onAnimationComplete={() => {
                    if (phase === 'revealed') setFlipDone(true);
                  }}
                  style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '460px' }}
                >
                  {/* FRONT */}
                  <div
                    onClick={handleOpen}
                    style={{
                      ...CARD_STYLE,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      position: 'absolute',
                      inset: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '14px',
                      padding: '32px 28px',
                      userSelect: 'none',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: '10px',
                      border: '1px solid rgba(180,140,30,0.3)',
                      borderRadius: '10px', pointerEvents: 'none',
                    }} />
                    {(['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'] as const).map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute ${pos} text-base`}
                        style={{
                          color: '#B8860B', opacity: 0.5,
                          transform: [undefined, 'scaleX(-1)', 'scaleY(-1)', 'scale(-1,-1)'][i] ?? undefined,
                        }}
                      >✦</div>
                    ))}
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-5xl"
                    >💌</motion.div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '3.5px', color: '#A07830', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
                        TRÂN TRỌNG KÍNH MỜI
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: displayName.length > 14 ? '20px' : '26px',
                        color: '#5C3A00',
                        letterSpacing: '0.5px',
                        lineHeight: 1.25,
                      }}>
                        {displayName}
                      </p>
                    </div>
                    <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#8B6020', lineHeight: 1.7 }}>Nhân dịp lễ thành hôn của</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#7A5010', letterSpacing: '1px', marginTop: '2px' }}>
                        {groom.nickname} &amp; {bride.nickname}
                      </p>
                    </div>
                    <motion.p
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ fontSize: '11px', color: '#A07830', letterSpacing: '2px', marginTop: '4px' }}
                    >— Chạm để mở thiệp —</motion.p>
                  </div>

                  {/* BACK (trong 3D container, chỉ dùng khi đang flip) */}
                  <div
                    style={{
                      ...CARD_STYLE,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '28px 24px',
                      gap: '10px',
                      color: '#5C3A00',
                    }}
                  >
                    {BackContent}
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Hashtag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: '24px', fontSize: '11px', color: '#A07830', letterSpacing: '2px' }}
          >
            {wedding.hashtag}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
