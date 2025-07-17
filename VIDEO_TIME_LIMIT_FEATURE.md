Perfect! I've successfully added the configurable video time limit feature to your site. Here's what I implemented:

## ✅ What's Been Added

### 1. **Keystatic Admin Interface**
- Added a new field "Video Time Limit (Minutes)" in Site Settings
- Range validation: 1-30 minutes
- Default value: 1 minute
- User-friendly description and validation

### 2. **Database Schema Update**
- Updated `src/content/config.ts` to include `videoTimeLimitMinutes` field
- Added validation (min: 1, max: 30)
- Updated `src/content/siteSettings/main.yaml` with default value

### 3. **Video Component Integration**
- Both `src/pages/video.astro` and `src/components/video.astro` now read the setting
- Dynamic time limit calculation: `videoTimeLimitMinutes * 60000` (converts to milliseconds)
- Dynamic status display: Shows "⚠ Free (X min limit)" where X is the configured value
- Dynamic upgrade message: Shows "X-Minute Limit Reached" where X is the configured value

## 🎯 How It Works

1. **Admin Control**: Go to your Keystatic admin panel → Site Settings → Video Time Limit
2. **Set Limit**: Choose any value between 1-30 minutes
3. **Instant Effect**: The change applies immediately to all video players
4. **User Experience**: 
   - Status shows current limit (e.g., "⚠ Free (5 min limit)")
   - Timer runs for the configured duration
   - Upgrade message reflects the actual limit reached

## 🧪 Testing

Your dev server is running at http://127.0.0.1:4322/

To test:
1. Visit http://127.0.0.1:4322/admin (Keystatic admin)
2. Go to Site Settings → Change "Video Time Limit" to 2 minutes
3. Visit http://127.0.0.1:4322/video
4. Play a video and wait 2 minutes to see the upgrade prompt

To test membership bypass:
- Add `?membership=test_token` to skip the timer entirely

## 🚀 Benefits

- **Flexibility**: Easy to adjust time limits based on your business model
- **No Code Changes**: All changes done through the admin interface
- **Consistent**: Both video page and component use the same setting
- **User-Friendly**: Clear indication of current limits to users

The feature is now fully integrated and ready to use! You can adjust the time limit anytime through your Keystatic admin panel.
