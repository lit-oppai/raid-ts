<script setup>
// TODO: only test.
// WARNING: there has security risk.
defineProps({
    fill: {
        type: String,
        default: 'text-black'
    },
})
</script>

<template>
    <svg width="24" height="24" viewBox="0 0 24 24" :class="fill" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M13.25 16.25C13.25 16.9404 12.6904 17.5 12 17.5C11.3096 17.5 10.75 16.9404 10.75 16.25C10.75 15.5596 11.3096 15 12 15C12.6904 15 13.25 15.5596 13.25 16.25Z" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10.5998 7.99668C10.5458 7.1867 11.1882 6.5 12 6.5C12.8118 6.5 13.4542 7.1867 13.4002 7.99668L13.0665 13.0022C13.0291 13.5637 12.5627 14 12 14C11.4373 14 10.9709 13.5637 10.9335 13.0022L10.5998 7.99668Z" />
    </svg>
</template>
