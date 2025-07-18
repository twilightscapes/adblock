import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const postSchema = z.object({
  title: z.string(),
  description: z.string().min(50).max(160),
  publishDate: z.string().or(z.date()).transform((val) => new Date(val)),
  coverImage: z.object({
    src: z.string().optional(),
    alt: z.string().default(""),
  }).optional(),
  tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
  draft: z.boolean().default(false),
  order: z.object({
    discriminant: z.boolean(),
    value: z.number().optional(),
  }).optional(),
  externalUrl: z.string().optional(),
  youtube: z.object({
    discriminant: z.boolean(),
    value: z.object({
      url: z.string().optional(),
      title: z.string().optional(),
      controls: z.boolean().optional(),
      useCustomPlayer: z.boolean().optional(),
      mute: z.boolean().optional(),
      loop: z.boolean().optional(),
      start: z.number().optional(),
      end: z.number().optional(),
      videoOnly: z.boolean().optional(),
    }).optional()
  }).optional(),
});

const contactPage = defineCollection({
  type: 'data',
  schema: z.object({
    content: z.string().optional(),
    showName: z.boolean().optional(),
    showPhone: z.boolean().optional(),
    showMessage: z.boolean().optional(),
    showUpload: z.boolean().optional(),
    extraFieldLabel: z.string().optional(),
    showExtraField: z.boolean().optional(),
    showMap: z.boolean().optional(),
    extraFieldLabel2: z.string().optional(),
    showExtraField2: z.boolean().optional(),
  }),
});

export const collections = {
  // Post collection
  post: defineCollection({
    type: 'content',
    schema: postSchema,
  }),

  // Contact Page collection  
  contactPage,

  // Home collection
  home: defineCollection({
    type: 'data',
    schema: z.object({
      sectionOrdering: z.array(z.object({
        sectionType: z.string(),
        customTitle: z.string().optional(),
        customDescription: z.string().optional(),
        showTitle: z.boolean().optional(),
      })).optional(),
      featureImage: z.object({
        src: z.string().optional(),
        alt: z.string().optional(),
        height: z.number().optional(),
        width: z.number().optional(),
      }).optional(),
      youtube: z.object({
        value: z.object({
          url: z.string().optional(),
          title: z.string().optional(),
          controls: z.boolean().optional(),
          useCustomPlayer: z.boolean().optional(),
          mute: z.boolean().optional(),
          loop: z.boolean().optional(),
          start: z.number().optional(),
          end: z.number().optional(),
          videoOnly: z.boolean().optional(),
        }).optional()
      }).optional(),
      photosectiontitle: z.string().optional(),
      locationtitle: z.string().optional(),
      faqsectiontitle: z.string().optional(),
      testimonialtitle: z.string().optional(),
      postsectiontitle: z.string().optional(),
      pitch: z.string().optional(),
      pitch2: z.string().optional(),
      pitch3: z.string().optional(),
      cta: z.string().optional(),
      showMore: z.boolean().optional()
    })
  }),



  // StyleApps collection
  styleapps: defineCollection({
    type: 'data',
    schema: z.object({
      backgroundImage: z.string().optional(),
      backgroundVideo: z.string().optional(),
      siteFont: z.string().optional(),
      borderRadius: z.string().optional(),
      lightBg: z.string().optional(),
      lightAccent2: z.string().optional(),
      darkBg: z.string().optional(),
      darkAccent2: z.string().optional(),
      lightHeader: z.string().optional(),
      darkHeader: z.string().optional(),
      lightText: z.string().optional(),
      darkText: z.string().optional(),
      customCSS: z.string().optional()
    })
  }),

  pages: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      layout: z.string().optional(),
      draft: z.boolean().optional(),
    }),
  }),

  pitches: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string().optional(),
      showTwocol: z.boolean().optional(),
      showTitle: z.boolean().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      description: z.string().optional(),
      tagline: z.string().optional(),
      subheading1: z.string().optional(),
      text1: z.string().optional(),
      subheading2: z.string().optional(),
      text2: z.string().optional(),
      subheading3: z.string().optional(),
      text3: z.string().optional(),
    }),
  }),

  faqs: defineCollection({
    type: 'content',
    schema: z.object({
      question: z.string().optional(),
      answer: z.string().optional(),
      order: z.number().optional(),
    }),
  }),

  resume: defineCollection({
    type: 'content',
    schema: z.object({
      section: z.string().optional(),
      showTitle: z.boolean().optional(),
      content: z.string().optional(),
    }),
  }),

  testimonials: defineCollection({
    type: 'data',
    schema: z.object({
      name: z.string().optional(),
      location: z.string().optional(),
      quote: z.string().optional(),
      image: z.string().optional(),
      order: z.number().optional(),
    }),
  }),

  menuItems: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string().optional(),
      path: z.string().optional(),
      order: z.number().optional(),
    }),
  }),







  socialLinks: defineCollection({
    type: 'data',
    schema: z.object({
      friendlyName: z.string().optional(),
      link: z.string().optional(),
      icon: z.string().optional(),
      isWebmention: z.boolean().optional(),
      order: z.any().transform(val => 
        (val === '.nan' || val === 'nan' || Number.isNaN(val)) ? undefined : Number(val)
      ).optional()
    }),
  }),

  siteSettings: defineCollection({
    type: 'data',
    schema: z.object({
      logoImage: z.string().optional(),
      showHeader: z.boolean().optional(),
      showLogo: z.boolean().optional(),
      showCheck: z.boolean().optional(),
      showHome: z.boolean().optional(),
      showTheme: z.boolean().optional(),
      showSwitch: z.boolean().optional(),
      showSearch: z.boolean().optional(),
      showFooter: z.boolean().optional(),
      defaultView: z.enum(['grid', 'swipe']).optional(),
      themeMode: z.enum(['light', 'dark', 'user']).optional(),
      showTitles: z.boolean().optional(),
      showDates: z.boolean().optional(),
      enableImageBlur: z.boolean().optional(),
      showTags: z.boolean().optional(),
      showSocial: z.boolean().optional(),
      MAX_POSTS: z.number().optional(),
      MAX_POSTS_PER_PAGE: z.number().optional(),
      showShare: z.boolean().optional(),
      videoTimeLimitMinutes: z.number().min(-1).max(30).optional(),
    }),
  }),

  pwaSettings: defineCollection({
    type: 'data',
    schema: z.object({
      showRobots: z.boolean().optional(),
      siteUrl: z.string().optional(),
      name: z.string().optional(),
      shortName: z.string().optional(),
      screenshot: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      themeColor: z.string().optional(),
      backgroundColor: z.string().optional(),
      startUrl: z.string().optional(),
      display: z.enum(['standalone', 'fullscreen', 'minimal-ui', 'browser']).optional(),
      icon192: z.string().optional(),
      icon512: z.string().optional(),
      location: z.string().optional(),
    }),
  }),

  photoSettings: defineCollection({
    type: 'data',
    schema: z.object({
      galleryMode: z.enum(['directory', 'keystatic']).optional(),
      showCaptions: z.boolean().optional(),
      showBioOnPhotos: z.boolean().optional(),
      showFaqsOnPhotos: z.boolean().optional(),
      showTestimonialsOnPhotos: z.boolean().optional(),
      pitch: z.string().optional(),
      defaultDirectory: z.string().optional(),
      showGallerySelector: z.boolean().optional(),
      galleryImages: z.array(z.object({
        image: z.string().optional(),
        caption: z.string().optional(),
      })).optional(),
    }),
  }),

  language: defineCollection({
    type: 'data',
    schema: z.object({
      homelink: z.string().optional(),
      copyright: z.string().optional(),
      goback: z.string().optional(),
      top: z.string().optional(),
      viewmore: z.string().optional(),
      allimages: z.string().optional(),
      close: z.string().optional(),
      search: z.string().optional(),
      mute: z.string().optional(),
      volume: z.string().optional(),
      progress: z.string().optional(),
      tags: z.string().optional(),
      viewall: z.string().optional(),
      shareText: z.string().optional(),
      copyButton: z.string().optional(),
      siteDisclaimer: z.string().optional(),
    }),
  }),

  bio: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string().optional(),
      tagline: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      name: z.string().optional(),
      phone: z.string().optional(),
      subheading: z.string().optional(),
      subcontent: z.string().optional(),
      cta: z.string().optional(),
      showSocial: z.boolean().optional(),
    }),
  }),



  resumeSettings: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string().optional(),
      showTitle: z.boolean().optional(),
      name: z.string().optional(),
      contact: z.string().optional(),
      leftColumnItems: z.array(z.string()).optional(),
      rightColumnItems: z.array(z.string()).optional(),
    }),
  }),

  CTAs: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string().optional(),
      ctaUrl: z.string().optional(),
      description: z.string().optional(),
      showFancy: z.boolean().optional(),
      showTransition: z.boolean().optional()
    })
  }),

  youtubeFeeds: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      channelIds: z.array(z.string()),
      maxVideos: z.number().min(1).max(50).default(6),
      showTitles: z.boolean().default(true),
      useCustomPlayer: z.boolean().default(false),
      defaultView: z.enum(['grid', 'swipe']).default('grid')
    })
  }),
};

  // ctas: defineCollection({
  //   type: 'data',
  //   schema: z.object({
  //     title: z.string().optional(),
  //     ctaUrl: z.string().optional(),
  //     description: z.string().optional(),
  //     showFancy: z.boolean().optional(),
  //     showTransition: z.boolean().optional()
  //   })
  // });



export type PitchData = {
  slug: string;
  showTitle: boolean | null;
  tagline: string;
  text1: string;
  text2: string;
  text3: string;
  subheading1: string;
  subheading2: string;
  subheading3: string;
  image: string | null;
  imageAlt: string;
  description: string;
  title: string | null;
  divider: string | null;
  divider2: string | null;
};