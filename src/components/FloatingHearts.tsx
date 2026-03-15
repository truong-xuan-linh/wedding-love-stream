'use client';

import { useState, useEffect, useRef } from 'react';

interface Heart {
  id: number;
  x: number;
  bottom: number;
  fontSize: number;
  duration: number;
  delay: number;
  emoji: string;
}

const HEART_EMOJIS = ['❤️', '💕', '💗', '💖', '💘', '💝', '💍', '🌸', '✨'];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const spawn = (clientX: number) => {
      const x = Math.max(20, Math.min(clientX, window.innerWidth - 60));
      const batch: Heart[] = Array.from({ length: 3 }, () => ({
        id: ++counterRef.current,
        x: x + (Math.random() - 0.5) * 40,
        bottom: 90 + Math.random() * 60,
        fontSize: 20 + Math.random() * 16,
        duration: 1.5 + Math.random() * 0.8,
        delay: Math.random() * 0.2,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      }));

      setHearts(prev => [...prev, ...batch]);
      const ids = new Set(batch.map(h => h.id));
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !ids.has(h.id)));
      }, 2500);
    };

    // Lắng nghe ở document level – không chặn bất kỳ button nào
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Bỏ qua nếu click vào element tương tác
      if (
        target.closest(
          'button, input, textarea, a, select, label, [role="button"], [role="link"], [role="menuitem"]'
        )
      )
        return;
      spawn(e.clientX);
    };

    const onDocTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'button, input, textarea, a, select, label, [role="button"], [role="link"]'
        )
      )
        return;
      if (e.touches.length > 0) spawn(e.touches[0].clientX);
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('touchstart', onDocTouch, { passive: true });

    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('touchstart', onDocTouch);
    };
  }, []);

  // Chỉ render hearts – không có overlay chặn click
  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="float-heart select-none"
          style={{
            left: heart.x,
            bottom: heart.bottom,
            fontSize: `${heart.fontSize}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
