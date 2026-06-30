# Hướng dẫn chuẩn bị & deploy website cưới lên Vercel

Tài liệu này hướng dẫn từng bước để đưa website (Next.js 15 + Tailwind + Framer Motion)
lên **Vercel** một cách an toàn — đặc biệt là phần **biến môi trường RSVP** không được lộ ra ngoài.

> Liên quan: phần cấu hình Google Sheet / Apps Script cho RSVP nằm ở **`RSVP_SETUP.md`**.

---

## 0. Yêu cầu trước khi bắt đầu

- [ ] Tài khoản **GitHub** (để chứa code).
- [ ] Tài khoản **Vercel** — nên đăng nhập bằng chính GitHub đó cho tiện.
- [ ] **Node.js 20+** đã cài ở máy (kiểm tra: `node -v`).
- [ ] Apps Script RSVP đã deploy ở chế độ **Who has access: Anyone** (nếu để "Only myself" thì máy chủ Vercel sẽ không gửi được dữ liệu). Xem `RSVP_SETUP.md`.
- [ ] Bạn đang có 2 giá trị bí mật trong file `.env.local`:
  - `RSVP_WEBHOOK_URL` (link `…/exec` của Apps Script)
  - `RSVP_SHARED_SECRET` (chuỗi bí mật, trùng với `SHARED_SECRET` trong Apps Script)

---

## Bước 1 — Build thử "sạch" ở máy (bắt buộc)

Mục tiêu: chắc chắn `npm run build` chạy được trước khi đẩy lên Vercel.

> ⚠️ **Lưu ý quan trọng:** nếu đang chạy nhiều cửa sổ `npm run dev` cùng lúc, lệnh build
> hay bị lỗi kiểu `Cannot find module './331.js'` (do nhiều tiến trình cùng ghi vào thư mục `.next`).
> Hãy tắt hết tiến trình Node trước khi build.

Mở **PowerShell** tại thư mục dự án và chạy:

```powershell
# 1. Tắt tất cả tiến trình Node đang chạy (dừng mọi dev server)
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Xoá cache build cũ
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. Build sạch
npm run build
```

Build **PASS** khi thấy dòng `✓ Compiled successfully` và bảng liệt kê route
(`/` là Static `○`, `/api/rsvp` là Dynamic `ƒ`). Nếu lỗi, đọc kỹ thông báo và sửa trước khi đi tiếp.

---

## Bước 2 — Kiểm tra hình ảnh & tài nguyên

Các file ảnh website đang dùng (phải tồn tại trong `public/images/`):

- [ ] `hero.jpg` — ảnh nền đầu trang
- [ ] `groom.jpg`, `bride.jpg` — ảnh chú rể / cô dâu
- [ ] `story-1.jpg`, `story-2.jpg` — ảnh phần câu chuyện
- [ ] Thư mục `gallery/` — **đặt tất cả ảnh album vào đây**. Trang tự động đọc mọi ảnh
      (`.jpg/.jpeg/.png/.webp`) trong thư mục này lúc build, không cần sửa code.
- [x] QR chuyển khoản trong mục Wishing Well: đã dùng QR thật
      (`qr-vietqr.png` — Vietcombank, NGUYEN THI DIEU THANH). Muốn đổi tài khoản thì
      tạo lại QR qua https://img.vietqr.io và sửa thông tin trong
      `components/WishingWellModal.tsx`.

Tuỳ chọn:

- [ ] **Nhạc nền:** mở `components/MusicPlayer.tsx`, điền `MUSIC_SRC`
      (ví dụ `"/audio/wedding.mp3"` — nhớ tạo thư mục `public/audio/` và bỏ file mp3 vào).
      Để trống thì nút nhạc tự ẩn.
- [ ] **Nén ảnh** trước khi đẩy lên (ảnh gallery khá nặng) để trang tải nhanh hơn —
      có thể dùng [squoosh.app](https://squoosh.app) hoặc [tinypng.com](https://tinypng.com).

---

## Bước 3 — Đưa code lên GitHub

Dự án **chưa phải git repo**, nên cần khởi tạo. Trong PowerShell:

```powershell
git init
git add .
git status
```

> 🔒 **Kiểm tra kỹ kết quả `git status`:** đảm bảo **KHÔNG** thấy các mục sau trong danh sách
> sắp commit (chúng đã được `.gitignore` loại trừ sẵn):
> - `.env.local`  ← chứa secret, **tuyệt đối không được commit**
> - `node_modules/`
> - `.next/`
>
> Nếu lỡ thấy `.env.local` trong danh sách → **dừng lại**, chạy `git rm --cached .env.local` rồi kiểm tra lại `.gitignore`.

Sau khi chắc chắn an toàn:

```powershell
git commit -m "Wedding invitation site - ready for deploy"
```

Tạo repo mới trên GitHub (để **Private** nếu muốn riêng tư), rồi nối và đẩy lên
(thay `<URL-repo>` bằng link repo của bạn):

```powershell
git branch -M main
git remote add origin <URL-repo>
git push -u origin main
```

---

## Bước 4 — Import dự án vào Vercel

1. Vào [vercel.com](https://vercel.com) → **Add New… ▸ Project**.
2. Chọn repo GitHub vừa tạo → **Import**.
3. Vercel tự nhận diện **Framework: Next.js** — **giữ nguyên** mọi cấu hình build
   (Build Command `next build`, Output mặc định). Không cần đổi gì.
4. **Khoan bấm Deploy** — sang Bước 5 thêm biến môi trường trước.

---

## Bước 5 — Thêm biến môi trường (quan trọng nhất)

Trong màn hình import (hoặc sau này ở **Project ▸ Settings ▸ Environment Variables**),
thêm **2 biến** sau, lấy đúng giá trị từ file `.env.local` của bạn:

| Name | Value | Áp dụng cho |
|------|-------|-------------|
| `RSVP_WEBHOOK_URL` | link `…/exec` của Apps Script | Production, Preview, Development |
| `RSVP_SHARED_SECRET` | chuỗi bí mật (trùng Apps Script) | Production, Preview, Development |

Lưu ý:
- Tên biến phải **viết y hệt** (không có tiền tố `NEXT_PUBLIC` — đây là bí mật phía server).
- Nếu bạn thêm/sửa biến **sau khi đã deploy**, phải vào **Deployments ▸ … ▸ Redeploy**
  để áp dụng giá trị mới.

---

## Bước 6 — Deploy & kiểm tra

1. Bấm **Deploy**, chờ build xong (~1–2 phút).
2. Mở link `https://<tên-dự-án>.vercel.app` và kiểm tra:
   - [ ] Cuộn qua tất cả các phần: Hero, Story, Groom & Bride, Itinerary, Gallery, Sổ Lưu Bút, RSVP.
   - [ ] Ảnh hiển thị đầy đủ, chữ tiếng Việt có dấu đúng.
   - [ ] **Itinerary:** nút **View Map** mở bản đồ, **Add to Calendar** thêm được sự kiện.
   - [ ] **RSVP:** điền form thật → bấm gửi → thấy báo "Cảm ơn bạn!" **và** có **dòng mới trong Google Sheet**.
3. **Xoá dòng test** trong Google Sheet sau khi kiểm tra xong.

> Nếu RSVP báo lỗi: kiểm tra lại 2 biến môi trường trên Vercel, và chắc chắn Apps Script
> để quyền **Anyone**. Sau khi sửa nhớ **Redeploy**.

---

## Bước 7 (tuỳ chọn) — Gắn tên miền riêng

**Project ▸ Settings ▸ Domains** → thêm tên miền (ví dụ `thanhtuan-wedding.com`) →
làm theo hướng dẫn trỏ DNS mà Vercel cung cấp.

---

## Bước 8 (tuỳ chọn) — Dọn dẹp cho gọn

Có thể xoá các file không còn dùng để repo nhẹ hơn (không bắt buộc):

- `index.html` — bản thiết kế gốc từ Stitch (đã chuyển thành code, không còn dùng).
- `pic/` — thư mục ảnh nguồn (nếu không cần đưa lên web).
- `public/images/photo-1.png`, `photo-2.png`, `photo-3.png` — ảnh mẫu cũ nếu đã thay bằng ảnh thật.

---

## ✅ Checklist nhanh

- [ ] `npm run build` PASS ở máy (sau khi tắt hết node + xoá `.next`)
- [ ] Ảnh `hero/groom/bride/story-1/story-2.jpg` + thư mục `gallery/` đầy đủ
- [ ] `.env.local` **KHÔNG** bị commit lên GitHub
- [ ] Code đã push lên GitHub
- [ ] Đã import repo vào Vercel (Framework = Next.js)
- [ ] Đã thêm `RSVP_WEBHOOK_URL` + `RSVP_SHARED_SECRET` trên Vercel
- [ ] Deploy thành công, test RSVP ghi được vào Sheet, đã xoá dòng test

---

## 🔄 Cập nhật website về sau

Sau khi đã deploy lần đầu, mỗi lần muốn cập nhật chỉ cần đẩy code mới lên GitHub:

```powershell
git add .
git commit -m "Mô tả thay đổi"
git push
```

Vercel sẽ **tự động build & deploy lại** sau mỗi lần push lên nhánh `main`.
