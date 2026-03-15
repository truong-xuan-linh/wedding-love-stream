'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingData } from '@/lib/weddingData';

export default function PhotoAlbum() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [view, setView] = useState<'grid' | 'scroll'>('grid');

  const { photos } = weddingData;

  const prev = () =>
    setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const next = () =>
    setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null));

  return (
    <section className="px-4 py-16 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <div className="live-badge mx-auto mb-3 text-xs">ALBUM</div>
        <h2
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}
          className="text-white text-3xl"
        >
          Khoảnh Khắc Đáng Nhớ
        </h2>
        <p className="text-gray-400 text-sm mt-2">{photos.length} ảnh cưới 📸</p>
      </motion.div>

      {/* Toggle view */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setView('grid')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            view === 'grid' ? 'bg-pink-600 text-white' : 'glass-card text-gray-400'
          }`}
        >
          # Lưới
        </button>
        <button
          onClick={() => setView('scroll')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            view === 'scroll' ? 'bg-pink-600 text-white' : 'glass-card text-gray-400'
          }`}
        >
          → Cuộn
        </button>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="relative aspect-square cursor-pointer overflow-hidden"
              onClick={() => setLightboxIndex(i)}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 500px) 33vw, 170px"
              />
              {i === 0 && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <span className="text-white text-xs font-bold bg-pink-600 px-2 py-1 rounded">
                    Best Shot ✨
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Horizontal scroll view */}
      {view === 'scroll' && (
        <div className="photo-swipe-container flex gap-3 pb-4 no-scrollbar">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="photo-snap-item relative rounded-2xl overflow-hidden cursor-pointer shrink-0"
              style={{ width: '75vw', maxWidth: '320px', height: '200px' }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="75vw"
              />
              <div className="absolute bottom-2 right-2 glass-card px-2 py-1 text-xs text-white">
                {i + 1}/{photos.length}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center glass-card"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={20} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-sm text-white">
              {lightboxIndex + 1} / {photos.length}
            </div>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-2xl max-h-[85vh] mx-4"
              style={{ aspectRatio: '4/3' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                fill
                className="object-contain rounded-xl"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Nav buttons */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center glass-card"
              onClick={e => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={22} className="text-white" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center glass-card"
              onClick={e => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={22} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
