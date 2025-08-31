# 🌧️ Raindrop.io Bookmarks Integration Setup

This guide will help you connect your Raindrop.io bookmarks to your portfolio website.

## 🚀 Quick Setup

### Step 1: Get Your API Token

1. **Go to Raindrop.io Settings**
   - Visit: https://app.raindrop.io/settings/integrations
   - Sign in to your Raindrop.io account

2. **Create a New App**
   - Click "Create new app"
   - **App Name**: `Personal Portfolio` (or any name you prefer)
   - **Description**: `Personal website bookmarks integration`
   - **Redirect URI**: `http://localhost:3008` (or your domain)
   - Click "Create"

3. **Copy Your Test Token**
   - After creating the app, you'll see a "Test Token"
   - Copy this token (it should be 36 characters long)

### Step 2: Configure Your Environment

1. **Create .env file**
   ```bash
   cp .env.example .env
   ```

2. **Add Your Token**
   ```env
   RAINDROP_TOKEN=your_36_character_test_token_here
   ```

3. **Optional: Enable Debug Mode**
   ```env
   DEBUG_RAINDROP=true
   ```

### Step 3: Test the Integration

1. **Restart Your Development Server**
   ```bash
   npm run dev
   ```

2. **Visit the Bookmarks Page**
   - Go to: http://localhost:3008/bookmarks
   - Check the browser console for any messages

## 🔧 Troubleshooting

### Issue: Still Seeing Mock Data

**Possible Causes:**

1. **Token Not Set**
   - ✅ Verify `.env` file exists and has `RAINDROP_TOKEN=...`
   - ✅ Make sure there are no spaces around the `=` sign
   - ✅ Restart the development server after adding the token

2. **Invalid Token**
   - ✅ Token should be exactly 36 characters long
   - ✅ Make sure you're using the "Test Token" from your created app
   - ✅ Don't use quotes around the token in the .env file

3. **No Bookmarks in Account**
   - ✅ Add some bookmarks to your Raindrop.io account
   - ✅ Try visiting different collections (not just "Unsorted")

### Issue: API Errors (401 Unauthorized)

**Solutions:**

1. **Recreate the App**
   - Go back to https://app.raindrop.io/settings/integrations
   - Delete the old app and create a new one
   - Copy the new test token

2. **Check Token Format**
   - Token should look like: `b1234567-89ab-cdef-0123-456789abcdef`
   - No extra characters or spaces

### Issue: Network Errors

**Check:**
- ✅ You're connected to the internet
- ✅ Raindrop.io is accessible: https://raindrop.io
- ✅ No firewall blocking the API calls

## 🔍 Debug Mode

Enable detailed logging:

```env
DEBUG_RAINDROP=true
```

This will show:
- 🔍 API request attempts
- 🔑 Token validation
- 📖 Sample bookmark data
- 💡 Helpful troubleshooting tips

## 📊 Alternative: Static Export

If the API integration isn't working, you can use static data:

1. **Export Your Bookmarks**
   - Go to: https://app.raindrop.io/settings/backups
   - Click "Create backup"
   - Download the JSON file

2. **Update Mock Data**
   - Open `src/lib/raindrop.ts`
   - Replace the `mockBookmarks` array with your exported data
   - Modify the structure to match the `RaindropBookmark` interface

## 📝 Expected Console Messages

**✅ Success:**
```
✅ Successfully fetched 25 bookmarks from Raindrop.io
```

**ℹ️ Fallback:**
```
📚 No RAINDROP_TOKEN found - using mock data for demonstration
```

**🚫 Auth Error:**
```
🚫 Raindrop API authentication failed - using mock data
```

## 🆘 Still Having Issues?

1. **Check Browser Developer Tools**
   - Open DevTools (F12)
   - Look at Console and Network tabs
   - Check for any error messages

2. **Verify Your Setup**
   - Ensure you have bookmarks in your Raindrop.io account
   - Try accessing your bookmarks directly at https://app.raindrop.io

3. **Test Token Manually**
   - Visit: https://api.raindrop.io/rest/v1/user?test_token=YOUR_TOKEN
   - You should see your user information (not an error)

## 🎯 Final Notes

- The integration gracefully falls back to mock data if the API fails
- Mock data is curated with developer-focused bookmarks
- The bookmarks section will work perfectly even without the API
- All search, filtering, and UI features work with both real and mock data

---

**Need more help?** Check the troubleshooting comments in `src/lib/raindrop.ts`