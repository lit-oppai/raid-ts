export default {
    // 目前是 Small20px 组件规格
    root: ({ props: e }: any) => ({
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
}
