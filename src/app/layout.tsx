import type { Metadata } from "next";
import { Oswald, Nunito } from "next/font/google";
import "./globals.css";

// Oswald hỗ trợ đầy đủ tiếng Việt, phù hợp cho display text
const oswald = Oswald({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "🔴 LIVE | Đám Cưới Quang Hào & Hồng Nhung",
  description: "Bạn đang xem trực tiếp đám cưới của Quang Hào & Hồng Nhung – 28.06.2026",
  openGraph: {
    title: "🔴 LIVE | Đám Cưới Quang Hào & Hồng Nhung",
    description: "Bạn đang xem trực tiếp đám cưới của Quang Hào & Hồng Nhung",
    images: ["/images/1.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${nunito.variable}`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
