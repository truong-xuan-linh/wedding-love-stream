'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '@/lib/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        key={display}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flip-card"
        style={{ perspective: 400 }}
      >
        <span
          className="text-3xl font-bold text-white font-mono"
          style={{
            textShadow: '0 0 20px rgba(254,44,85,0.8)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '2px',
          }}
        >
          {display}
        </span>
      </motion.div>
      <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date(
      weddingData.wedding.date + 'T' + weddingData.wedding.time + ':00+07:00'
    );

    const calculate = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-16 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        {/* Header */}
        <div className="live-badge mx-auto mb-3 text-xs">COUNTDOWN</div>
        <h2
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}
          className="text-white text-3xl mb-2"
        >
          {isExpired ? '🎉 ĐÃ ĐẾN RỒI!' : 'Stream Bắt Đầu Trong'}
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          {isExpired
            ? 'Chúc mừng cô dâu chú rể! 💒'
            : `${weddingData.wedding.dayOfWeek}, ${weddingData.wedding.dateDisplay} • ${weddingData.wedding.time}`}
        </p>

        {/* Countdown display - TikTok Live style */}
        <div className="glass-card p-5 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(circle at center, #FE2C55 0%, transparent 70%)',
            }}
          />

          {/* Live indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Đang đếm ngược đến buổi Live</span>
            </div>
          </div>

          {isExpired ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl text-center"
            >
              🎊💒🎊
            </motion.div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <FlipUnit value={timeLeft.days} label="Ngày" />
              <div className="text-pink-500 text-2xl font-bold pb-6">:</div>
              <FlipUnit value={timeLeft.hours} label="Giờ" />
              <div className="text-pink-500 text-2xl font-bold pb-6">:</div>
              <FlipUnit value={timeLeft.minutes} label="Phút" />
              <div className="text-pink-500 text-2xl font-bold pb-6">:</div>
              <FlipUnit value={timeLeft.seconds} label="Giây" />
            </div>
          )}

          {/* Bottom note */}
          <p className="text-gray-500 text-xs text-center mt-6">
            💒 {weddingData.wedding.venue.ceremony.name} →{' '}
            {weddingData.wedding.venue.reception.name}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
