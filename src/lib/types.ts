export interface SanityImage {
  asset: { _ref: string; _type: string };
  alt?: string;
}

export interface PortableTextSpan {
  _type: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children?: PortableTextSpan[];
}

export type SectionWidth = 'narrow' | 'normal' | 'wide' | 'full';
export type SectionPosition = 'left' | 'off-left-centre' | 'centre' | 'off-right-centre' | 'right';

export interface TextSectionData {
  _type: 'textSection';
  _key: string;
  text?: PortableTextBlock[];
  width?: SectionWidth;
  position?: SectionPosition;
}

export interface ImageBlockData {
  _type: 'imageBlock';
  _key: string;
  image?: SanityImage;
  width?: SectionWidth;
  position?: SectionPosition;
  caption?: string;
}

export interface TextImageBlockData {
  _type: 'textImageBlock';
  _key: string;
  text?: PortableTextBlock[];
  image?: SanityImage;
  imagePosition?: 'left' | 'right';
  imageSize?: 'one-third' | 'half' | 'two-thirds';
}

export interface VideoSectionData {
  _type: 'videoSection';
  _key: string;
  url?: string;
  aspectRatio?: string;
  caption?: string;
}

export interface Logo {
  src: string;
  alt: string;
  href?: string;
}

export interface LogoWallSectionData {
  _type: 'logoWallSection';
  _key: string;
  heading?: string;
  logos?: Logo[];
}

export type Section =
  | TextSectionData
  | ImageBlockData
  | TextImageBlockData
  | VideoSectionData
  | LogoWallSectionData;

export type PortableTextItem = PortableTextBlock | ImageBlockData | TextImageBlockData;

export interface ProjectSummary {
  _id: string;
  title: string;
  slug: string;
  role?: string;
  tags?: string[];
  thumbnail?: SanityImage;
  featured?: boolean;
}

export interface ProjectDetail extends ProjectSummary {
  description?: string;
  released?: string;
  duration?: string;
  genre?: string;
  infoImage?: SanityImage;
  videoUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImageUrl?: string;
  sections: Section[];
}

export interface NextProjectRef {
  _id: string;
  title: string;
  slug: string;
  tags?: string[];
  thumbnail?: SanityImage;
}

export interface SiteSettings {
  siteTitle?: string;
  role?: string;
  location?: string;
  showreelUrl?: string;
  socialLinks?: { platform?: string; url?: string }[];
  seoDescription?: string;
  faviconUrl?: string;
  ogImageUrl?: string;
}

export interface HomeListItem {
  _key: string;
  project?: { _id: string; title: string; slug: string; tags?: string[]; thumbnail?: SanityImage };
}

export interface HomeList {
  items: HomeListItem[];
}

export interface AboutBrand {
  text?: string;
  image?: SanityImage;
  link?: string;
}

export interface AboutRecognition {
  title?: string;
  url?: string;
}

export interface About {
  bio?: PortableTextBlock[];
  photo?: SanityImage;
  skills?: string[];
  cvUrl?: string;
  brands?: AboutBrand[];
  recognitions?: AboutRecognition[];
  metaTitle?: string;
  metaDescription?: string;
  metaImageUrl?: string;
}
