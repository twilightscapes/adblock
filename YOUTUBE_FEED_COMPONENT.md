# YouTubeFeed Component

The `YouTubeFeed` component fetches the latest videos from YouTube channels using their RSS feeds and displays them in a grid layout similar to your existing PostPreview component. Videos are fully compatible with your existing video management system.

## Features

- Fetches videos from multiple YouTube channels via RSS feeds
- Integrates seamlessly with existing YouTubeEmbed component
- Uses the same video management system as PostPreview (stops other videos when one plays)
- Responsive grid layout
- Shows video thumbnails, titles, channel names, and publish dates
- Supports custom player settings

## Basic Usage

```astro
---
import YouTubeFeed from '@/components/YouTubeFeed.astro';
---

<!-- Simple usage with default channels -->
<YouTubeFeed />

<!-- Single channel -->
<YouTubeFeed 
  channelId="UCBJycsmduvYEL83R_U4JriQ"
  maxVideos={6}
  title="Latest Tech Videos"
/>

<!-- Multiple channels -->
<YouTubeFeed 
  channelIds={[
    "UCBJycsmduvYEL83R_U4JriQ", // Marques Brownlee
    "UC6nSFpj9HTCZ5t-N3Rm3-HA", // Vsauce
    "UCsooa4yRKGN_zEE8iknghZA"  // TED-Ed
  ]}
  maxVideos={12}
  title="Latest Educational Videos"
  showTitles={true}
  useCustomPlayer={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `channelId` | `string` | - | Single YouTube channel ID (backward compatibility) |
| `channelIds` | `string[]` | `[]` | Array of YouTube channel IDs |
| `maxVideos` | `number` | `6` | Maximum number of videos to display |
| `title` | `string` | `"Latest YouTube Videos"` | Section title |
| `showTitles` | `boolean` | `true` | Show video titles and metadata |
| `useCustomPlayer` | `boolean` | `true` | Use custom YouTube player |

## Finding Channel IDs

To get a YouTube channel ID:

1. Go to the channel's page
2. View page source
3. Search for `"channelId":"` or `"externalId":"`
4. Or use the URL format: `youtube.com/channel/CHANNEL_ID`

Some popular channel IDs:
- **Marques Brownlee (MKBHD)**: `UCBJycsmduvYEL83R_U4JriQ`
- **Vsauce**: `UC6nSFpj9HTCZ5t-N3Rm3-HA`
- **TED-Ed**: `UCsooa4yRKGN_zEE8iknghZA`
- **Veritasium**: `UCHnyfMqiRRG1u-2MsSQLbXA`
- **3Blue1Brown**: `UCYO_jab_esuFRV4b17AJtAw`

## Adding to Homepage

The YouTube feed system now uses a dynamic configuration through Keystatic CMS. This allows you to add unlimited YouTube feed sections with their own custom titles and configurations.

### Using Keystatic CMS (Recommended)

1. **Create YouTube Feed Configurations**:
   - Go to Keystatic Admin → Content Modules → YouTube Feed Sections
   - Create new feed configurations with titles like "Trending Content", "Educational Videos", etc.
   - Add channel IDs, set video limits, and configure display options

2. **Add to Homepage**:
   - Go to Keystatic Admin → Site Pages → Home Page
   - Scroll to "YouTube Feed Sections"
   - Click "Add YouTube Feed Section"
   - Select your feed configuration from the dropdown
   - Optionally add a custom title to override the feed's title
   - Save and the section will appear on your homepage

### Benefits of the New System

- **Unlimited Sections**: Add as many YouTube feed sections as you want
- **Custom Titles**: Override feed titles for specific homepage sections
- **Easy Management**: All managed through Keystatic CMS interface
- **No Code Changes**: Add/remove sections without touching code

### Example Configuration

In Keystatic, your homepage YouTube Feed Sections might look like:

```yaml
youtubeFeedSections:
  - feedConfig: trending-content        # Uses "Trending Content" title
    customTitle: ''                     # No override
  - feedConfig: latest-videos          # Uses "Latest YouTube Videos" title  
    customTitle: 'Latest Tech Videos'   # Override with custom title
  - feedConfig: educational-content     # Uses "Educational Content" title
    customTitle: ''                     # No override
```

This gives you complete flexibility to organize your homepage exactly how you want it!

## Integration with Existing Video System

The component uses the same CSS classes as your PostPreview component:
- `.video-container` - Main container
- `.video-thumbnail` - Thumbnail image
- `.play-button` - Play button overlay
- `.youtube-embed` - Hidden embed container

This ensures:
- Videos stop when others start playing
- Smooth view transitions work
- Consistent styling with your existing videos
- All your existing video event handlers work automatically

## Styling

The component includes its own styling but respects your theme variables:
- Uses `--theme-accent` for channel names
- Responsive grid layout
- Hover effects and animations
- Mobile-optimized play buttons

## Error Handling

- Gracefully handles failed RSS requests
- Logs warnings for problematic channels
- Continues loading other channels if one fails
- Returns empty array if no videos found

## Performance Notes

- RSS feeds are fetched at build time (SSG)
- Videos are sorted by publish date across all channels
- Thumbnails use lazy loading
- Component is compatible with your existing video cleanup scripts

## Example: Educational Content Section

```astro
<YouTubeFeed 
  channelIds={[
    "UCsooa4yRKGN_zEE8iknghZA", // TED-Ed
    "UC6nSFpj9HTCZ5t-N3Rm3-HA", // Vsauce
    "UCYO_jab_esuFRV4b17AJtAw", // 3Blue1Brown
    "UCHnyfMqiRRG1u-2MsSQLbXA"  // Veritasium
  ]}
  maxVideos={10}
  title="Educational Content"
  showTitles={true}
  useCustomPlayer={true}
/>
```
