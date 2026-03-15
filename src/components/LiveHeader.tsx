'use client';

import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LiveHeaderProps {
  viewerCount: number;
  streamTitle: string;
  guestName: string | null;
}

function formatViewers(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function LiveHeader({ viewerCount, streamTitle, guestName }: LiveHeaderProps) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 px-4"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
    >
      <div className="flex items-center gap-2">
        {/* Stream identity */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-pink-500"
              style={{ background: 'linear-gradient(135deg, #FE2C55, #25F4EE)' }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                💒
              </div>
            </div>
          </div>

          {/* Title + Live */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-white font-bold text-sm truncate max-w-[130px]">
                {streamTitle}
              </span>
              <div className="live-badge shrink-0">
                <div className="live-dot" />
                LIVE
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-300">
              <span>👁</span>
              <motion.span
                key={viewerCount}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-mono font-semibold"
              >
                {formatViewers(viewerCount)}
              </motion.span>
              <span>đang xem</span>
            </div>
          </div>
        </div>

        {/* Guest name badge */}
        {guestName && (
          <div className="shrink-0 glass-card px-3 py-1 ">
            <p className="text-xs text-gray-40">Xin chào</p>
            <p className="text-xs font-bold text-pink-400 max-w-[80px] truncate">{guestName}</p>
          </div>
        )}

        {/* Share button */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Đám Cưới Quang Hào & Hồng Nhung',
                url: window.location.href,
              });
            } else {
              navigator.clipboard?.writeText(window.location.href);
            }
          }}
        >
          <Share2 size={16} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
