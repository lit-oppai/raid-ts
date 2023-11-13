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
                '@': fileURLToPath(new URL('src', import.meta.url)),
            },
        },
        build: {
            outDir: "build/sysroot/usr/share/casaos/www/modules/icewhale_raid",
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
            }
        },
    })
}
