import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: { 
    port: 3000, 
    host: true
  },
  // site: 'https://dlib.nyu.edu/indianocean',
  // base: '/indianocean',
  integrations: [compress(), mdx()],
})
