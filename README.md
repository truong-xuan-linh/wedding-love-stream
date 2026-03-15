# 💒 The Love Stream — Online Wedding Invitation

> Thiệp cưới online phong cách TikTok/Livestream cho cặp đôi Gen Z.

Được tạo bởi **[L'amour](https://www.lamour.com.vn)** — Thiệp cưới online hiện đại.

---

## Xem demo

```
http://localhost:3000
```

Personalize tên khách mời qua URL:
```
http://localhost:3000?to=Tên+Khách+Mời
```

---

## Tính năng

- **🔴 LIVE Intro** — Loading bar 0→99→100%, flash "LIVE NOW!"
- **👁 Viewer count** — Số người xem tăng dần tự động (mô phỏng)
- **❤️ Floating Hearts** — Chạm/click màn hình để thả tim bay
- **💌 Guestbook Donation Style** — Lời chúc hiện dần góc dưới trái như TikTok Live
- **⏱ Countdown** — Đếm ngược đến ngày cưới kiểu live stream
- **📸 Photo Album** — Grid + horizontal scroll + lightbox
- **🎵 Nhạc nền** — Rotating disk icon, auto-play, volume slider dọc
- **🔗 Personalization** — `?to=TênKhách` trên URL

---

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Build production:
```bash
npm run build
npm start
```

---

## Cấu trúc project

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Server component (đọc ?to= param)
│   ├── globals.css         # TikTok theme CSS
│   └── api/wishes/         # API gửi/lấy lời chúc
├── components/
│   ├── StreamIntro.tsx     # Màn hình loading → LIVE NOW
│   ├── MainContent.tsx     # Orchestrator client component
│   ├── LiveHeader.tsx      # Fixed top bar (LIVE badge, viewer count)
│   ├── FloatingHearts.tsx  # Hearts bay lên khi click
│   ├── HeroSection.tsx     # Hero banner fullscreen
│   ├── CoupleProfile.tsx   # Profile TikTok cô dâu & chú rể
│   ├── LoveStory.tsx       # Timeline hành trình yêu
│   ├── CountdownSection.tsx # Countdown đến ngày cưới
│   ├── PhotoAlbum.tsx      # Album ảnh cưới
│   ├── WeddingDetails.tsx  # Địa điểm & thông tin
│   ├── GuestbookDonation.tsx # Sổ lưu bút kiểu donation
│   ├── BackgroundMusic.tsx  # Nhạc nền TikTok style
│   └── Footer.tsx          # L'amour branding
└── lib/
    └── weddingData.ts      # Mock data (cặp đôi, ảnh, lời chúc)
```

---

## Tùy chỉnh thông tin

Chỉnh thông tin cặp đôi tại `src/lib/weddingData.ts`:

```typescript
export const weddingData = {
  bride: { name: "Hồng Nhung", ... },
  groom: { name: "Quang Hào", ... },
  wedding: { date: "2026-06-28", ... },
  ...
}
```

---

## Tech Stack

| Công nghệ | Version |
|-----------|---------|
| Next.js | 15.3 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Lucide React | latest |

---

## Thương hiệu L'amour

- 🌐 [lamour.com.vn](https://www.lamour.com.vn)
- 🎵 [TikTok @lamourlink](https://www.tiktok.com/@lamourlink)
- 📸 [Instagram @lamourlink](https://www.instagram.com/lamourlink/)
- 👥 [Facebook](https://www.facebook.com/profile.php?id=61579532994773)
