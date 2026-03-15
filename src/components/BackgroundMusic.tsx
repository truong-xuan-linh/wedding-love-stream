'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';

export interface MusicRef {
  toggle: () => void;
}

const BackgroundMusic = forwardRef<MusicRef>(function BackgroundMusic(_, ref) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sound/sound.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // Xoá listener nếu đã bật thành công
        document.removeEventListener('click', startAudio as unknown as EventListener);
        document.removeEventListener('touchstart', startAudio as unknown as EventListener);
      } catch {
        // vẫn bị block
      }
    };

    // Thử autoplay ngay
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser block autoplay → đăng ký listener, nhạc sẽ bật ngay lần click/touch đầu tiên
      document.addEventListener('click', startAudio as unknown as EventListener, { once: true });
      document.addEventListener('touchstart', startAudio as unknown as EventListener, { once: true, passive: true });
    });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', startAudio as unknown as EventListener);
      document.removeEventListener('touchstart', startAudio as unknown as EventListener);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useImperativeHandle(ref, () => ({ toggle }));

  const handleVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div
      className="fixed z-50 flex flex-col items-center gap-5"
      style={{
        bottom: 160,
        right: 'max(16px, calc((100vw - 480px) / 2 + 16px))',
      }}
    >
      {/* Volume slider (TikTok style - vertical) */}
      {showVolume && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="glass-card p-3 flex flex-col items-center gap-2"
          style={{ borderRadius: 24 }}
        >
          <span className="text-xs text-gray-400">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={e => handleVolume(Number(e.target.value))}
            className="appearance-none"
            style={{
              writingMode: 'vertical-lr' as React.CSSProperties['writingMode'],
              direction: 'rtl',
              width: 4,
              height: 80,
              cursor: 'pointer',
              accentColor: '#FE2C55',
            }}
          />
          <span className="text-xs text-gray-400">🔇</span>
        </motion.div>
      )}

      {/* Music disk button */}
      <div className="right-control-btn">
        <button
          className="relative w-12 h-12 rounded-full overflow-hidden"
          style={{ border: '2px solid rgba(254,44,85,0.6)' }}
          onClick={toggle}
          onContextMenu={e => {
            e.preventDefault();
            setShowVolume(v => !v);
          }}
          title="Nhấn để bật/tắt nhạc | Nhấn chuột phải để chỉnh âm lượng"
        >
          <div className={`w-full h-full ${isPlaying ? 'rotate-disk' : 'rotate-disk paused'}`}>
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
              }}
            >
              <span className="text-2xl">🎵</span>
            </div>
          </div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-white/80" />
          </div>
        </button>
        <span className="text-xs text-gray-400">{isPlaying ? 'nhạc' : 'tắt'}</span>
      </div>
    </div>
  );
});

export default BackgroundMusic;
