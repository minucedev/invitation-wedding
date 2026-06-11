# Thiệp Cưới — Thanh & Tuấn

Website thiệp cưới (landing page cuộn dọc) cho lễ thành hôn của **Thanh & Tuấn — 24.12.2026**.
Xây dựng bằng **Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS** · **Framer Motion**.

## Tính năng
- Các phần: Hero, Câu chuyện, Cô dâu & Chú rể, Chương trình (kèm Xem bản đồ / Thêm vào lịch), Album ảnh, Lời tri ân, Xác nhận tham dự (RSVP), Hộp mừng cưới.
- **RSVP** lưu phản hồi (kèm lời chúc) vào Google Sheet qua Google Apps Script.
- Toast hiển thị lời chúc đọc từ Sheet.

## Chạy ở máy
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build production
```bash
npm run build
npm start
```

## Cấu hình RSVP
Tạo file `.env.local` (đã được gitignore) với 2 biến — xem hướng dẫn tạo Google Sheet + Apps Script trong [`RSVP_SETUP.md`](./RSVP_SETUP.md):
```
RSVP_WEBHOOK_URL=...     # URL web-app /exec của Apps Script
RSVP_SHARED_SECRET=...   # chuỗi bí mật, khớp với SHARED_SECRET trong Apps Script
```

## Triển khai
Xem hướng dẫn deploy lên Vercel trong [`DEPLOY_VERCEL.md`](./DEPLOY_VERCEL.md).
Nhớ thêm 2 biến môi trường RSVP ở phần Environment Variables của Vercel.

## Ghi chú
- Ảnh trong `public/images/` đã được nén cho web; ảnh gốc full-size lưu ở `pic/` (không đưa lên git).
