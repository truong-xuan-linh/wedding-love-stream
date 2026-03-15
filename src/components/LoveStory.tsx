'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { weddingData } from '@/lib/weddingData';

export default function LoveStory() {
  const { loveStory } = weddingData;

  return (
    <section className="px-4 py-16 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="live-badge mx-auto mb-3 text-xs">OUR STORY</div>
        <h2
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}
          className="text-white text-3xl"
        >
          Hành Trình Yêu
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Từ ánh mắt đầu tiên đến ngày trọng đại 💕
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-3 bottom-3 w-0.5"
          style={{ background: 'linear-gradient(to bottom, #FE2C55, #25F4EE)' }}
        />

        <div className="flex flex-col gap-8">
          {loveStory.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              className="flex gap-5 items-start"
            >
              {/* Dot */}
              <div className="relative z-10 shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #FE2C55, #25F4EE)',
                    boxShadow: '0 0 16px rgba(254,44,85,0.5)',
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content card */}
              <div className="glass-card p-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-pink-400 text-xs font-mono font-bold">{item.date}</span>
                  {i === loveStory.length - 1 && (
                    <div className="live-badge text-xs">LIVE</div>
                  )}
                </div>
                <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>

                {/* Image */}
                {i % 2 === 0 && (
                  <div className="mt-3 rounded-xl overflow-hidden h-32 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 500px) 100vw, 500px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
