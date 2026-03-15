'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, X } from 'lucide-react';
import { weddingData } from '@/lib/weddingData';

interface Wish {
  id: string;
  name: string;
  message: string;
  emoji: string;
}

// Thêm displayId để mỗi lần hiển thị có key riêng (kể cả lặp lại)
interface DisplayWish extends Wish {
  displayId: string;
}

export default function GuestbookDonation() {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [visibleWishes, setVisibleWishes] = useState<DisplayWish[]>([]);

  // Queue lời chúc – dùng ref để callback luôn đọc được version mới nhất
  const wishQueueRef = useRef<Wish[]>([...weddingData.initialWishes]);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showNext = useCallback(() => {
    const queue = wishQueueRef.current;
    if (queue.length === 0) return;

    // Xoay vòng: index % length
    const wish = queue[indexRef.current % queue.length];
    indexRef.current++;

    // displayId độc nhất mỗi lần hiển thị
    const displayId = `${wish.id}-${Date.now()}-${indexRef.current}`;
    const displayWish: DisplayWish = { ...wish, displayId };

    setVisibleWishes(prev => {
      const next = [...prev, displayWish];
      return next.slice(-3); // tối đa 3 lời chúc hiển thị cùng lúc
    });

    // Xoá sau 5.5s
    setTimeout(() => {
      setVisibleWishes(prev => prev.filter(w => w.displayId !== displayId));
    }, 5500);
  }, []);

  // Bắt đầu vòng lặp vô tận
  useEffect(() => {
    // Hiện lời chúc đầu sau 1.5s
    const t1 = setTimeout(() => {
      showNext();
      // Sau đó cứ mỗi 3.2s hiện thêm 1 lời chúc mới
      intervalRef.current = setInterval(showNext, 3200);
    }, 1500);

    return () => {
      clearTimeout(t1);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showNext]);

  const handleSend = async () => {
    if (!name.trim() || !message.trim()) return;
    setSending(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (res.ok) {
        const wish: Wish = await res.json();

        // Thêm vào queue để lời chúc mới cũng được lặp vòng
        wishQueueRef.current = [...wishQueueRef.current, wish];

        // Hiện ngay lập tức
        const displayId = `${wish.id}-now`;
        setVisibleWishes(prev => [...prev, { ...wish, displayId }].slice(-3));
        setTimeout(() => {
          setVisibleWishes(prev => prev.filter(w => w.displayId !== displayId));
        }, 7000);

        setName('');
        setMessage('');
        setShowInput(false);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── Floating wish notifications (góc dưới trái, như TikTok Live donation) ── */}
      <div
        className="fixed z-40 flex flex-col-reverse gap-2"
        style={{
          bottom: 80,
          left: 'max(12px, calc((100vw - 480px) / 2 + 12px))',
          maxWidth: 'min(65vw, 280px)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleWishes.map(wish => (
            <motion.div
              key={wish.displayId}
              initial={{ x: -240, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -240, opacity: 0, transition: { duration: 0.35 } }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="donation-toast"
            >
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0 leading-none mt-0.5">{wish.emoji}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-pink-400 truncate leading-tight">
                    {wish.name}
                  </div>
                  <div className="text-xs text-gray-300 line-clamp-2 leading-snug mt-0.5">
                    {wish.message}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Bottom bar (như thanh comment TikTok Live) ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 px-4"
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)',
          paddingTop: 16,
        }}
      >
        {/* Input panel (trượt lên) */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-card p-5 mb-3 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-bold">💌 Gửi lời chúc</span>
                <button onClick={() => setShowInput(false)}>
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
              <input
                className="tiktok-input w-full"
                placeholder="Tên của bạn..."
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={30}
              />
              <textarea
                className="tiktok-input w-full resize-none"
                style={{ borderRadius: 12 }}
                placeholder="Lời chúc của bạn... 💕"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <button
                className="btn-live w-full flex items-center justify-center gap-2"
                onClick={handleSend}
                disabled={sending || !name.trim() || !message.trim()}
                style={{ opacity: !name.trim() || !message.trim() ? 0.5 : 1 }}
              >
                {sending ? <span className="animate-spin">⏳</span> : <Send size={16} />}
                {sending ? 'Đang gửi...' : 'Gửi lời chúc 💕'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comment input bar */}
        <div className="flex items-center gap-3">
          <button
            className="flex-1 tiktok-input flex items-center gap-2 text-left cursor-pointer"
            onClick={() => setShowInput(true)}
          >
            <MessageCircle size={16} className="text-gray-400 shrink-0" />
            <span className="text-gray-400 text-sm truncate">Để lại lời chúc...</span>
          </button>

          <button
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FE2C55, #FF6B8A)',
              boxShadow: '0 0 20px rgba(254,44,85,0.5)',
            }}
            onClick={() => setShowInput(true)}
          >
            <span className="text-white text-lg leading-none">💌</span>
          </button>
        </div>
      </div>
    </>
  );
}
