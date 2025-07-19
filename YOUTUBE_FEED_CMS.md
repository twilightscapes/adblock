# YouTube Feed CMS Integration

## Overview

The YouTube Feed component has been integrated into the Keystatic CMS system, allowing you to create and manage custom YouTube playlist sections through the admin interface. This enables you to add multiple configurable YouTube feed sections to your homepage with different channel combinations, video counts, and display settings.

## Features

- **CMS-Managed Configuration**: Create and edit YouTube feed sections through Keystatic
- **Multiple Sections**: Add multiple YouTube feed sections with different configurations
- **Custom Channel Lists**: Configure unique channel combinations for each section
- **Flexible Display Options**: Choose between grid and swipe/scroll layouts
- **Customizable Settings**: Control video count, titles, player type, and descriptions
- **Visual Indicators**: Playing videos show red borders for easy identification
- **Responsive Design**: Automatically adapts to mobile and desktop

## Setting Up YouTube Feed Sections

### Step 1: Create YouTube Feed Configurations

1. Go to your Keystatic admin interface (`/keystatic`)
2. Navigate to **YouTube Feed Sections** 
3. Click **Create new YouTube Feed Section**
4. Configure your section:

#### Required Fields:
- **Section Title**: Display title (e.g., "Trending Tech Videos")
- **YouTube Channels**: Add channel IDs for the videos you want to include

#### Optional Fields:
- **Section Description**: Optional subtitle text
- **Maximum Videos**: Number of videos to display (1-50, default: 6)
- **Show Video Titles**: Toggle video title and channel info display
- **Use Custom Player**: Choose between custom or YouTube iframe player
- **Display Style**: Grid layout or horizontal scroll

#### Finding YouTube Channel IDs:
Channel IDs can be found in several ways:
- Visit a channel page, view source, search for `"channelId"`
- Use online tools like "YouTube Channel ID Finder"
- Examples:
  - Tucker Carlson: `UCjjBjVc0b1cIpNGEeZtS2lg`
  - Marques Brownlee: `UCBJycsmduvYEL83R_U4JriQ`
  - TED-Ed: `UCsooa4yRKGN_zEE8iknghZA`
  - Vsauce: `UC6nSFpj9HTCZ5t-N3Rm3-HA`

### Step 2: Add Section to Homepage

1. In Keystatic, go to **Home Page**
2. In **Home Page Sections**, click **Add item**
3. Select **YouTube Feed Section** from the dropdown
4. Drag to position where you want it to appear
5. In **YouTube Feed Section** field, select your configured feed
6. Save changes

## Example Configurations

### Configuration 1: Trending Content
```yaml
# trending-content.yaml
title: Trending Content
description: Latest videos from popular tech and educational channels
channelIds:
  - UCjjBjVc0b1cIpNGEeZtS2lg  # Tucker Carlson
  - UCsooa4yRKGN_zEE8iknghZA  # TED-Ed
  - UCBJycsmduvYEL83R_U4JriQ  # Marques Brownlee
  - UC6nSFpj9HTCZ5t-N3Rm3-HA  # Vsauce
maxVideos: 24
showTitles: true
useCustomPlayer: false
defaultView: grid
```

### Configuration 2: Single Creator Focus
```yaml
# creator-spotlight.yaml
title: Creator Spotlight
description: Latest uploads from featured creator
channelIds:
  - UCBJycsmduvYEL83R_U4JriQ  # Marques Brownlee only
maxVideos: 6
showTitles: true
useCustomPlayer: false
defaultView: swipe
```

### Configuration 3: News & Politics
```yaml
# news-politics.yaml
title: News & Politics
description: Current events and political commentary
channelIds:
  - UCjjBjVc0b1cIpNGEeZtS2lg  # Tucker Carlson
  - [Add more news channel IDs]
maxVideos: 12
showTitles: true
useCustomPlayer: true
defaultView: grid
```

## Multiple Feed Sections

You can create multiple YouTube feed sections on a single page:

1. Create multiple feed configurations (e.g., "Tech News", "Entertainment", "Education")
2. Add multiple "YouTube Feed Section" entries to your homepage sections
3. Assign different feed configurations to each section
4. Arrange them in your desired order

Example homepage flow:
1. YouTube Form (for URL input)
2. Trending Tech Videos (6 videos, grid)
3. Educational Content (12 videos, grid) 
4. Latest News (8 videos, swipe)
5. Entertainment (20 videos, grid)

## Video Management Features

- **Single Video Playback**: Only one video plays at a time across all sections
- **Visual Indicators**: Playing videos have red borders and glow effects
- **Background Prevention**: Stopped videos are completely paused (no background audio)
- **Smooth Transitions**: Clean switching between videos
- **Auto-detection**: Automatically detects valid YouTube URLs

## Technical Details

### File Structure
```
src/content/youtubeFeeds/
├── trending-content.yaml
├── latest-videos.yaml
├── creator-spotlight.yaml
└── [your-custom-feeds].yaml

src/content/home/index.yaml
├── sectionOrdering: [..., 'youtubefeed', ...]
└── youtubeFeedSection: trending-content
```

### Component Integration
- Component: `src/components/YouTubeFeed.astro`
- Configuration: `keystatic.config.ts`
- Content Schema: `src/content/config.ts`
- Homepage Logic: `src/pages/index.astro`

### RSS Feed Integration
- Uses YouTube RSS feeds: `https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`
- Automatic video sorting by publish date
- Thumbnail generation from video IDs
- Channel title extraction

## Styling Options

### Display Modes
- **Grid Layout**: Responsive grid with hover effects
- **Horizontal Scroll**: Touch-friendly swipe interface

### Visual Features
- **Red Border**: Active playing videos
- **Hover Effects**: Scale and shadow on card hover
- **Responsive Design**: Mobile-optimized layouts
- **Loading States**: Graceful fallbacks for failed loads

## Troubleshooting

### Common Issues

1. **Videos Not Loading**:
   - Check channel IDs are correct
   - Ensure channels have RSS feeds enabled
   - Verify network connectivity

2. **Wrong Videos Showing**:
   - Double-check channel ID format
   - Some channels may have restricted RSS access

3. **Multiple Videos Playing**:
   - This should be resolved with the new video management system
   - Check browser console for JavaScript errors

4. **Layout Issues**:
   - Check `defaultView` setting (grid vs swipe)
   - Verify responsive CSS is loading

### Debug Mode
- Open browser dev tools
- Check console for RSS fetch logs
- Monitor network tab for failed requests
- Verify video management script execution

## Best Practices

1. **Channel Selection**: Choose active channels with regular uploads
2. **Video Limits**: Balance content richness with page load speed
3. **Section Organization**: Group related content types together
4. **Description Text**: Keep section descriptions concise and clear
5. **Mobile Testing**: Test swipe functionality on mobile devices

## Future Enhancements

Potential improvements:
- Playlist support beyond channel feeds
- Video filtering by keywords/topics
- Custom thumbnail overlays
- Social sharing integration
- Video favorites/bookmarking
- Advanced sorting options (views, duration, etc.)

---

This CMS integration provides a powerful, flexible way to manage YouTube content on your site while maintaining the enhanced ad-free viewing experience.
