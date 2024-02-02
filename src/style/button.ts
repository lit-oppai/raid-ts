export default {
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
}
