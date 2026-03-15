'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { weddingData } from '@/lib/weddingData';

function VenueCard({
  venue,
  type,
  delay,
}: {
  venue: { name: string; address: string; time: string; icon: string };
  type: string;
  delay: number;
}) {
  const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(venue.address)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring' }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{venue.icon}</div>
        <div>
          <div className="text-xs text-pink-400 uppercase tracking-widest font-bold">{type}</div>
          <div className="text-white font-bold text-base">{venue.name}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Clock size={14} className="text-gray-400 mt-0.5 shrink-0" />
          <span className="text-gray-300 text-sm">
            {venue.time} - {weddingData.wedding.dayOfWeek}, {weddingData.wedding.dateDisplay}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
          <span className="text-gray-300 text-sm">{venue.address}</span>
        </div>
      </div>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{
          background:
            'linear-gradient(135deg, rgba(254,44,85,0.3), rgba(37,244,238,0.2))',
          border: '1px solid rgba(254,44,85,0.4)',
        }}
      >
        <MapPin size={14} />
        Xem bản đồ
      </a>
    </motion.div>
  );
}

export default function WeddingDetails() {
  const { wedding } = weddingData;

  return (
    <section className="px-4 py-16 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="live-badge mx-auto mb-3 text-xs">THÔNG TIN</div>
        <h2
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}
          className="text-white text-3xl"
        >
          Thông Tin Đám Cưới
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Hãy đến và cùng chúng mình chung vui nhé! 💕
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {/* Date highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-5 text-center"
          style={{
            border: '1px solid rgba(254,44,85,0.4)',
            background:
              'linear-gradient(135deg, rgba(254,44,85,0.1), rgba(37,244,238,0.05))',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar size={16} className="text-pink-400" />
            <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
              Ngày Trọng Đại
            </span>
          </div>
          <div
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '4px' }}
            className="text-white text-4xl text-glow-red"
          >
            {wedding.dateDisplay}
          </div>
          <div className="text-gray-300 text-sm mt-1">{wedding.dayOfWeek}</div>
        </motion.div>

        <VenueCard venue={wedding.venue.ceremony} type="Lễ Thánh Hôn" delay={0.1} />
        <VenueCard venue={wedding.venue.reception} type="Tiệc Cưới" delay={0.2} />
      </div>
    </section>
  );
}
