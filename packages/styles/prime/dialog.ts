export default {
    root: ({ state }: any) => ({
        class: [
            'rounded-xl shadow-lg border-0',
            'h-[calc(100%_-_4rem)]',
            'max-h-90 transform scale-100',
            'm-0 w-[40.25rem]',
            'dark:border dark:border-blue-900/40',
            {
                'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0':
                    state.maximized
            }
        ]
    }),
        header: {
        class: [
            'h-[58px]',
            'flex items-center justify-between shrink-0',
            'bg-white text-gray-800 border-b-2  rounded-t-xl px-6 pt-5 pb-3',
            'dark:bg-gray-900  dark:text-white/80'
        ]
    },
    headerTitle: 'text-zinc-800 text-base font-medium font-["Roboto"]',
        headerIcons: 'flex items-center',
            closeButton: {
        class: [
            'flex items-center justify-center overflow-hidden relative',
            'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-md transition duration-200 ease-in-out mr-2 last:mr-0',
            'text-slate-800',
            'hover:border-transparent hover:bg-gray-100',
            // 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // focus
            'dark:hover:bg-gray-800/80'
        ]
    },
    closeButtonIcon: 'w-4 h-4 inline-block',
        content: ({ state }: any) => ({
            class: [
                'flex flex-col',
                'overflow-y-auto',
                'h-full',
                'bg-white text-gray-700',
                {
                    grow: state.maximized,
                    'rounded-bl-lg rounded-br-lg': false
                }
            ]
        }),
            footer: {
        class: [
            'shrink-0 ',
            'h-16',
            'border-t-2 bg-white text-gray-700 px-6 pb-6 pt-3 text-right rounded-b-xl',
            'dark:bg-gray-900  dark:text-white/80'
        ]
    },
    mask: ({ }: any) => ({
        class: ['transition duration-200', 'bg-black/40']
    }),
        transition: ({ props }: any) => {
            return props.position === 'top'
                ? {
                    enterFromClass:
                        'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
                    enterActiveClass: 'transition-all duration-200 ease-out',
                    leaveActiveClass: 'transition-all duration-200 ease-out',
                    leaveToClass:
                        'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0'
                }
                : props.position === 'bottom'
                    ? {
                        enterFromClass: 'opacity-0 scale-75 translate-y-full',
                        enterActiveClass: 'transition-all duration-200 ease-out',
                        leaveActiveClass: 'transition-all duration-200 ease-out',
                        leaveToClass:
                            'opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0'
                    }
                    : props.position === 'left' ||
                        props.position === 'topleft' ||
                        props.position === 'bottomleft'
                        ? {
                            enterFromClass:
                                'opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0',
                            enterActiveClass: 'transition-all duration-200 ease-out',
                            leaveActiveClass: 'transition-all duration-200 ease-out',
                            leaveToClass:
                                'opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0'
                        }
                        : props.position === 'right' ||
                            props.position === 'topright' ||
                            props.position === 'bottomright'
                            ? {
                                enterFromClass:
                                    'opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
                                enterActiveClass: 'transition-all duration-200 ease-out',
                                leaveActiveClass: 'transition-all duration-200 ease-out',
                                leaveToClass:
                                    'opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0'
                            }
                            : {
                                enterFromClass: 'opacity-0 scale-75',
                                enterActiveClass: 'transition-all duration-200 ease-out',
                                leaveActiveClass: 'transition-all duration-200 ease-out',
                                leaveToClass: 'opacity-0 scale-75'
                            }
        }
}
