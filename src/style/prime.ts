// You can change the theme which primevue components.
export default {
    button: {
        root: ({ props, context }: any) => {
            return {
                class: [
                    'items-center cursor-pointer inline-flex flex-shrink-0 relative select-none text-center whitespace-nowrap', // base, layout
                    'transition duration-200 ease-in-out', // transition
                    'rounded-[14px] gap-2', // button shape
                    {
                        'px-3.5 py-1': props.size !== null,
                        'h-6 text-xs leading-4': props.size === 'small',
                        'h-7 text-sm leading-5': props.size === 'medium'
                    },
                    {
                        'text-neutral-300 bg-gray-100': context.disabled,
                        'text-zinc-800 bg-gray-100 hover:bg-zinc-200':
                            !context.disabled && props.severity === 'neutral',
                        'text-white bg-sky-600 hover:bg-sky-700':
                            !context.disabled && props.severity === 'primary',
                        'text-sky-600 bg-sky-100 hover:bg-sky-200':
                            !context.disabled && props.severity === 'secondary',
                        'text-orange-500 bg-rose-100 hover:bg-red-300':
                            !context.disabled && props.severity === 'accent'
                    }
                ]
            }
        },
        label: ({ props }: any) => {
            return {
                class: [
                    'font-normal font-["Roboto"]',
                    {
                        'text-xs leading-4': props.size === 'small',
                        'text-sm leading-5': props.size === 'medium'
                    }
                    // {
                    //     'text-neutral-300': props.disabled,
                    //     'text-zinc-800': !props.disabled && props.severity === 'neutral',
                    //     'text-white': !props.disabled && props.severity === 'primary',
                    //     'text-sky-600': !props.disabled && props.severity === 'secondary',
                    //     'text-orange-500': !props.disabled && props.severity === 'accent',
                    // },
                ]
            }
        }
    },
    dialog: {
        root: ({ state }: any) => ({
            class: [
                'rounded-xl shadow-lg border-0',
                'h-[calc(100%_-_4rem)]',
                'max-h-90 transform scale-100',
                'm-0 !w-[40.25rem]',
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
    },
    skeleton: {
        root: ({ props }: any) => ({
            class: [
                'overflow-hidden',
                '!mb-2',
                'bg-gray-300 dark:bg-gray-800',
                'after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-blue-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse',
                {
                    'rounded-md': props.shape !== 'circle',
                    'rounded-full': props.shape == 'circle'
                }
            ]
        })
    },
    inputswitch: {
        // 目前是 Small20px 组件规格
        root: ({ props: e, state: r }: any) => ({
            class: [
                'inline-flex relative',
                'shrink-0',
                'rounded-2xl',
                'h-5 w-8',
                e.modelValue ? 'bg-sky-600' : 'bg-neutral-300',
                {
                    'opacity-60 select-none pointer-events-none cursor-default':
                        e.disabled
                }
            ]
        }),
        slider: ({ props: e }: any) => ({
            class: [
                'absolute top-0 left-0 right-0 bottom-0',
                'rounded-2xl',
                'before:bg-white',
                'before:absolute before:top-1/2',
                'before:-mt-2',
                'before:h-4 before:w-4',
                'before:rounded-full',
                'before:duration-200 before:transition before:ease-in-out',
                'before:bg-surface-0 before:dark:bg-surface-900',
                'before:shadow',
                { 'before:transform before:translate-x-3': e.modelValue },
                'border-2 border-transparent',
                {
                    'bg-surface-200 dark:bg-surface-700': !e.modelValue,
                    'bg-primary-500 dark:bg-primary-400': e.modelValue
                },
                {
                    'hover:bg-surface-300 hover:dark:bg-surface-600 ':
                        !e.modelValue
                },
                'transition-colors duration-200',
                'cursor-pointer'
            ]
        })
    },
    toast: {
        container: ({ props }: { props: any }) => ({
            class: [
                'my-4 rounded-md w-full flex',
                '!border-l-0',
                'backdrop-blur-[10px] shadow-md',
                '!bg-white',
                '!text-gray-900',
                // icon
                {
                    'before:!ml-5 before:!my-3.5 before:h-5 before:content-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIiBmaWxsPSIjRkQ1RjFDIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0LjI0MjYgNS43NTc3NkMxNC41MDI5IDYuMDE4MTEgMTQuNTAyOSA2LjQ0MDIyIDE0LjI0MjYgNi43MDA1N0w2LjcwMDA5IDE0LjI0M0M2LjQzOTc0IDE0LjUwMzQgNi4wMTc2MyAxNC41MDM0IDUuNzU3MjggMTQuMjQzQzUuNDk2OTMgMTMuOTgyNyA1LjQ5NjkzIDEzLjU2MDYgNS43NTcyOCAxMy4zMDAyTDEzLjI5OTggNS43NTc3NkMxMy41NjAxIDUuNDk3NDEgMTMuOTgyMiA1LjQ5NzQxIDE0LjI0MjYgNS43NTc3NloiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuNzU3MjcgNS43NTc3NkM2LjAxNzYyIDUuNDk3NDEgNi40Mzk3MyA1LjQ5NzQxIDYuNzAwMDggNS43NTc3NkwxNC4yNDI2IDEzLjMwMDJDMTQuNTAyOSAxMy41NjA2IDE0LjUwMjkgMTMuOTgyNyAxNC4yNDI2IDE0LjI0M0MxMy45ODIyIDE0LjUwMzQgMTMuNTYwMSAxNC41MDM0IDEzLjI5OTcgMTQuMjQzTDUuNzU3MjcgNi43MDA1N0M1LjQ5NjkyIDYuNDQwMjIgNS40OTY5MiA2LjAxODExIDUuNzU3MjcgNS43NTc3NloiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==")]': props.message.severity == 'error',
                    'before:!ml-5 before:!my-3.5 before:h-5 before:content-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIiBmaWxsPSIjMjhDMzIyIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1LjgwNDggNi4xOTUyNkMxNi4wNjUyIDYuNDU1NjEgMTYuMDY1MiA2Ljg3NzcyIDE1LjgwNDggNy4xMzgwN0w5LjEzODE1IDEzLjgwNDdDOS4wMTMxMyAxMy45Mjk4IDguODQzNTYgMTQgOC42NjY3NSAxNEM4LjQ4OTk0IDE0IDguMzIwMzcgMTMuOTI5OCA4LjE5NTM0IDEzLjgwNDdMNC44NjIwMSAxMC40NzE0QzQuNjAxNjYgMTAuMjExMSA0LjYwMTY2IDkuNzg4OTUgNC44NjIwMSA5LjUyODZDNS4xMjIzNiA5LjI2ODI1IDUuNTQ0NDcgOS4yNjgyNSA1LjgwNDgyIDkuNTI4Nkw4LjY2Njc1IDEyLjM5MDVMMTQuODYyIDYuMTk1MjZDMTUuMTIyNCA1LjkzNDkxIDE1LjU0NDUgNS45MzQ5MSAxNS44MDQ4IDYuMTk1MjZaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=")]': props.message.severity == 'success',
                    'before:!ml-5 before:!my-3.5 before:h-5 before:content-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIiBmaWxsPSIjRThBQjAyIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuOTk5ODggNC42NjY5OUM5LjI3NTc4IDQuNjY2OTkgOC43MDAzNCA1LjI3NTI5IDguNzQwNTEgNS45OTgyN0w5LjA2MTY5IDExLjc3OTVDOS4wODkzNSAxMi4yNzc0IDkuNTAxMTggMTIuNjY3IDkuOTk5ODggMTIuNjY3QzEwLjQ5ODYgMTIuNjY3IDEwLjkxMDQgMTIuMjc3NCAxMC45MzgxIDExLjc3OTVMMTEuMjU5MyA1Ljk5ODI3QzExLjI5OTQgNS4yNzUyOSAxMC43MjQgNC42NjY5OSA5Ljk5OTg4IDQuNjY2OTlaIiBmaWxsPSJ3aGl0ZSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05Ljk5OTg4IDE1LjMzMzdDMTAuNTUyMiAxNS4zMzM3IDEwLjk5OTkgMTQuODg1OSAxMC45OTk5IDE0LjMzMzdDMTAuOTk5OSAxMy43ODE0IDEwLjU1MjIgMTMuMzMzNyA5Ljk5OTg4IDEzLjMzMzdDOS40NDc2IDEzLjMzMzcgOC45OTk4OCAxMy43ODE0IDguOTk5ODggMTQuMzMzN0M4Ljk5OTg4IDE0Ljg4NTkgOS40NDc2IDE1LjMzMzcgOS45OTk4OCAxNS4zMzM3WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K")]': props.message.severity == 'warn'
                }
            ]
        }),
        content: {
            class: '!pl-2 !pr-5 !py-3.5 !border-l-0'
        },
        icon: {
            class: [
                // Sizing and Spacing
                '!hidden',
            ]
        },
        text: {
            class: [
                // Font and Text
                'text-sm leading-5',
                '!ml-0',
            ]
        },
        summary: {
            // class: '!hidden'
        },
        detail: {
            class: '!mt-0'
        },
        closebutton: {
            class: [
                '!hidden',
            ]
        },
    }
}
