'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { weddingData } from '@/lib/weddingData';

function ProfileCard({
  person,
  color,
  delay,
}: {
  person: typeof weddingData.bride;
  color: 'pink' | 'cyan';
  delay: number;
}) {
  const borderColor = color === 'pink' ? '#FE2C55' : '#25F4EE';
  const textColor = color === 'pink' ? 'text-pink-400' : 'text-cyan-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring' }}
      className="glass-card p-5 flex flex-col items-center gap-4 text-center"
    >
      {/* Avatar with TikTok border */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full overflow-hidden"
          style={{
            border: `3px solid ${borderColor}`,
            boxShadow: `0 0 20px ${borderColor}40`,
          }}
        >
          <Image
            src={person.photo}
            alt={person.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full px-2 py-0.5 border"
          style={{ borderColor, fontSize: '10px', color: 'white' }}
        >
          ✓
        </div>
      </div>

      {/* Name */}
      <div>
        <div
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
          className={`text-2xl ${textColor}`}
        >
          {person.name}
        </div>
        <div className="text-gray-400 text-xs mt-0.5">{person.fullName}</div>
        <div className="text-gray-500 text-xs">{person.tiktok}</div>
      </div>

      {/* Followers */}
      <div className="flex gap-6">
        <div className="text-center">
          <div className={`font-bold text-lg ${textColor}`}>{person.followers}</div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-lg text-white">1</div>
          <div className="text-xs text-gray-500">Đám cưới</div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-400 text-sm leading-relaxed">{person.bio}</p>

      {/* Follow button */}
      <button
        className="btn-live w-full text-sm py-2"
        style={{
          background:
            color === 'pink'
              ? 'linear-gradient(135deg, #FE2C55, #FF6B8A)'
              : 'linear-gradient(135deg, #25F4EE, #00C9C8)',
          color: color === 'cyan' ? '#000' : '#fff',
        }}
      >
        💕 Gửi lời chúc
      </button>
    </motion.div>
  );
}

export default function CoupleProfile() {
  return (
    <section className="px-4 py-16 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="live-badge mx-auto mb-3 text-xs">GIỚI THIỆU</div>
        <h2
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}
          className="text-white text-3xl"
        >
          Cô Dâu &amp; Chú Rể
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <ProfileCard person={weddingData.groom} color="pink" delay={0.1} />
        <ProfileCard person={weddingData.bride} color="cyan" delay={0.2} />
      </div>
    </section>
  );
}
