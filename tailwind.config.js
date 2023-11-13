/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		"./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
	],
    theme: {
        extend: {
            colors: {
                zinc: {
                    800: 'rgba(48, 50, 51, 1)',
                }
            },
        },
	},
	plugins: [],
}

