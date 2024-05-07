export default {
    root: ({ state }: any) => {
        return ({
            class: [
                "bg-white",
                'rounded-Radius2XL shadow-lg border border-Border/Regular',
                'h-[12.625rem]',
                'transform scale-100',
                'w-[18.75rem] mx-[1.5rem]',
                'dark:border dark:border-blue-900/40',
                {
                    'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0':
                        state.maximized
                }
            ],
        })
    },
    header: {
        class: [
            'h-[58px]',
            'flex items-center justify-between shrink-0',
            'text-gray-800 border-b  rounded-t-xl pl-5 pr-4 pt-4 pb-3 border-Border/Regular',
            "bg-Shade/Secondary",
        ]
    },
    title: 'text-zinc-800 text-base font-medium font-["Roboto"]',
    // headerIcons: 'flex items-center',
    closeButton: {
        class: [
            'flex items-center justify-center overflow-hidden relative',
            'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-md transition duration-200 ease-in-out mr-2 last:mr-0',
            'text-slate-800',
            'hover:border-transparent hover:bg-gray-100',
            // 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // focus
        ]
    },
    closeButtonIcon: 'text-2xl inline-block',
    content: ({ state }: any) => ({
        class: [
            'flex flex-col',
            'overflow-y-auto',
            'h-full',
            'bg-Background/Primary text-gray-700',
            'px-6 py-2',
            {
                grow: state.maximized,
                'rounded-bl-lg rounded-br-lg': false
            }
        ]
    }),
    footer: {
        class: [
            'shrink-0 ',
            'h-[3.25rem]',
            'border-t border-Border/Regular bg-Shade/Secondary p-[10px] text-right rounded-b-xl',
            "inline-flex justify-end items-center gap-3",
            "bg-Shade/Secondary",
        ]
    },
    rejectButton: {
        root: {
            class: [
                'w-14 h-8 p-2 bg-gray-800/opacity-5 rounded-lg border border-gray-800/opacity-5 justify-start items-center gap-1.5 inline-flex',
            ]
        },
        label: {
            class: ["text-zinc-900 text-xs font-normal font-['Britti Sans'] leading-none"]
        }
    },
    acceptButton: {
        root: {
            class: [
                'ml- w-16 h-8 p-2 bg-blue-600 rounded-lg border border-gray-800/opacity-10 justify-start items-center gap-1.5 inline-flex',
            ]
        },
        label: {
            class: ["text-white text-xs font-semibold font-['Britti Sans'] leading-none"]
        }
    }
}
