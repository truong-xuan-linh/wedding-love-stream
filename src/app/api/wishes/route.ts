import { NextRequest, NextResponse } from "next/server";

interface Wish {
  id: string;
  name: string;
  message: string;
  emoji: string;
  timestamp: number;
}

// In-memory store (resets on server restart - fine for demo)
const wishes: Wish[] = [
  {
    id: "1",
    name: "Mẹ Nhung",
    message: "Con gái mẹ đã lớn! Chúc hai con trăm năm hạnh phúc! 🥰",
    emoji: "💕",
    timestamp: Date.now() - 300000,
  },
  {
    id: "2",
    name: "Hội bạn thân",
    message: "XIN CHÚC MỪNG NGÀY CƯỚI!!! Yêu hai đứa lắm! 🎉",
    emoji: "🎊",
    timestamp: Date.now() - 180000,
  },
  {
    id: "3",
    name: "Anh Tuấn",
    message: "Chúc cô dâu chú rể mãi mãi yêu nhau nhé! 💍",
    emoji: "💍",
    timestamp: Date.now() - 120000,
  },
  {
    id: "4",
    name: "Chị Lan",
    message: "Đẹp quá đi ơi! Hạnh phúc nhé hai đứa 💕",
    emoji: "🌸",
    timestamp: Date.now() - 60000,
  },
  {
    id: "5",
    name: "Team công ty",
    message: "Congratulations! Wishing you a lifetime of love! 🌺",
    emoji: "💐",
    timestamp: Date.now() - 30000,
  },
];

export async function GET() {
  return NextResponse.json(wishes.slice(-20).reverse());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message } = body;

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name and message required" }, { status: 400 });
  }

  const emojis = ["💕", "🌸", "💍", "🎊", "🥰", "💐", "🌹", "✨", "💫", "🎉"];
  const wish: Wish = {
    id: Date.now().toString(),
    name: name.trim(),
    message: message.trim(),
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    timestamp: Date.now(),
  };

  wishes.push(wish);
  if (wishes.length > 100) wishes.shift();

  return NextResponse.json(wish, { status: 201 });
}
