# ⚡ Quick Fix Commands

## 🚨 Immediate Fix for Database Error

Run these commands in order:

### 1. Stop Your Server
Press `Ctrl+C` in the terminal where `npm run dev` is running

### 2. Clean Next.js Cache
```powershell
cd "C:\Users\susha\Desktop\collage PROJECT\AI vise\ai-career-coach"
Remove-Item -Recurse -Force .next
```

### 3. Fix DATABASE_URL (Remove channel_binding)
```powershell
# The DATABASE_URL in your .env has &channel_binding=require which might cause issues
# I've already fixed this, but verify:
Get-Content .env | Select-String "DATABASE_URL"
```

### 4. Restart Server
```powershell
npm run dev
```

### 5. Run Prisma Setup
```powershell
npx prisma generate
npx prisma migrate dev
```

## ✅ Expected Result

After these steps, you should see:
- ✅ No "Can't reach database server at localhost:5432" errors
- ✅ Server starts successfully
- ✅ Pages load without database errors

## 🔍 If Still Getting Errors

### Check .env File Location
```powershell
# Verify .env is in the right place
Test-Path "C:\Users\susha\Desktop\collage PROJECT\AI vise\ai-career-coach\.env"
# Should return: True
```

### Verify DATABASE_URL Format
```powershell
# Check DATABASE_URL
Get-Content .env | Select-String "DATABASE_URL"
# Should show your Neon URL (not localhost)
```

### Check for .env.local
```powershell
# .env.local overrides .env
Test-Path ".env.local"
# If this exists, check its contents
```

---

**Most likely fix: Delete `.next` folder and restart server!**
