# Postman Test Guide สำหรับ Blog Post API

## 1. ทดสอบ Login API

### Request Setup:
- **Method**: `POST`
- **URL**: `https://blog-post-project-api-five.vercel.app/auth/login`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "email": "admin@blog.com",
    "password": "admin123"
  }
  ```

### Expected Response (สำเร็จ):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```
**Status Code**: `200 OK`

---

## 2. ทดสอบ Preflight Request (OPTIONS)

### Request Setup:
- **Method**: `OPTIONS`
- **URL**: `https://blog-post-project-api-five.vercel.app/auth/login`

### Expected Response Headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- **Status Code**: `200 OK` หรือ `204 No Content`

---

## 3. ทดสอบ Register API

### Request Setup:
- **Method**: `POST`
- **URL**: `https://blog-post-project-api-five.vercel.app/auth/register`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "email": "newuser@example.com",
    "password": "password123",
    "username": "newuser",
    "fullName": "New User"
  }
  ```

---

## 4. ทดสอบ Get User (ต้องใช้ Token)

### Request Setup:
- **Method**: `GET`
- **URL**: `https://blog-post-project-api-five.vercel.app/auth/get-user`
- **Headers**:
  ```
  Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
  Content-Type: application/json
  ```

---

## Alternative Endpoints ที่ควรลอง (ถ้า `/auth/login` ไม่ได้):

1. `/login`
2. `/api/auth/login`
3. `/api/login`
4. `/users/login`
5. `/user/login`

---

## Troubleshooting

### ถ้าได้ 404 Not Found:
- ลองเปลี่ยน endpoint เป็นตัวเลือกด้านบน
- เช็คว่า URL ถูกต้อง

### ถ้าได้ CORS Error:
- Backend ต้องตั้งค่า CORS headers
- เช็คว่า OPTIONS method ทำงานได้

### ถ้าได้ 401 Unauthorized:
- เช็คว่า email/password ถูกต้อง
- ลอง reset password หรือเช็คข้อมูลใน database

### ถ้าได้ 500 Internal Server Error:
- Backend มีปัญหา
- เช็ค server logs

---

## Tips:

1. **บันทึก Token**: หลังจาก login สำเร็จ ให้ copy `access_token` ไปใช้ทดสอบ API อื่นๆ
2. **Environment Variables**: สร้าง Postman Environment เพื่อเก็บ token และ base URL
3. **Collection**: สร้าง Postman Collection เพื่อจัดเก็บ requests ทั้งหมด

