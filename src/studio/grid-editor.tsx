import imageUrlBuilder from '@sanity/image-url'
import { Button, Card, Flex, Select, Stack, Text, TextInput } from '@sanity/ui'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PatchEvent, set, useClient } from 'sanity'

interface GridItem {
  _key: string
  _type: string
  project?: { _ref: string; _type: 'reference' }
  featured?: boolean
  columnStart: number
  columnSpan: number
  rowStart?: number
  rowSpan: number
}

interface SanityProject {
  _id: string
  title: string
  thumbnail?: { asset: { _ref: string } }
}

const COLS = 6
const MAX_ROWS = 3
const BASE_ROW_H = 56
const FEATURED_ROW_H = Math.round(BASE_ROW_H * 1.4)

export function GridEditorInput({ value, onChange, readOnly }: any) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [projects, setProjects] = useState<SanityProject[]>([])
  const builder = useMemo(() => imageUrlBuilder(client), [client])

  const items: GridItem[] = value ?? []

  useEffect(() => {
    client
      .fetch<SanityProject[]>(
        `*[_type == "project"] | order(order asc) { _id, title, thumbnail }`
      )
      .then(setProjects)
      .catch(console.error)
  }, [client])

  const push = useCallback(
    (next: GridItem[]) => onChange(PatchEvent.from(set(next))),
    [onChange]
  )

  const handleAdd = useCallback(() => {
    push([
      ...items,
      {
        _key: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        _type: 'gridItem',
        featured: false,
        columnStart: 1,
        columnSpan: 1,
        rowSpan: 1,
      },
    ])
  }, [items, push])

  const handleRemove = useCallback(
    (key: string) => push(items.filter(i => i._key !== key)),
    [items, push]
  )

  const handleField = useCallback(
    (key: string, field: string, val: unknown) =>
      push(items.map(i => (i._key === key ? { ...i, [field]: val } : i))),
    [items, push]
  )

  return (
    <Stack space={4}>
      {/* ── Visual Preview ── */}
      <Card tone="transparent" border padding={3} radius={2}>
        <Text size={0} muted style={{ display: 'block', marginBottom: 8 }}>
          Grid preview — {COLS} columns × {MAX_ROWS} rows max
        </Text>
        <div
          style={{
            background: '#111',
            borderRadius: 4,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `${FEATURED_ROW_H}px ${BASE_ROW_H}px ${BASE_ROW_H}px`,
            padding: 6,
            rowGap: 3,
          }}
        >
          {items.map((item, i) => {
            const proj = projects.find(p => p._id === item.project?._ref)
            const thumbUrl = proj?.thumbnail
              ? builder.image(proj.thumbnail).width(240).url()
              : null
            const isFeatured = i === 0
            const colSpan = isFeatured ? 2 : 1
            return (
              <div
                key={item._key}
                title={proj?.title ?? '—'}
                style={{
                  alignSelf: isFeatured ? 'stretch' : 'start',
                  background: thumbUrl
                    ? `url(${thumbUrl}) center/cover no-repeat`
                    : '#2a2a2a',
                  borderRadius: 2,
                  gridColumn: `${item.columnStart ?? 1} / span ${colSpan}`,
                  gridRow: `${item.rowStart ?? 'auto'} / span 1`,
                  height: isFeatured ? undefined : BASE_ROW_H,
                  outline: isFeatured ? '2px solid #f5a623' : undefined,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {!thumbUrl && (
                  <div
                    style={{
                      alignItems: 'center',
                      color: '#555',
                      display: 'flex',
                      fontSize: 10,
                      height: '100%',
                      justifyContent: 'center',
                      padding: 4,
                      textAlign: 'center',
                    }}
                  >
                    {proj?.title ?? '—'}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* ── Item Controls ── */}
      {items.map((item, i) => (
        <Card key={item._key} border padding={3} radius={2}>
          <Stack space={3}>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={2}>
                <Text size={1} weight="semibold">
                  Item {i + 1}
                </Text>
                {i === 0 && (
                  <Text size={0} style={{ color: '#f5a623' }}>
                    ★ Featured
                  </Text>
                )}
              </Flex>
              {!readOnly && (
                <Button
                  mode="ghost"
                  tone="critical"
                  padding={1}
                  fontSize={1}
                  text="Remove"
                  onClick={() => handleRemove(item._key)}
                />
              )}
            </Flex>

            <Stack space={2}>
              <Text size={1} muted>
                Project
              </Text>
              <Select
                value={item.project?._ref ?? ''}
                disabled={readOnly}
                onChange={e => {
                  const ref = (e.target as HTMLSelectElement).value
                  handleField(
                    item._key,
                    'project',
                    ref ? { _ref: ref, _type: 'reference' } : undefined
                  )
                }}
              >
                <option value="">— Select project —</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </Select>
            </Stack>

            {/* Featured indicator — always item 1 */}
            {i === 0 && (
              <Text size={1} muted>Featured (hero) — always item 1. Configurable column span below.</Text>
            )}

            <Flex gap={3} wrap="wrap">
              {i === 0 && (
                <Text size={1} muted style={{ paddingTop: 6, opacity: 0.5 }}>
                  Column 1 · Row 1 · Span 2 (fixed)
                </Text>
              )}
              {i !== 0 && (
                <>
                  <Stack space={2} style={{ flex: 1, minWidth: 80 }}>
                    <Text size={1} muted>
                      Column start (1–6)
                    </Text>
                    <TextInput
                      type="number"
                      value={String(item.columnStart ?? 1)}
                      min={1}
                      max={6}
                      disabled={readOnly}
                      onChange={e =>
                        handleField(
                          item._key,
                          'columnStart',
                          Number((e.target as HTMLInputElement).value)
                        )
                      }
                    />
                  </Stack>
                  <Stack space={2} style={{ flex: 1, minWidth: 80 }}>
                    <Text size={1} muted>
                      Row start (1–{MAX_ROWS})
                    </Text>
                    <TextInput
                      type="number"
                      value={String(item.rowStart ?? '')}
                      placeholder="auto"
                      min={1}
                      max={MAX_ROWS}
                      disabled={readOnly}
                      onChange={e =>
                        handleField(
                          item._key,
                          'rowStart',
                          Number((e.target as HTMLInputElement).value) || undefined
                        )
                      }
                    />
                  </Stack>
                </>
              )}
              {i !== 0 && (
                <Stack space={2} style={{ flex: 1, minWidth: 160 }}>
                  <Text size={1} muted>
                    Size
                  </Text>
                  <Text size={1} style={{ paddingTop: 6, opacity: 0.5 }}>
                    1 col × 1 row
                  </Text>
                </Stack>
              )}
            </Flex>
          </Stack>
        </Card>
      ))}

      {!readOnly && (
        <Button
          mode="ghost"
          tone="primary"
          text="+ Add grid item"
          onClick={handleAdd}
        />
      )}
    </Stack>
  )
}
