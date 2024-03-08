export default {
    root: {
        class: [
            'relative',
            'inline-flex',
            'align-bottom',
            'w-4',
            'h-4',
            'cursor-default',
            'select-none'
        ]
    },
    box: ({ props: e, context: r }: any) => ({
        class: [
            'flex',
            'items-center',
            'justify-center',
            'w-4',
            'h-4',
            'rounded',
            'border',
            'text-surface-600',
            {
                'border-surface-300 bg-surface-0 ':
                    !r.checked,
                'border-primary-500 bg-primary-500  ':
                    r.checked
            },
            {
                'ring-2 ring-primary-500  ':
                    !e.disabled && r.focused,
                'cursor-default opacity-60': e.disabled
            },
            {
                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500  ':
                    !e.disabled,
                'cursor-default opacity-60': e.disabled
            },
            'transition-colors',
            'duration-200'
        ]
    }),
        input: {
        class: [
            'peer',
            'w-full ',
            'h-full',
            'absolute',
            'top-0 left-0',
            'z-10',
            'p-0',
            'm-0',
            'rounded',
            // 'border',
            // 'opacity-0',
            'rounded-md',
            'outline-none',
            // 'border-2 border-surface-300 ',
            'appareance-none'
        ]
    },
    icon: {
        class: [
            '!block',
            'text-normal',
            // 'w-3',
            // 'h-3',
            // 'text-white  ',
            'transition-all',
            'duration-200'
        ]
    }
}
