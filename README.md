# Game Hub

Nền tảng web game tích hợp nhiều mini game, hệ thống người dùng và các tính năng cộng đồng.

<p align="left">
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
	<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
	<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="left">
	<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
	<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
	<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
	<img src="https://img.shields.io/badge/Knex-D26B38?style=for-the-badge&logo=knexdotjs&logoColor=white" alt="Knex"/>
	<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
	<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
</p>

## Mục lục
- Tổng quan
- Công nghệ sử dụng
- Cấu trúc thư mục
- Yêu cầu hệ thống
- Cài đặt dự án
- Cấu hình biến môi trường
- Chạy dự án ở môi trường local
- Database migration và seeding
- API docs
- Tài khoản test
- Scripts nhanh
- Checklist deploy
- Troubleshooting

## Tổng quan
Game Hub bao gồm:
- Frontend React + TypeScript (Vite)
- Backend Express + Knex + PostgreSQL
- Authentication bằng JWT
- Bảo vệ API qua API Key (header x-api-key)
- Swagger/OpenAPI docs có Basic Auth

Các nhóm tính năng chính:
- Xác thực và quản lý tài khoản
- Danh sách game và chơi game trực tiếp
- Lưu lịch sử/phiên chơi
- Bình luận, rating
- Bạn bè, nhắn tin
- Bảng xếp hạng, thành tích
- Khu vực quản trị (admin)

## Công nghệ sử dụng
### Frontend
- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS

### Backend
- Node.js + Express
- Knex
- PostgreSQL
- JWT + bcrypt
- Swagger UI + OpenAPI

## Cấu trúc thư mục
```text
Game-Hub/
├─ backend/            # API server, DB migration/seed, business logic
├─ frontend/           # Web client React + TypeScript
├─ api-docs/           # OpenAPI spec
├─ run_server.cmd      # Chạy backend nhanh trên Windows
├─ run_client.cmd      # Chạy frontend nhanh trên Windows
└─ migrate_&_seeding.cmd
```

## Yêu cầu hệ thống
- Node.js 18+ (khuyến nghị Node.js 20 LTS)
- npm 9+
- PostgreSQL (local hoặc cloud)

## Cài đặt dự án
Chạy từ thư mục root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Cấu hình biến môi trường

### 1) Backend
Tạo file `.env` trong thư mục `backend`:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=postgres://user:password@host:5432/database_name

JWT_SECRET=your_super_secret
EXPIRE_TIME=1d

# API Key: backend lưu HASH SHA-256, frontend gửi plain key qua header x-api-key
API_KEY_HASH=<sha256_of_plain_api_key>

# Bảo vệ trang /api-docs
DOCS_USER=admin
DOCS_PASS=123456

# Optional: nếu dùng upload ảnh Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Gợi ý tạo SHA-256 hash cho API key (ví dụ plain key là `my-local-key`):

```bash
node -e "console.log(require('crypto').createHash('sha256').update('my-local-key').digest('hex'))"
```

Lấy kết quả gán vào `API_KEY_HASH`.

### 2) Frontend
Tạo file `.env` trong thư mục `frontend`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_KEY=my-local-key
```

Lưu ý:
- `VITE_API_KEY` phải đúng với plain key đã dùng để tạo `API_KEY_HASH` ở backend.
- `VITE_API_BASE_URL` cần có hậu tố `/api`.

## Chạy dự án ở môi trường local

### Cách 1: chạy thủ công
Terminal 1 (backend):

```bash
cd backend
npm run start
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

Truy cập:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Cách 2: dùng script .cmd (Windows)
Từ root project:

```bat
run_server.cmd
run_client.cmd
```

## Database migration và seeding

### Chạy thủ công
```bash
cd backend
npx knex migrate:rollback
npx knex migrate:latest
npx knex seed:run
```

### Dùng script nhanh (Windows)
```bat
migrate_&_seeding.cmd
```

## API docs
Swagger UI được mount tại:
- `http://localhost:3000/api-docs`

Trang docs yêu cầu Basic Auth:
- Username: giá trị `DOCS_USER`
- Password: giá trị `DOCS_PASS`

OpenAPI file chính:
- `api-docs/openapi.yaml`

## Tài khoản test
Sau khi seed, có thể dùng:

### Admin
- Email: `admin@game.com`
- Password: `123456`

### User
- Email: `nam.nguyen@test.com`
- Password: `123456`

Mật khẩu mặc định các user seed: `123456`.

## Scripts nhanh

### Backend
```bash
npm run start
```

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Checklist deploy
Trước khi deploy, kiểm tra:
- Đã set đầy đủ biến môi trường cho backend và frontend.
- Backend có `DATABASE_URL` hợp lệ và truy cập được từ môi trường deploy.
- `VITE_API_BASE_URL` trỏ đúng domain backend production kèm `/api`.
- `VITE_API_KEY` khớp với `API_KEY_HASH` backend.
- Đã migrate DB trên môi trường production.

## Troubleshooting

### 1) Lỗi `Invalid API Key` hoặc `Invalid or denied API Key`
- Kiểm tra frontend có gửi header `x-api-key` chưa.
- Kiểm tra plain key ở frontend có khớp với hash trong `API_KEY_HASH` không.

### 2) Mở API docs bị 401
- Kiểm tra `DOCS_USER`, `DOCS_PASS` trên backend.

### 3) Frontend load được layout nhưng data game chậm
- Kiểm tra độ trễ API `/games`.
- Kiểm tra cold start backend nếu deploy serverless.
- Giảm payload API và tăng cache phía client.

---

Nếu cần, có thể bổ sung tiếp các phần:
- Tài liệu API endpoint theo module (auth, users, games, ratings, ...)
- Kiến trúc database (ERD)
- CI/CD pipeline