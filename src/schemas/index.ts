export { project }            from './project';
export { siteSettings }       from './site-settings';
export { about }              from './about';
export { homeList }           from './home-list';
export { imageBlock }         from './image-block';
export { textImageBlock }     from './text-image-block';
export { textSection }        from './text-section';
export { videoSection }       from './video-section';
export { logoWallSection }    from './logo-wall-section';

import type { SchemaTypeDefinition } from 'sanity';
import { project }            from './project';
import { siteSettings }       from './site-settings';
import { about }              from './about';
import { homeList }           from './home-list';
import { imageBlock }         from './image-block';
import { textImageBlock }     from './text-image-block';
import { textSection }        from './text-section';
import { videoSection }       from './video-section';
import { logoWallSection }    from './logo-wall-section';

export const schemaTypes = [
  project,
  siteSettings,
  about,
  homeList,
  imageBlock,
  textImageBlock,
  textSection,
  videoSection,
  logoWallSection,
] as SchemaTypeDefinition[];
