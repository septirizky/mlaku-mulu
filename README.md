# Mlaku-Mulu Travel API

API untuk mengelola pengguna (users), turis (tourists), perjalanan (trips), dan ulasan perjalanan (trip-reviews).

## 🔐 Authentication

Semua endpoint (kecuali `auth`) memerlukan JWT Bearer Token dalam header:

```
Authorization: Bearer <token>
```

---

## 📦 Auth

### POST `/auth/register`

**Register Turis Baru**

```json
{
  "username": "agus123",
  "email": "agus@mail.com",
  "password": "password123",
  "name": "Agus",
  "phone": "081234567890",
  "address": "Jl. Indonesia No.1",
  "gender": "male",
  "birth_day": "1997-01-17",
  "nik": "1234567890123456",
  "nationality": "Indonesia"
}
```

### POST `/auth/login`

**Login dan mendapatkan token**

```json
{
  "email": "agus@mail.com",
  "password": "password123"
}
```

---

## 👤 Users (Admin/Staff Only)

### POST `/users`

**Create user dengan upload foto**

- Form-data: `{ photo: (file) }`
- Body JSON (via `form-data`):

```json
{
  "username": "admin",
  "email": "admin@mail.com",
  "password": "admin123",
  "role": "admin"
}
```

### GET `/users`

**Get semua users**

### GET `/users/:id`

**Get 1 user berdasarkan ID**

### PUT `/users/:id`

**Update data user**

### PATCH `/users/:id/photo`

**Update foto user**

- Form-data: `{ photo: (file) }`

### DELETE `/users/:id`

**Hapus user & fotonya**

### GET `/users/photo/:imgpath`

**Serve file gambar user**

---

## 🧍‍♂️ Tourists

### GET `/tourists/me`

**Ambil profil turis yang sedang login**  
Response berisi user, data turis, trip, dan review-nya.

### PUT `/tourists/me`

**Update profil turis + user**

```json
{
  "email": "new@mail.com",
  "username": "newusername",
  "password": "newpassword",
  "name": "Agus Updated",
  "phone": "081234567891",
  "address": "Alamat baru",
  "gender": "male",
  "birth_day": "1990-01-01",
  "nik": "1234567890123456",
  "nationality": "Indonesia"
}
```

### PATCH `/tourists/me/photo`

**Update foto profil turis (di tabel user)**

### GET `/tourists`

**(Admin/Staff Only) Lihat semua turis**

### GET `/tourists/:id`

**(Admin/Staff Only) Lihat detail turis berdasarkan ID**

### PUT `/tourists/:id`

**(Admin/Staff Only) Update data turis + user terkait**

### DELETE `/tourists/:id`

**(Admin Only) Hapus turis dan user terkait**

---

## 🌍 Trips (Admin/Staff Only)

### POST `/trips`

**Buat perjalanan baru**

```json
{
  "tourist_id": 1,
  "start_date": "2025-05-20",
  "end_date": "2025-05-25",
  "destination": "Nusa Penida"
}
```

### GET `/trips`

**Ambil semua trip**

### GET `/trips/:id`

**Ambil 1 trip**

### PUT `/trips/:id`

**Update data trip**

### DELETE `/trips/:id`

**Hapus trip**

---

## 📝 Trip Reviews (Turist Only)

### POST `/trip-reviews`

**Turis membuat review untuk trip-nya**

```json
{
  "trip_id": 3,
  "rating": 5,
  "comment": "Great experience!"
}
```

- Validasi:
  - Trip harus milik turis yang login
  - Hanya bisa review sekali per trip

---

## 📎 Notes

- Semua endpoint terlindungi oleh JWT, kecuali `/auth/register` dan `/auth/login`.
- Upload foto menggunakan multipart/form-data.
- Username & email harus unik saat register, update, dan create.
- Semua file disimpan di `./assets`, default foto adalah `noavatar.png`.

---

## 🚀 Tech Stack

- NestJS
- Sequelize + PostgreSQL
- Multer (upload foto)
- JWT Auth + Role Guard
