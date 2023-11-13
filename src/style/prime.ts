// You can change the theme which primevue components.
export default {
	button: {
		root: () => {
			return ({
				class: [
					'items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom',
					'transition duration-200 ease-in-out',
					'focus:outline-none focus:outline-offset-0',
				]
			})
		},
	}
}
