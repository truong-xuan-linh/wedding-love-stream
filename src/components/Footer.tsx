'use client';

import { motion } from 'framer-motion';
import { weddingData } from '@/lib/weddingData';

export default function Footer() {
  return (
    <footer className="px-4 pt-16 pb-32 max-w-lg mx-auto">
      <div className="tiktok-divider" />

      {/* Wedding closing message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="text-5xl mb-4">💒</div>
        <h2
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}
          className="text-white text-3xl mb-3"
        >
          Cảm Ơn Bạn!
        </h2>
        <p
          className="text-gray-400 text-sm leading-relaxed"
          style={{ textAlign: 'center', maxWidth: '20rem', margin: '0 auto' }}
        >
          Sự hiện diện và lời chúc của bạn là món quà quý giá nhất với chúng mình.
          Hẹn gặp bạn tại buổi tiệc! 🥂
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-gray-500 text-sm">{weddingData.wedding.hashtag}</span>
        </div>
      </motion.div>

      {/* Couple final names */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '4px', lineHeight: 1 }}
          className="text-5xl"
        >
          <span className="text-glow-red text-white">QUANG HÀO</span>
          <br />
          <span className="text-gray-500 text-2xl">&amp;</span>
          <br />
          <span className="text-glow-cyan text-white">HỒNG NHUNG</span>
        </div>
        <div className="text-pink-400 text-sm mt-2">{weddingData.wedding.dateDisplay}</div>
      </motion.div>

      {/* L'amour Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 text-center"
        style={{ border: '1px solid rgba(254,44,85,0.2)' }}
      >
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Được tạo bởi</div>

        <a
          href="https://www.lamour.com.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group"
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '4px',
              fontSize: '28px',
            }}
            className="text-white group-hover:text-pink-400 transition-colors"
          >
            L&apos;AMOUR
          </div>
          <div className="text-gray-400 text-xs">
            Thiệp cưới online · Wedding Invitation
          </div>
        </a>

        <div className="flex justify-center gap-6 mt-5">
          <a
            href="https://www.tiktok.com/@lamourlink"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              🎵
            </div>
            <span className="text-xs">TikTok</span>
          </a>
          <a
            href="https://www.instagram.com/lamourlink/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              📸
            </div>
            <span className="text-xs">Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61579532994773"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              👥
            </div>
            <span className="text-xs">Facebook</span>
          </a>
        </div>

        <div className="tiktok-divider mt-5" style={{ margin: '20px 0 16px' }} />
        <p className="text-gray-600 text-xs">
          © 2026 L&apos;amour · Tạo thiệp cưới online đẹp, hiện đại
        </p>
      </motion.div>
    </footer>
  );
}
