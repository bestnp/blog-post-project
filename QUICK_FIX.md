# ⚡ วิธีแก้ไขด่วน - อัพโหลดรูปโปรไฟล์ไม่ได้

> **ใช้เวลาแค่ 5 นาที!**

---

## 🎯 **2 สิ่งที่ต้องตรวจสอบ**

### ✅ **ขั้นตอนที่ 1: ตรวจสอบ Bucket ใน Supabase**

1. เข้า [Supabase Dashboard](https://supabase.com/dashboard)
2. เลือก Project
3. คลิก **Storage** (ซ้ายมือ)
4. ตรวจสอบว่ามี bucket ชื่อ **`blog-post-project`**

**ถ้าไม่มี:**
- คลิก **"New bucket"**
- ตั้งชื่อ: `blog-post-project`
- ✅ เปิด **"Public bucket"**
- คลิก **"Create"**

---

### ✅ **ขั้นตอนที่ 2: ตั้งค่า Supabase Key ใน Vercel**

**วิธีที่ 1: ใช้ Integration (แนะนำ! ง่ายสุด)**

1. [Vercel Dashboard](https://vercel.com/dashboard) → เลือก `blog-post-project-api`
2. **Settings** → **Integrations**
3. **Browse Marketplace** → ค้นหา **"Supabase"**
4. **Add Integration**
5. เลือก project `blog-post-project-api`
6. เลือก Supabase project
7. คลิก **Submit**
8. ✅ **Redeploy** project (Deployments → ⋯ → Redeploy)

---

**วิธีที่ 2: เพิ่ม Key แบบ Manual**

**ดึง Key จาก Supabase:**
1. [Supabase Dashboard](https://supabase.com/dashboard)
2. เลือก Project
3. **Settings** → **API**
4. หา **"service_role"** (secret key)
5. คลิก **"Reveal"**
6. **คัดลอก** key (ยาวมาก เริ่มด้วย `eyJhbGci...`)

**เพิ่มใน Vercel:**
1. [Vercel Dashboard](https://vercel.com/dashboard) → เลือก `blog-post-project-api`
2. **Settings** → **Environment Variables**
3. **Add New**
4. ตั้งค่า:
   ```
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: [paste key ที่คัดลอก]
   Environment: ✅ Production ✅ Preview ✅ Development
   ```
5. **Save**
6. ✅ **Redeploy** project (Deployments → ⋯ → Redeploy)

---

## 🧪 **ทดสอบ**

1. เข้าเว็บไซต์
2. ล็อกอิน
3. ไปหน้า Profile
4. คลิก **"Upload profile picture"**
5. เลือกรูป → **Save**

✅ **สำเร็จ:** รูปเปลี่ยนทันที  
❌ **ล้มเหลว:** ดู Browser Console (F12) และ Vercel Logs

---

## 📚 **เอกสารฉบับเต็ม**

ดูรายละเอียดเพิ่มเติมที่: `AVATAR_UPLOAD_ISSUES.md`

---

**อัพเดท:** 10 พฤศจิกายน 2025

