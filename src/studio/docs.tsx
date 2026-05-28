import { Box, Card, Flex, Heading, Stack, Text, Badge } from '@sanity/ui'

interface Section {
  title: string
  badge?: string
  badgeTone?: 'primary' | 'positive' | 'caution' | 'critical' | 'default'
  items: { label: string; description: string }[]
}

function DocSection({ title, badge, badgeTone = 'default', items }: Section) {
  return (
    <Stack space={3}>
      <Flex align="center" gap={3}>
        <Heading size={2}>{title}</Heading>
        {badge && <Badge tone={badgeTone} mode="outline">{badge}</Badge>}
      </Flex>
      <Card radius={2} shadow={1} overflow="hidden">
        {items.map(({ label, description }, i) => (
          <Card key={label} padding={4} borderTop={i > 0}>
            <Stack space={2}>
              <Text size={2} weight="semibold">{label}</Text>
              <Text size={1} muted style={{ lineHeight: 1.6 }}>{description}</Text>
            </Stack>
          </Card>
        ))}
      </Card>
    </Stack>
  )
}

export function Docs() {
  return (
    <Box padding={[3, 3, 5]} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Stack space={7}>

        <Stack space={2}>
          <Heading size={4}>Content Guide</Heading>
          <Text size={2} muted>Everything you need to know to maintain this site.</Text>
        </Stack>

        {/* Projects */}
        <DocSection
          title="Projects"
          badge="Core content"
          badgeTone="primary"
          items={[
            {
              label: 'Creating a project',
              description: 'Go to Projects in the sidebar → click the pencil icon top-right to create. Fill in Title (required) and Slug (auto-generated from title). Everything else is optional but recommended.',
            },
            {
              label: 'Thumbnail',
              description: 'Used in the home grid and work list. Recommended size: 1200×900px or 16:9 ratio. Upload via the Media Library (the image picker opens it directly). Always fill in Alt text for accessibility.',
            },
            {
              label: 'Video URL',
              description: 'Paste an embed URL — not a watch URL. YouTube: https://www.youtube.com/embed/VIDEO_ID — Vimeo: https://player.vimeo.com/video/VIDEO_ID. The video plays as the project hero.',
            },
            {
              label: 'Featured toggle',
              description: 'Featured projects appear in the home grid. Non-featured projects are still accessible via their URL but won\'t appear on the homepage unless added to the Home Grid manually.',
            },
            {
              label: 'Order',
              description: 'Controls the sort order in lists. Lower numbers appear first. Set this on every project to control the display sequence — projects without an order value fall to the bottom.',
            },
            {
              label: 'Project Info fields',
              description: 'Client, Year, Role, Released, Duration, Genre — these appear in the project detail sidebar. Fill in whichever are relevant; empty fields are hidden automatically.',
            },
            {
              label: 'Info Image',
              description: 'Optional secondary image shown in the project detail alongside the metadata. Use a still, behind-the-scenes photo, or a detail shot. Same size recommendations as the thumbnail.',
            },
          ]}
        />

        {/* Layout sections */}
        <DocSection
          title="Layout Sections"
          badge="Inside a project"
          badgeTone="caution"
          items={[
            {
              label: 'Text Section',
              description: 'A rich text block. Use it for project descriptions, director\'s notes, or any long-form copy. Supports bold, italic, and links.',
            },
            {
              label: 'Image',
              description: 'A single image. Choose from three sizes: Full Width, Two Thirds, or Half. Half and Two Thirds can be left, center, or right aligned. Add an optional caption below.',
            },
            {
              label: 'Text + Image',
              description: 'Side-by-side layout with rich text on one side and an image on the other. Choose image position (left or right) and width (One Third, Half, Two Thirds).',
            },
            {
              label: 'Video Section',
              description: 'Embeds a video inline within the project layout. Same embed URL format as the hero video field.',
            },
            {
              label: 'Logo Wall',
              description: 'A horizontal row of logos — useful for listing collaborators, brands, or press. Each logo can optionally link to an external URL.',
            },
            {
              label: 'Project Data',
              description: 'Displays a structured metadata block (Released, Duration, Client, Role) with an optional image. Use this as an alternative to the sidebar metadata for projects that need it in the main flow.',
            },
          ]}
        />

        {/* Home Grid */}
        <DocSection
          title="Home Grid"
          badge="Homepage"
          badgeTone="positive"
          items={[
            {
              label: 'What it controls',
              description: 'The Home Grid document defines exactly which projects appear on the homepage and in what order. It\'s independent of the Featured toggle — you have full control over what shows here.',
            },
            {
              label: 'Adding a project',
              description: 'Open Home Grid → click Add item → select a project. Drag to reorder. Remove an item to hide it from the homepage without deleting the project.',
            },
            {
              label: 'Tip',
              description: 'Keep the homepage grid curated — 6 to 12 items tends to work well. All projects remain accessible via their direct URL regardless of whether they appear here.',
            },
          ]}
        />

        {/* Site Settings */}
        <DocSection
          title="Site Settings"
          items={[
            {
              label: 'Site Title',
              description: 'Your name or studio name. Appears in the browser tab, the nav logo, and the loading screen on first visit.',
            },
            {
              label: 'Role & Location',
              description: 'Shown in the nav footer on the homepage and in the About page footer. Keep these short — one line each.',
            },
            {
              label: 'Showreel URL',
              description: 'Link to your primary showreel video. Used in any showreel button components.',
            },
            {
              label: 'Social Links',
              description: 'Add your social platforms and URLs. These appear in the About page footer. Platform name is displayed as the link label (e.g. "Instagram", "Vimeo", "LinkedIn").',
            },
            {
              label: 'SEO Description',
              description: 'The default meta description shown in Google results and social share cards for pages that don\'t have their own description. Aim for 120–155 characters.',
            },
            {
              label: 'Favicon',
              description: 'The small icon in the browser tab. Supported formats: SVG (recommended), PNG (min 512×512px), or ICO. Upload via the Media Library.',
            },
            {
              label: 'Default OG Image',
              description: 'The preview image shown when someone shares any page on social media (Twitter/X, LinkedIn, iMessage, Slack). Recommended size: 1200×630px JPG or PNG. Individual projects and the About page can override this with their own Social Image.',
            },
          ]}
        />

        {/* About */}
        <DocSection
          title="About Page"
          items={[
            {
              label: 'Bio',
              description: 'Rich text — your main biography or studio description. Supports bold, italic, and links. This is the primary text on the About page.',
            },
            {
              label: 'Brands',
              description: 'Logos of brands or clients you\'ve worked with. Each entry has a Name, Logo image, and an optional link. Upload logos as PNG with transparent background or SVG for best results.',
            },
            {
              label: 'Recognitions & Awards',
              description: 'A list of awards, press mentions, or festival selections. Each entry is a title with an optional link. These appear as a stacked list on the About page.',
            },
            {
              label: 'Social Image (SEO)',
              description: 'Overrides the default OG image specifically for the /about page when shared on social media. If left empty, the Default OG Image from Site Settings is used.',
            },
          ]}
        />

        {/* Media library */}
        <DocSection
          title="Media Library"
          badge="All image uploads"
          badgeTone="default"
          items={[
            {
              label: 'How to open it',
              description: 'Click "Media" in the left sidebar of the Studio. All uploaded images and files live here in one place.',
            },
            {
              label: 'Uploading assets',
              description: 'You can upload directly from the Media Library by dragging files in, or upload via any image picker field — the file is saved to the library automatically.',
            },
            {
              label: 'Organising with tags',
              description: 'Tags are the folder system. Use the Tags panel on the left to create tags (e.g. "Projects", "Branding", "Press", "Behind the scenes"). Select assets and assign tags to keep things organised.',
            },
            {
              label: 'Re-using assets',
              description: 'When picking an image on any field, the media library opens automatically — browse or search to re-use an asset you\'ve already uploaded instead of uploading duplicates.',
            },
            {
              label: 'Image format recommendations',
              description: 'Photos and project thumbnails: JPG, max 2MB. Logos and icons: SVG or PNG with transparency. OG / social images: JPG or PNG at exactly 1200×630px. Favicon: SVG preferred.',
            },
          ]}
        />

        {/* SEO */}
        <DocSection
          title="SEO per page"
          badge="Optional but recommended"
          badgeTone="caution"
          items={[
            {
              label: 'Where to set it',
              description: 'Each Project and the About page has an SEO tab with Meta Title, Meta Description, and Social Image fields. These override the site-wide defaults for that specific page.',
            },
            {
              label: 'Meta Title',
              description: 'The title shown in Google results and browser tabs for that page. If left empty, the project title is used automatically (e.g. "Project Name — Mai"). Keep under 60 characters.',
            },
            {
              label: 'Meta Description',
              description: 'The description snippet under the title in Google results. Maximum 160 characters — the Studio will warn you if you go over. Write a concise summary of the project.',
            },
            {
              label: 'Social Image',
              description: 'The preview image for that specific page when shared on social media. If left empty, the Default OG Image from Site Settings is used as a fallback.',
            },
          ]}
        />

      </Stack>
    </Box>
  )
}
