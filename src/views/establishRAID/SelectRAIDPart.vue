<template name="SelectRAIDPart">
    <!-- 外框布局 -->
    <div class="space-y-6">
        <!-- select strategy -->
        <div class="mt-6 grid grid-cols-3 space-x-4">
            <div class="h-9 bg-slate-50 rounded-md flex items-center pl-4">
                <span class="text-sky-600 text-sm font-medium font-['Roboto']">
                    RAID0
                </span>
            </div>
            <div class="h-9 bg-slate-50 rounded-md flex items-center pl-4">
                <span class="text-sky-600 text-sm font-medium font-['Roboto']">
                    RAID1
                </span>
            </div>
            <div class="h-9 bg-slate-50 rounded-md flex items-center pl-4">
                <span class="text-sky-600 text-sm font-medium font-['Roboto']">
                    RAID5
                </span>
            </div>
        </div>
        <!-- Please select the desired hard disk -->
        <div>
            <div>
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Please select the desired hard disk
                </span>
            </div>

            <div class="grid grid-cols-10 space-x-2">
                <template v-for="key in [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 'D']" :key="key">
                    <div class="h-20 bg-gray-50 rounded-md flex flex-col items-center justify-around">
                        <span>
                            {{ key }}
                        </span>
                        <span>
                            RAID5
                        </span>
                    </div>
                </template>
            </div>

            <div class="flex flex-col space-y-1 mt-4">
                <template v-for="key in [2, 3, 'A']" :key="key">
                    <div class="flex items-center h-10 bg-gray-50 rounded-md">
                        <span class="ml-1 w-[34px] text-center">
                            {{ key }}
                        </span>
                        <span class="flex-grow">
                            name
                        </span>
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                            Total 245GB ·
                        </span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto']">
                            Surplus 110.5GB
                        </span>
                    </div>
                </template>

            </div>
        </div>
        <!-- Usage estimate -->
        <div>
            <div class="flex justify-between">
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Usage estimate
                </span>
                <div>
                    <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']">
                        可用
                    </span>
                    <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                        213GB
                    </span>
                </div>
            </div>

            <div class="flex rounded-sm overflow-hidden">
                <span class="h-2 bg-emerald-400 w-[20%]"></span>
                <span class="h-2 bg-amber-500 w-[20%]"></span>
                <span class="h-2 bg-orange-500 w-[60%]"></span>
            </div>

            <div class="flex space-x-4">
                <div class="space-x-1">
                    <span class="bg-emerald-400 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">预计可用容量</span>
                </div>
                <div class="space-x-1 flex-grow">
                    <span class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">预计不可用容量</span>
                </div>
                <div>
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                        RAID5
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
