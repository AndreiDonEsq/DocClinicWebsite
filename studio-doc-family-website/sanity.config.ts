import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { hashPasswordAction } from './actions/hashPasswordAction'

export default defineConfig({
  name: 'default',
  title: 'doc-family-website',

  projectId: 'vkpod0nw',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // For the 'adminUser' type, replace the default publish action with our custom one
      if (context.schemaType === 'adminUser') {
        return prev.map((action) =>
          action.action === 'publish' ? hashPasswordAction : action
        )
      }
      return prev
    },
  },
})
