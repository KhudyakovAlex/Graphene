/// <reference path="./examples/node_modules/vite/client.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module '*?raw' {
  const content: string
  export default content
}

declare module '../../assets/icons/close.svg?raw' {
  const content: string
  export default content
}
