# RSVP setup — Google Sheet + Apps Script

The RSVP form posts to `/api/rsvp` (server-side), which forwards each reply to a
Google Apps Script web app that appends a row to a Google Sheet. This keeps the
webhook URL and secret off the browser.

## 1. Create the Sheet

1. Create a new Google Sheet (e.g. **"Thanh & Tuấn — RSVP"**).
2. In row 1, add these headers (order matters):

   | Timestamp | Full Name | Email | Attending | Guest Of | Number of Guests | Lời chúc |
   |-----------|-----------|-------|-----------|----------|------------------|----------|

## 2. Add the Apps Script

In the Sheet: **Extensions ▸ Apps Script**, delete the boilerplate, paste this,
and replace `PUT-A-RANDOM-SECRET-HERE` with a random string (you'll reuse it):

```javascript
const SHARED_SECRET = 'PUT-A-RANDOM-SECRET-HERE';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.token !== SHARED_SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(),
      body.fullName || '',
      body.email || '',
      body.attending || '',
      body.guestOf || '',
      body.guests || '',
      body.message || '',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### (Tuỳ chọn) Đọc lời chúc cho "Sổ Lưu Bút" — thêm `doGet`

Toast lời chúc trên trang lấy dữ liệu từ cột **Lời chúc** của Sheet này. Dán thêm
hàm `doGet` dưới đây vào cùng Apps Script (dùng chung `SHARED_SECRET`), rồi
**redeploy** (xem mục 3 — phải tạo *New version*):

```javascript
function doGet(e) {
  if (e.parameter.token !== SHARED_SECRET) {
    return json({ ok: false, error: 'unauthorized' });
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  rows.shift(); // bỏ hàng tiêu đề
  const wishes = rows
    .map(function (r) { return { name: r[1], message: r[6] }; }) // B = Full Name, G = Lời chúc
    .filter(function (w) { return w.message && String(w.message).trim() !== ''; });
  return json({ ok: true, wishes: wishes });
}
```

> Trang gọi qua route `/api/wishes` (server-side, kèm `token`) nên secret không lộ
> ra trình duyệt. Khi chưa cấu hình, toast tự hiển thị vài lời chúc mẫu.

## 3. Deploy as a web app

1. **Deploy ▸ New deployment**.
2. Type: **Web app**.
3. **Execute as:** Me. **Who has access:** Anyone.
4. **Deploy**, authorize when prompted, and copy the **Web app URL** (ends in `/exec`).

> After editing the script later, use **Manage deployments ▸ Edit ▸ Version: New
> version ▸ Deploy** (or create a new deployment) — otherwise changes won't take effect.

> ♻️ **Đã cài đặt từ trước? (cập nhật để lưu Lời chúc)** Nếu Sheet + Script đã tạo trước khi
> thêm ô lời chúc, hãy làm 3 việc sau thì cột mới mới được ghi:
> 1. Mở Sheet, thêm tiêu đề **`Lời chúc`** vào ô đầu của cột G (sau "Number of Guests").
> 2. Trong Apps Script, thêm `body.message || ''` vào cuối mảng `appendRow([...])` (như đoạn code ở trên).
> 3. **Manage deployments ▸ Edit ▸ Version: New version ▸ Deploy** để áp dụng.

## 4. Configure the app

Create `.env.local` in the project root (gitignored):

```
RSVP_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
RSVP_SHARED_SECRET=PUT-A-RANDOM-SECRET-HERE
```

Use the **same** secret in both the Apps Script and `.env.local`.

On Vercel, add the same two variables under **Project ▸ Settings ▸ Environment Variables**.

## 5. Test

```bash
npm run dev
```

Submit the form, or:

```bash
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Guest","email":"t@example.com","attending":"yes","guestOf":"Bride'\''s Guest","guests":"1"}'
```

You should get `{"ok":true}` and a new row in the Sheet.
