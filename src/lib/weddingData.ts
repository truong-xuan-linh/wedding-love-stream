export const weddingData = {
  bride: {
    name: "Hồng Nhung",
    fullName: "Phạm Thị Hồng Nhung",
    nickname: "Nhung",
    tiktok: "@nhungpham_bride",
    photo: "/images/3.webp",
    bio: "Content creator • Yêu cà phê sáng ☕ • Mọt phim 🎬 • Nay là MRS. NGUYỄN 💕",
    followers: "24.8K",
  },
  groom: {
    name: "Quang Hào",
    fullName: "Nguyễn Quang Hào",
    nickname: "Hào",
    tiktok: "@haonguyen_official",
    photo: "/images/2.webp",
    bio: "Photographer 📸 • Du lịch là lẽ sống 🌍 • Mê mèo 🐱 • Chồng của @nhungpham_bride 💑",
    followers: "18.2K",
  },
  wedding: {
    date: "2026-06-28",
    time: "18:00",
    dateDisplay: "28.06.2026",
    dayOfWeek: "Chủ Nhật",
    venue: {
      ceremony: {
        name: "Nhà Thờ Lớn Hà Nội",
        address: "40 Nhà Chung, Hoàn Kiếm, Hà Nội",
        time: "10:30",
        icon: "⛪",
      },
      reception: {
        name: "Trống Đồng Palace",
        address: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
        time: "18:00",
        icon: "🏛️",
      },
    },
    hashtag: "#NhungHaoWedding2026",
    streamTitle: "Đám Cưới Trực Tiếp 💒",
  },
  loveStory: [
    {
      date: "15.02.2021",
      title: "Lần đầu gặp gỡ",
      description:
        "Chúng mình gặp nhau tại một buổi họp lớp sau 3 năm xa cách. Ánh mắt đầu tiên đã nói lên tất cả... 👀",
      icon: "✨",
      img: "/images/5.webp",
    },
    {
      date: "14.03.2021",
      title: "Buổi hẹn đầu tiên",
      description:
        "Cà phê sáng ở Hồ Tây, chúng mình nói chuyện không dứt cho đến khi hoàng hôn buông xuống ☕🌅",
      icon: "☕",
      img: "/images/6.webp",
    },
    {
      date: "28.07.2022",
      title: "Chuyến du lịch định mệnh",
      description:
        "Da Nang trip cùng nhau – chính ở đây Hào đã thầm nhủ: 'Người này là của mình rồi!' 🏖️",
      icon: "🌊",
      img: "/images/7.webp",
    },
    {
      date: "14.02.2025",
      title: "Anh cầu hôn em",
      description:
        "Giữa những bông hoa và ánh đèn lung linh, anh quỳ xuống và hỏi em một câu thay đổi cuộc đời... 💍",
      icon: "💍",
      img: "/images/8.webp",
    },
    {
      date: "28.06.2026",
      title: "Ngày trọng đại ❤️",
      description:
        "Và hôm nay, chúng mình chính thức trở thành một gia đình! Cảm ơn mọi người đã đồng hành! 🎉",
      icon: "💒",
      img: "/images/1.webp",
    },
  ],
  photos: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/images/${i + 1}.webp`,
    alt: `Ảnh cưới ${i + 1}`,
  })),
  initialWishes: [
    {
      id: "1",
      name: "Mẹ Nhung",
      message: "Con gái mẹ đã lớn! Chúc hai con trăm năm hạnh phúc! 🥰",
      emoji: "💕",
    },
    {
      id: "2",
      name: "Hội bạn thân",
      message: "XIN CHÚC MỪNG NGÀY CƯỚI!!! 🎉🎊",
      emoji: "🎊",
    },
    {
      id: "3",
      name: "Anh Tuấn",
      message: "Chúc cô dâu chú rể mãi mãi yêu nhau nhé! 💍",
      emoji: "💍",
    },
    {
      id: "4",
      name: "Chị Lan",
      message: "Đẹp quá đi ơi! Hạnh phúc nhé hai đứa 💕",
      emoji: "🌸",
    },
    {
      id: "5",
      name: "Team công ty",
      message: "Congratulations! Wishing you a lifetime of love! 🌺",
      emoji: "💐",
    },
    {
      id: "6",
      name: "Dì Ba",
      message: "Mừng cháu gái lấy chồng! Sinh con đàn cháu đống nha! 😂",
      emoji: "🥳",
    },
  ],
};
