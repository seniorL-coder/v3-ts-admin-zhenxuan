import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import tailwindcss from '@tailwindcss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import ElementPlus from 'unplugin-element-plus/vite'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
//
// const cesiumSource = 'node_modules/cesium/Build/Cesium'

// const cesiumBaseUrl = 'cesiumStatic'

// https://vite.dev/config/
export default defineConfig({
  // define: {
  //   CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
  // },
  plugins: [
    vue(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: `${cesiumSource}/Assets`,
    //       dest: cesiumBaseUrl,
    //     },
    //     {
    //       src: `${cesiumSource}/Widgets`,
    //       dest: cesiumBaseUrl,
    //     },
    //     {
    //       src: `${cesiumSource}/Workers`,
    //       dest: cesiumBaseUrl,
    //     },
    //     {
    //       src: `${cesiumSource}/ThirdParty`,
    //       dest: cesiumBaseUrl,
    //     },
    //   ],
    // }),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    ElementPlus({
      useSource: true,
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [fileURLToPath(new URL('src/assets/icons', import.meta.url))],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port:8888,
    proxy: {
      '/dev-api': {
        target: 'http://117.72.157.194:10086/admin/acl',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    },
  },
})
