import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [vue()],
        resolve: {
            alias: {
                '@assets': fileURLToPath(new URL('src/assets', import.meta.url)),
                '@components': fileURLToPath(new URL('src/components', import.meta.url)),
                '@network': fileURLToPath(new URL('src/network', import.meta.url)),
                '@views': fileURLToPath(new URL('src/views', import.meta.url)),
                '@pages': fileURLToPath(new URL('src/pages', import.meta.url)),
                '@style': fileURLToPath(new URL('src/style', import.meta.url)),
                '@utils': fileURLToPath(new URL('src/utils', import.meta.url)),
                '@': fileURLToPath(new URL('src', import.meta.url)),
            },
        },
        base: "./",
        build: {
            outDir: "build/sysroot/usr/share/casaos/www/modules/icewhale_settings",
        },
        server: {
            open: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With,Content-Type,language",
                "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
            },
            proxy: {
                "^/v2/message_bus/socket.io/.*": {
                    target: `ws://${process.env.VITE_OPEN_API_DEV_IP}:${process.env.VITE_OPEN_API_DEV_PORT}`,
                    changeOrigin: true,
                    ws: true,
                },
                "^/v[1-9]/.*": {
                    target: `http://${process.env.VITE_OPEN_API_DEV_IP}:${process.env.VITE_OPEN_API_DEV_PORT}`,
                    changeOrigin: true,
                },
                "^/assets": {
                    target: `http://${process.env.VITE_OPEN_API_DEV_IP}:${process.env.VITE_OPEN_API_DEV_PORT}`,
                    changeOrigin: true,
                },
                "^/login": {
                    rewrite: (path) => {
                        console.log(path.replace(/^\/login/, '/'))
                        return path.replace(/^\/login/, '/')
                    },
                    target: `http://${process.env.VITE_OPEN_API_DEV_IP}:${process.env.VITE_OPEN_API_DEV_PORT}`,
                    changeOrigin: true,
                },
            }
        },
    })
}
