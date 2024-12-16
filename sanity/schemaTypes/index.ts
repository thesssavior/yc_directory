import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { startup } from './startup'
import { classes } from './classes'
import { playlist } from './playlist'
import { lesson } from './lesson'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, classes, playlist, lesson],
}
