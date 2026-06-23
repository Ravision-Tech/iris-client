/* eslint-disable */
export interface Property {
  id: number;
  name: string;
  /**
   * Used in URLs to identify this property's site (e.g. /acme).
   */
  slug: string;
  /**
   * Optional custom domain for this property (for domain-based routing).
   */
  domain?: string | null;
  /**
   * If enabled, this property's published pages are publicly readable without login.
   */
  allowPublicRead?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

export interface Page {
  id: number;
  property?: (number | null) | Property;
  title: string;
  /**
   * URL path for this page within the property's site (e.g. 'about').
   */
  slug: string;
  /**
   * Change the page by editing the content that appears on it.
   */
  content?:
    | (
        | {
            heading: string;
            subheading?: string | null;
            backgroundImage?: (number | null) | Media;
            cta?: {
              label?: string | null;
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'hero';
          }
        | {
            heading?: string | null;
            content?: {
              root: {
                type: string;
                children: {
                  type: any;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            media?: (number | null) | Media;
            mediaPosition?: ('right' | 'left') | null;
            link?: {
              label?: string | null;
              url?: string | null;
              newTab?: boolean | null;
              style?: ('primary' | 'secondary' | 'text') | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaText';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            columns?: ('2' | '3' | '4') | null;
            items?:
              | {
                  icon?: (number | null) | Media;
                  title: string;
                  description?: string | null;
                  /**
                   * Optional link for this feature.
                   */
                  link?: {
                    label?: string | null;
                    url?: string | null;
                    newTab?: boolean | null;
                    style?: ('primary' | 'secondary' | 'text') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'featureGrid';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            items?:
              | {
                  /**
                   * e.g. "10k+", "98%", "$2M"
                   */
                  value: string;
                  label: string;
                  description?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'stats';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            items?:
              | {
                  title: string;
                  description?: string | null;
                  icon?: (number | null) | Media;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'steps';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            items?:
              | {
                  quote: string;
                  authorName: string;
                  /**
                   * Role and/or company.
                   */
                  authorTitle?: string | null;
                  avatar?: (number | null) | Media;
                  /**
                   * Optional 1–5 star rating.
                   */
                  rating?: number | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'testimonials';
          }
        | {
            /**
             * e.g. "Trusted by teams at"
             */
            heading?: string | null;
            logos?:
              | {
                  image: number | Media;
                  /**
                   * Used as alt text.
                   */
                  name?: string | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'logoCloud';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            tiers?:
              | {
                  name: string;
                  /**
                   * e.g. "$29", "Free", "Contact us"
                   */
                  price: string;
                  /**
                   * e.g. "/month", "/year"
                   */
                  period?: string | null;
                  description?: string | null;
                  features?:
                    | {
                        feature: string;
                        id?: string | null;
                      }[]
                    | null;
                  /**
                   * Button for this tier.
                   */
                  link?: {
                    label?: string | null;
                    url?: string | null;
                    newTab?: boolean | null;
                    style?: ('primary' | 'secondary' | 'text') | null;
                  };
                  highlighted?: boolean | null;
                  /**
                   * Optional ribbon, e.g. "Most popular".
                   */
                  badge?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'pricing';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            items?:
              | {
                  question: string;
                  answer: {
                    root: {
                      type: string;
                      children: {
                        type: any;
                        version: number;
                        [k: string]: unknown;
                      }[];
                      direction: ('ltr' | 'rtl') | null;
                      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                      indent: number;
                      version: number;
                    };
                    [k: string]: unknown;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'faq';
          }
        | {
            heading?: string | null;
            layout?: ('grid' | 'masonry' | 'carousel') | null;
            images?:
              | {
                  image: number | Media;
                  caption?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'gallery';
          }
        | {
            heading?: string | null;
            /**
             * YouTube or Vimeo URL. Leave blank to use an uploaded file.
             */
            url?: string | null;
            /**
             * Optional self-hosted video file.
             */
            file?: (number | null) | Media;
            /**
             * Optional thumbnail/poster image.
             */
            poster?: (number | null) | Media;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'video';
          }
        | {
            items?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            speed?: ('slow' | 'medium' | 'fast') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'marquee';
          }
        | {
            heading?: string | null;
            subheading?: string | null;
            members?:
              | {
                  photo?: (number | null) | Media;
                  name: string;
                  role?: string | null;
                  bio?: string | null;
                  socials?:
                    | {
                        platform?:
                          | (
                              | 'instagram'
                              | 'linkedin'
                              | 'twitter'
                              | 'facebook'
                              | 'youtube'
                              | 'github'
                              | 'tiktok'
                              | 'website'
                            )
                          | null;
                        url: string;
                        id?: string | null;
                      }[]
                    | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'team';
          }
        | {
            heading?: string | null;
            text?: string | null;
            email?: string | null;
            phone?: string | null;
            address?: string | null;
            /**
             * Optional Google Maps embed URL.
             */
            mapEmbedUrl?: string | null;
            showForm?: boolean | null;
            socials?:
              | {
                  platform?:
                    | ('instagram' | 'linkedin' | 'twitter' | 'facebook' | 'youtube' | 'github' | 'tiktok' | 'website')
                    | null;
                  url: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'contact';
          }
        | {
            heading: string;
            text?: string | null;
            backgroundImage?: (number | null) | Media;
            buttons?:
              | {
                  label?: string | null;
                  url?: string | null;
                  newTab?: boolean | null;
                  style?: ('primary' | 'secondary' | 'text') | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
        | {
            content: {
              root: {
                type: string;
                children: {
                  type: any;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'richText';
          }
        | {
            image: number | Media;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'image';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface Media {
  id: number;
  property?: (number | null) | Property;
  /**
   * Describe the image for accessibility and SEO.
   */
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    hero?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
