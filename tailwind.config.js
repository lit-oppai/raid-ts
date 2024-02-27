/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'roboto': ['Roboto'],
            },
            screens: {
                'max-sm': { 'max': '640px' },
                'max-md': { 'max': '768px' },
                'max-lg': { 'max': '1024px' },
                'max-xl': { 'max': '1280px' },
                'max-2xl': { 'max': '1536px' },
            },
            borderRadius: {
                '2lg': '0.625rem',
            },
            colors: {
                gray: {
                    // 背景灰色 2
                    50: 'rgba(247, 249, 250, 1)',
                    // 背景灰色 1
                    100: 'rgba(242, 244, 245, 1)',
                    200: 'rgba(192, 198, 204, 1)',
                    800: 'rgba(41, 52, 61, 1)',
                },
                // 灰色
                neutral: {
                    // 次要文字
                    400: 'rgba(144, 149, 153, 1)',
                },
                // 黑色
                zinc: {
                    // 三级灰色
                    50: 'rgba(238, 242, 245, 1)',
                    // 二级灰色
                    100: 'rgba(230, 234, 237, 1)',
                    // 一级灰色
                    200: 'rgba(223, 227, 230, 1)',
                    600: 'rgba(96, 99, 102, 1)',
                    800: 'rgba(48, 50, 51, 1)',
                },
                // 蓝色
                sky: {
                    500: 'rgba(15, 143, 255, 1)',
                    600: 'rgba(0, 122, 229, 1)',
                    700: 'rgba(0, 103, 194, 1)', // hover button
                },
                slate: {
                    50: 'rgba(244, 248, 252, 1)'
                },
                // yellow 
                tertiary: {
                    100: 'rgba(255, 244, 215, 1)',
                    300: 'rgba(212, 156, 2, 1)',
                },
                // 红色
                red: {
                    300: 'rgba(255, 184, 153, 1)', // 设计的颜色命名体系与 figma 的 tailwin 插件命名规则不互通，导致一个名称下的颜色并不相关。// 以 figma 插件提示为准
                    500: 'rgba(242, 98, 36, 1)',

                },
                // 橙色 default
                orange: {
                    500: 'rgba(242, 98, 36, 1)',
                },
                // 橙色
                amber: {
                    500: 'rgba(255, 149, 0, 1)',
                },
                // 浅红 rose
                rose: {
                    100: 'rgba(255, 234, 225, 1)',
                },
                // 紫色
                violet: {
                    500: 'rgba(135, 113, 244, 1)',
                },
                // 绿色 default
                green: {
                    400: 'rgba(51, 204, 128, 1)',
                    500: 'rgba(40, 195, 34, 1)',
                    default: "rgba(40, 195, 34, 1)",
                },
            },
        },
    },
    plugins: [
        require('tailwindcss-animated')
    ],
}

