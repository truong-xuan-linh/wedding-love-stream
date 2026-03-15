'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { weddingData } from '@/lib/weddingData';

export default function HeroSection() {
  const { bride, groom, wedding } = weddingData;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/1.webp"
          alt="Wedding hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md mx-auto">
        {/* Streaming tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="live-badge text-sm px-4 py-1">
            <div className="live-dot" />
            LIVE NOW
          </div>
          <span className="text-gray-300 text-sm">{wedding.hashtag}</span>
        </motion.div>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px', lineHeight: 1 }}
            className="text-white"
          >
            <div className="text-5xl md:text-7xl text-glow-red">{groom.name}</div>
            <div className="text-3xl text-gray-300 my-2">&amp;</div>
            <div className="text-5xl md:text-7xl text-glow-cyan">{bride.name}</div>
          </div>
        </motion.div>

        {/* Wedding date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="glass-card px-8 py-4 flex flex-col items-center gap-1"
        >
          <p className="text-gray-400 text-xs tracking-widest uppercase">Ngày Cưới</p>
          <p className="text-white font-bold text-2xl">{wedding.dateDisplay}</p>
          <p className="text-pink-400 text-sm">{wedding.dayOfWeek}</p>
        </motion.div>

        {/* TikTok handles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2 glass-card px-3 py-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-pink-500">
              <Image
                src={groom.photo}
                alt={groom.name}
                width={28}
                height={28}
                className="object-cover"
              />
            </div>
            <span className="text-xs text-gray-300">{groom.tiktok}</span>
          </div>
          <div className="flex items-center gap-2 glass-card px-3 py-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400">
              <Image
                src={bride.photo}
                alt={bride.name}
                width={28}
                height={28}
                className="object-cover"
              />
            </div>
            <span className="text-xs text-gray-300">{bride.tiktok}</span>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gray-400 text-xs flex flex-col items-center gap-1 mt-4"
        >
          <span>Kéo xuống để xem thêm</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </div>
    </section>
  );
}
