import { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { IntentLink } from 'sanity/router'
import { Box, Card, Flex, Grid, Heading, Stack, Text, Spinner } from '@sanity/ui'
import { CogIcon, UserIcon, ImagesIcon, AddIcon, StarFilledIcon, EditIcon } from '@sanity/icons'

interface Stats {
  total: number
  featured: number
}

interface RecentProject {
  _id: string
  title: string
  _updatedAt: string
}

export function Dashboard() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<RecentProject[]>([])
  const [siteTitle, setSiteTitle] = useState<string>('')

  useEffect(() => {
    client
      .fetch<{ stats: Stats; recent: RecentProject[]; siteTitle: string }>(`{
        "stats": {
          "total":    count(*[_type == "project"]),
          "featured": count(*[_type == "project" && featured == true])
        },
        "recent": *[_type == "project"] | order(_updatedAt desc) [0...5] {
          _id, title, _updatedAt
        },
        "siteTitle": *[_type == "siteSettings"][0].siteTitle
      }`)
      .then(({ stats, recent, siteTitle }) => {
        setStats(stats)
        setRecent(recent)
        setSiteTitle(siteTitle ?? '')
      })
  }, [client])

  return (
    <Box padding={5} style={{ maxWidth: 860, margin: '0 auto' }}>
      <Stack space={6}>

        {/* Header */}
        <Stack space={2}>
          <Heading size={4}>{siteTitle || 'Studio'}</Heading>
          <Text size={2} muted>Welcome back. Here's an overview of your content.</Text>
        </Stack>

        {/* Stats */}
        <Grid columns={3} gap={3}>
          <Card padding={4} radius={2} shadow={1} tone="default">
            <Stack space={3}>
              <Text size={1} muted>Total projects</Text>
              <Heading size={5}>{stats ? String(stats.total) : <Spinner />}</Heading>
            </Stack>
          </Card>
          <Card padding={4} radius={2} shadow={1} tone="default">
            <Flex align="center" gap={2}>
              <Text size={2}><StarFilledIcon /></Text>
              <Stack space={3}>
                <Text size={1} muted>Featured</Text>
                <Heading size={5}>{stats ? String(stats.featured) : <Spinner />}</Heading>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1} tone="default">
            <Stack space={3}>
              <Text size={1} muted>Non-featured</Text>
              <Heading size={5}>{stats ? String(stats.total - stats.featured) : <Spinner />}</Heading>
            </Stack>
          </Card>
        </Grid>

        {/* Quick links */}
        <Stack space={3}>
          <Text size={1} weight="semibold" muted style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Quick access
          </Text>
          <Grid columns={3} gap={3}>
            <IntentLink intent="edit" params={{ id: 'siteSettings', type: 'siteSettings' }} style={{ textDecoration: 'none' }}>
              <Card padding={4} radius={2} shadow={1} tone="default" style={{ cursor: 'pointer', height: '100%' }}>
                <Flex align="center" gap={3}>
                  <Text size={3}><CogIcon /></Text>
                  <Stack space={2}>
                    <Text size={2} weight="semibold">Site Settings</Text>
                    <Text size={1} muted>Title, favicon, SEO</Text>
                  </Stack>
                </Flex>
              </Card>
            </IntentLink>

            <IntentLink intent="edit" params={{ id: 'about', type: 'about' }} style={{ textDecoration: 'none' }}>
              <Card padding={4} radius={2} shadow={1} tone="default" style={{ cursor: 'pointer', height: '100%' }}>
                <Flex align="center" gap={3}>
                  <Text size={3}><UserIcon /></Text>
                  <Stack space={2}>
                    <Text size={2} weight="semibold">About</Text>
                    <Text size={1} muted>Bio, brands, recognitions</Text>
                  </Stack>
                </Flex>
              </Card>
            </IntentLink>

            <IntentLink intent="create" params={{ type: 'project' }} style={{ textDecoration: 'none' }}>
              <Card padding={4} radius={2} shadow={1} tone="primary" style={{ cursor: 'pointer', height: '100%' }}>
                <Flex align="center" gap={3}>
                  <Text size={3}><AddIcon /></Text>
                  <Stack space={2}>
                    <Text size={2} weight="semibold">New project</Text>
                    <Text size={1} muted>Add a work item</Text>
                  </Stack>
                </Flex>
              </Card>
            </IntentLink>
          </Grid>
        </Stack>

        {/* Recent projects */}
        <Stack space={3}>
          <Text size={1} weight="semibold" muted style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recently updated
          </Text>
          <Card radius={2} shadow={1}>
            {recent.length === 0 && (
              <Box padding={4}>
                <Text size={1} muted>No projects yet.</Text>
              </Box>
            )}
            {recent.map((p, i) => (
              <IntentLink
                key={p._id}
                intent="edit"
                params={{ id: p._id, type: 'project' }}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Card
                  padding={4}
                  borderTop={i > 0}
                  style={{ cursor: 'pointer' }}
                >
                  <Flex align="center" justify="space-between">
                    <Flex align="center" gap={3}>
                      <Text size={2} muted><ImagesIcon /></Text>
                      <Text size={2}>{p.title}</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Text size={1} muted>
                        {new Date(p._updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Text>
                      <Text size={1} muted><EditIcon /></Text>
                    </Flex>
                  </Flex>
                </Card>
              </IntentLink>
            ))}
          </Card>
        </Stack>

      </Stack>
    </Box>
  )
}
