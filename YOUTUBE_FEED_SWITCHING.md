# YouTubeFeed - Updated with Grid/Swipe Support

The YouTubeFeed component now supports the same grid/swipe view switching as your other posts!

## Usage with View Switching

```astro
---
import YouTubeFeed from '@/components/YouTubeFeed.astro';
import { getEntry } from 'astro:content';

// Get the view mode from site settings
const siteSettings = await getEntry('siteSettings', 'main');
const { defaultView } = siteSettings?.data ?? { defaultView: 'grid' };
---

<YouTubeFeed 
  channelIds={["UCBJycsmduvYEL83R_U4JriQ"]}
  maxVideos={8}
  title="Latest Tech Videos"
  defaultView={defaultView}
/>
```

## Integration in index.astro

To add this to your homepage with the same switching behavior as your other posts:

```astro
---
// In your index.astro file, where you already have siteSettings loaded:
const { defaultView, MAX_POSTS } = siteSettings?.data ?? { defaultView: 'grid', MAX_POSTS: 5 };
---

<!-- Add the YouTubeFeed component -->
<section class="contentpanel" style="padding:2vh 3%">
  <YouTubeFeed 
    channelIds={[
      "UCBJycsmduvYEL83R_U4JriQ", // Marques Brownlee
      "UC6nSFpj9HTCZ5t-N3Rm3-HA", // Vsauce
    ]}
    maxVideos={6}
    title="Latest YouTube Videos"
    defaultView={defaultView}
    useCustomPlayer={false}
  />
</section>
```

## How it Works

The component now:

1. **Accepts `defaultView` prop**: Can be 'grid' or 'swipe'
2. **Uses same CSS classes**: 
   - Grid mode: `grid-container` class
   - Swipe mode: `slider panels horizontal-slider` classes
3. **Responsive**: Adapts to mobile with appropriate sizing
4. **Compatible with Switch**: Your existing switch component will toggle both regular posts and YouTube videos

## CSS Classes Applied

- **Grid Mode**: `.youtube-grid.grid-container`
  - Standard CSS Grid layout
  - Auto-fit columns with 300px minimum
  
- **Swipe Mode**: `.youtube-grid.slider.panels.horizontal-slider`
  - Horizontal scrolling
  - Scroll snap for smooth navigation
  - Hidden scrollbars
  - Fixed width cards (300px desktop, 280px mobile)

The component will now respond to your existing switch component and change between grid and swipe views just like your regular posts do!
