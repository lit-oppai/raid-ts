// You can change the theme which primevue components.
export default {
    button: {
        root: ({ props, context }: any) => {
            return ({
                class: [
                    'items-center cursor-pointer inline-flex flex-shrink-0 relative select-none text-center whitespace-nowrap', // base, layout
                    'transition duration-200 ease-in-out', // transition
                    'rounded-[14px] gap-2', // button shape 
                    {
                        'px-3.5 py-1': props.size !== null,
                        'h-6 text-xs leading-4': props.size === 'small',
                        'h-7 text-sm leading-5': props.size === 'medium',
                    },
                    {
                        'text-neutral-300 bg-gray-100': context.disabled,
                        'text-zinc-800 bg-gray-100 hover:bg-zinc-200': !context.disabled && props.severity === 'neutral',
                        'text-white bg-sky-600 hover:bg-sky-700': !context.disabled && props.severity === 'primary',
                        'text-sky-600 bg-sky-100 hover:bg-sky-200': !context.disabled && props.severity === 'secondary',
                        'text-orange-500 bg-rose-100 hover:bg-red-300': !context.disabled && props.severity === 'accent',
                    },
                ]
            })
        },
        label: ({ props }: any) => {
            return ({
                class: [
                    'font-normal font-["Roboto"]',
                    {
                        'text-xs leading-4': props.size === 'small',
                        'text-sm leading-5': props.size === 'medium',
                    },
                    // {
                    //     'text-neutral-300': props.disabled,
                    //     'text-zinc-800': !props.disabled && props.severity === 'neutral',
                    //     'text-white': !props.disabled && props.severity === 'primary',
                    //     'text-sky-600': !props.disabled && props.severity === 'secondary',
                    //     'text-orange-500': !props.disabled && props.severity === 'accent',
                    // },
                ]
            })
        }
    },
    dialog: {
        root: ({ state }: any) => ({
            class: [
                'rounded-xl shadow-lg border-0',
                'h-[calc(100vh_-_4rem)]',
                'max-h-90 transform scale-100',
                'm-0 !w-[40.25rem]',
                'dark:border dark:border-blue-900/40',
                {
                    'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': state.maximized
                }
            ]
        }),
        header: {
            class: ['h-[58px]', 'flex items-center justify-between shrink-0', 'bg-white text-gray-800 border-b-2  rounded-t-xl px-6 pt-5 pb-3', 'dark:bg-gray-900  dark:text-white/80']
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
                'overflow-y-auto',
                'h-full',
                'bg-white text-gray-700 px-6',
                'dark:bg-gray-900  dark:text-white/80 ',
                {
                    grow: state.maximized,
                    'rounded-bl-lg rounded-br-lg': false
                }
            ]
        }),
        footer: {
            class: ['shrink-0 ', 'h-16', 'border-t-2 bg-white text-gray-700 px-6 pb-6 pt-3 text-right rounded-b-xl', 'dark:bg-gray-900  dark:text-white/80']
        },
        mask: ({ props }: any) => ({
            class: ['transition duration-200', 'bg-black/40']
        }),
        transition: ({ props }: any) => {
            return props.position === 'top'
                ? {
                    enterFromClass: 'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
                    enterActiveClass: 'transition-all duration-200 ease-out',
                    leaveActiveClass: 'transition-all duration-200 ease-out',
                    leaveToClass: 'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0'
                }
                : props.position === 'bottom'
                    ? {
                        enterFromClass: 'opacity-0 scale-75 translate-y-full',
                        enterActiveClass: 'transition-all duration-200 ease-out',
                        leaveActiveClass: 'transition-all duration-200 ease-out',
                        leaveToClass: 'opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0'
                    }
                    : props.position === 'left' || props.position === 'topleft' || props.position === 'bottomleft'
                        ? {
                            enterFromClass: 'opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0',
                            enterActiveClass: 'transition-all duration-200 ease-out',
                            leaveActiveClass: 'transition-all duration-200 ease-out',
                            leaveToClass: 'opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0'
                        }
                        : props.position === 'right' || props.position === 'topright' || props.position === 'bottomright'
                            ? {
                                enterFromClass: 'opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
                                enterActiveClass: 'transition-all duration-200 ease-out',
                                leaveActiveClass: 'transition-all duration-200 ease-out',
                                leaveToClass: 'opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0'
                            }
                            : {
                                enterFromClass: 'opacity-0 scale-75',
                                enterActiveClass: 'transition-all duration-200 ease-out',
                                leaveActiveClass: 'transition-all duration-200 ease-out',
                                leaveToClass: 'opacity-0 scale-75'
                            };
        }
    },
}
