export default {
    root: ({ props: e, state: r }: any) => ({
        class: [
            'group',
            'inline-flex',
            'relative',
            'h-8',
            'rounded-md',
            'shadow-sm',
            'bg-surface-0',
            "outline outline-1 outline-gary/500 hover:outline-sky-600",
            {
                'outline-sky-600':
                    r.focused
            },
            'cursor-pointer',
            'select-none',
            { 'opacity-60': e.disabled, 'pointer-events-none': e.disabled }
        ]
    }),
    input: ({ props: e }: any) => ({
        class: [
            'font-sans',
            'leading-6',
            'sm:text-sm',
            'block',
            'flex-auto',
            'bg-transparent',
            'border-0',
            {
                'text-surface-800': e.modelValue != null,
                'text-surface-400':
                    e.modelValue == null
            },
            'placeholder:text-surface-400',
            'w-[1%]',
            'py-1.5 px-3',
            { 'pr-7': e.showClear },
            'rounded-none',
            'transition',
            'duration-200',
            'focus:outline-none focus:shadow-none',
            'relative',
            'cursor-pointer',
            'overflow-hidden overflow-ellipsis',
            'whitespace-nowrap',
            'appearance-none'
        ]
    }),
    trigger: ({ state: r }: any) => ({
        class: [
            'sm:text-sm',
            'flex items-center justify-center',
            'shrink-0',
            'bg-transparent',
            'text-gary/500 group-hover:text-black',
            'w-8',
            'rounded-tr-md',
            'rounded-br-md',
            {
                'rotate-180 text-black': r.overlayVisible,
            }
        ]
    }),
    panel: {
        class: [
            'absolute top-0 left-0',
            'mt-2',
            'border-0 outline outline-1 outline-gary/300',
            'rounded-md',
            'shadow-md',
            'bg-surface-0',
            'text-surface-800',
            'ring-1 ring-inset ring-surface-300'
        ]
    },
    wrapper: {
        class: ['max-h-[15rem]', 'overflow-auto']
    },
    list: {
        class: 'bg-white p-1 space-y-0.5 border rounded border-gary/300 list-none m-0'
    },
    item: ({ context: e }: any) => ({
        class: [
            'h-8',
            'flex items-center space-x-2',
            'sm:text-sm',
            'leading-none',
            { 'font-normal': !e.selected, 'font-bold': e.selected },
            'relative',
            'border-0',
            'rounded-none',
            'm-0',
            'px-3',
            {
                'text-surface-700':
                    !e.focused && !e.selected && !e.disabled
            },
            {
                'text-surface-600':
                    !e.focused && !e.selected && e.disabled
            },
            {
                'bg-surface-200 text-surface-700':
                    e.focused && !e.selected
            },
            // {
            //     'bg-primary-500 dark:bg-primary-400 text-white dark:text-surface-700':
            //         e.focused && e.selected
            // },
            {
                'bg-transparent text-surface-700 dark:text-white/80':
                    !e.focused && e.selected
            },
            // 'hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white dark:hover:text-surface-700',
            'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
            { 'pointer-events-none cursor-default': e.disabled },
            { 'cursor-pointer': !e.disabled },
            'overflow-hidden',
            'whitespace-nowrap'
        ]
    }),
    itemgroup: {
        class: [
            'font-bold',
            'sm:text-sm',
            'm-0',
            'py-2 px-4',
            'text-surface-800',
            'bg-surface-0',
            'cursor-auto'
        ]
    },
    emptymessage: {
        class: [
            'leading-none',
            'sm:text-sm',
            'py-2 px-4',
            'text-surface-800',
            'bg-transparent'
        ]
    },
    header: {
        class: [
            'p-0',
            'm-0',
            'rounded-tl-md',
            'rounded-tr-md',
            'text-surface-700 ',
            'bg-surface-100 '
        ]
    },
    filtercontainer: {
        class: 'relative'
    },
    filterinput: {
        class: [
            'font-sans',
            'leading-none',
            'sm:text-sm',
            'py-1.5 px-3',
            'pr-7',
            '-mr-7',
            'w-full',
            'text-surface-700 ',
            'bg-surface-0 ',
            'placeholder:text-surface-400',
            'ring-1 ring-inset ring-surface-300 ',
            'border-0',
            'rounded-tl-md',
            'rounded-tr-md',
            'appearance-none',
            'focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0',
            'focus:ring-primary-600',
            'appearance-none'
        ]
    },
    filtericon: {
        class: ['absolute', 'top-1/2 right-3', '-mt-2']
    },
    clearicon: {
        class: [
            'text-surface-500',
            'absolute',
            'top-1/2',
            'right-12',
            '-mt-2'
        ]
    },
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass:
            'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
}
