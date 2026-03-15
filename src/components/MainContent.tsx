'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';

import StreamIntro from './StreamIntro';
import LiveHeader from './LiveHeader';
import FloatingHearts from './FloatingHearts';
import HeroSection from './HeroSection';
import CoupleProfile from './CoupleProfile';
import LoveStory from './LoveStory';
import CountdownSection from './CountdownSection';
import PhotoAlbum from './PhotoAlbum';
import WeddingDetails from './WeddingDetails';
import GuestbookDonation from './GuestbookDonation';
import BackgroundMusic, { MusicRef } from './BackgroundMusic';
import Footer from './Footer';

import { weddingData } from '@/lib/weddingData';

interface MainContentProps {
  guestName: string | null;
}

export default function MainContent({ guestName }: MainContentProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);
  const [heartCount, setHeartCount] = useState(4829);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const musicRef = useRef<MusicRef>(null);

  // Simulated viewer count growing
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setTimeout(() => setIsLive(true), 300);
  }, []);

  const handleLike = useCallback(() => {
    setHeartCount(prev => prev + 1);
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 500);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: '🔴 LIVE | Đám Cưới Quang Hào & Hồng Nhung',
        text: 'Bạn được mời xem trực tiếp đám cưới! 💒',
        url: window.location.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  }, []);

  // CSS calc để căn controls vào phải của stream frame trên desktop
  const rightCtrlStyle: React.CSSProperties = {
    bottom: 260,
    right: 'max(16px, calc((100vw - 480px) / 2 + 16px))',
  };

  return (
    <div className="stream-frame">
      {/* ── Intro screen ── */}
      {showIntro && (
        <StreamIntro onComplete={handleIntroComplete} guestName={guestName} />
      )}

      {/* ── Fixed overlays – nằm NGOÀI motion.div để tránh stacking context ── */}
      {isLive && (
        <>
          <LiveHeader
            viewerCount={viewerCount}
            streamTitle={weddingData.wedding.streamTitle}
            guestName={guestName}
          />

          {/* Right side controls */}
          <div
            className="fixed z-40 flex flex-col items-center gap-6"
            style={rightCtrlStyle}
          >
            {/* Heart / Like */}
            <div className="right-control-btn">
              <motion.button
                animate={{ scale: likeAnimating ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="right-control-icon"
                style={{
                  background: likeAnimating
                    ? 'rgba(254,44,85,0.35)'
                    : 'rgba(255,255,255,0.1)',
                }}
                onClick={handleLike}
              >
                ❤️
              </motion.button>
              <span className="text-xs text-gray-400">
                {heartCount >= 1000
                  ? (heartCount / 1000).toFixed(1) + 'K'
                  : heartCount}
              </span>
            </div>

            {/* Share */}
            <div className="right-control-btn">
              <button className="right-control-icon" onClick={handleShare}>
                <Share2 size={20} className="text-white" />
              </button>
              <span className="text-xs text-gray-400">Chia sẻ</span>
            </div>
          </div>

          <BackgroundMusic ref={musicRef} />
          <FloatingHearts />
          <GuestbookDonation />
        </>
      )}

      {/* ── Scrollable content – fade in sau intro ── */}
      <AnimatePresence>
        {isLive && (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <HeroSection />

            <div className="tiktok-divider mx-4" />
            <CoupleProfile />

            <div className="tiktok-divider mx-4" />
            <LoveStory />

            <div className="tiktok-divider mx-4" />
            <CountdownSection />

            <div className="tiktok-divider mx-4" />
            <PhotoAlbum />

            <div className="tiktok-divider mx-4" />
            <WeddingDetails />

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
