<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const activedColor = "#007AE5";
const BackSketchRef = ref<SVGSVGElement | null>(null);
const props = defineProps({
    activedPort: {
        type: Number,
        default: 0,
    },
});
const setSvgAttribute = (name: string, attribute: string, value: any) => {
    const svg = BackSketchRef.value?.querySelector(`[name=${name}]`);
    svg && svg.setAttribute(attribute, value);
};
onMounted(() => {
    watch(
        () => props.activedPort,
        (newVal) => {
            newVal > 0 && setSvgAttribute("networkPort" + newVal, "fill", activedColor);
        },
        { immediate: true }
    );
});
</script>
<template>
    <svg ref="BackSketchRef" width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
            <g opacity="0.4" filter="url(#filter0_f_2531_15923)">
                <path
                    d="M18.811 54.2971C19.5686 53.4706 20.6384 53 21.7596 53H238.24C239.362 53 240.431 53.4706 241.189 54.2971L244.856 58.2971C247.207 60.8627 245.387 65 241.907 65H18.0929C14.6125 65 12.7925 60.8627 15.1443 58.2971L18.811 54.2971Z"
                    fill="#6C7480" />
            </g>
            <g opacity="0.4" filter="url(#filter1_f_2531_15923)">
                <path
                    d="M17.8284 58.1716C18.5786 57.4214 19.596 57 20.6569 57H238.552C239.488 57 240.394 57.3281 241.113 57.9271L241.756 58.4636C243.193 59.6611 242.346 62 240.476 62H18.8284C17.0466 62 16.1543 59.8457 17.4142 58.5858L17.8284 58.1716Z"
                    fill="#6C7480" />
            </g>
        </g>
        <g filter="url(#filter2_iiii_2531_15923)">
            <path
                d="M16 8C16 3.58172 19.5817 0 24 0H236C240.418 0 244 3.58172 244 8V52C244 56.4183 240.418 60 236 60H24C19.5817 60 16 56.4183 16 52V8Z"
                fill="url(#paint0_linear_2531_15923)" />
        </g>
        <g filter="url(#filter3_i_2531_15923)">
            <path
                d="M21 11C21 7.68629 23.6863 5 27 5H233C236.314 5 239 7.68629 239 11V49C239 52.3137 236.314 55 233 55H27C23.6863 55 21 52.3137 21 49V11Z"
                fill="white" />
        </g>
        <path
            d="M21.5 11C21.5 7.96243 23.9624 5.5 27 5.5H233C236.038 5.5 238.5 7.96243 238.5 11V49C238.5 52.0376 236.038 54.5 233 54.5H27C23.9624 54.5 21.5 52.0376 21.5 49V11Z"
            stroke="#CFD8E5" />
        <g opacity="0.2">
            <path
                d="M45 39.5C43.6193 39.5 42.5 38.3807 42.5 37C42.5 35.6193 43.6193 34.5 45 34.5C46.3807 34.5 47.5 35.6193 47.5 37C47.5 38.3807 46.3807 39.5 45 39.5Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M45 31C41.6863 31 39 33.6863 39 37C39 40.3137 41.6863 43 45 43C48.3137 43 51 40.3137 51 37C51 33.6863 48.3137 31 45 31ZM41 37C41 34.7909 42.7909 33 45 33C47.2091 33 49 34.7909 49 37C49 39.2091 47.2091 41 45 41C42.7909 41 41 39.2091 41 37Z"
                fill="#C0C6CC" />
        </g>

        <g fill="#C0C6CC" name="networkPort1">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M72.5 28.25C72.0858 28.25 71.75 28.5858 71.75 29V30.75H69C68.5858 30.75 68.25 31.0858 68.25 31.5V39C68.25 39.4142 68.5858 39.75 69 39.75H83C83.4142 39.75 83.75 39.4142 83.75 39V31.5C83.75 31.0858 83.4142 30.75 83 30.75H80.25V29C80.25 28.5858 79.9142 28.25 79.5 28.25H72.5ZM81.25 38.25V35C81.25 34.5858 80.9142 34.25 80.5 34.25C80.0858 34.25 79.75 34.5858 79.75 35V38.25H78.25V35C78.25 34.5858 77.9142 34.25 77.5 34.25C77.0858 34.25 76.75 34.5858 76.75 35V38.25H75.25V35C75.25 34.5858 74.9142 34.25 74.5 34.25C74.0858 34.25 73.75 34.5858 73.75 35V38.25H72.25V35C72.25 34.5858 71.9142 34.25 71.5 34.25C71.0858 34.25 70.75 34.5858 70.75 35V38.25H69.75V32.25H72.5C72.9142 32.25 73.25 31.9142 73.25 31.5V29.75H78.75V31.5C78.75 31.9142 79.0858 32.25 79.5 32.25H82.25V38.25H81.25Z" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M65 27C65 25.8954 65.8954 25 67 25H85C86.1046 25 87 25.8954 87 27V41C87 42.1046 86.1046 43 85 43H67C65.8954 43 65 42.1046 65 41V27ZM67 26.5H85C85.2761 26.5 85.5 26.7239 85.5 27V41C85.5 41.2761 85.2761 41.5 85 41.5H67C66.7239 41.5 66.5 41.2761 66.5 41V27C66.5 26.7239 66.7239 26.5 67 26.5Z" />
        </g>
        <g fill="#C0C6CC" name="networkPort2">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M102.5 28.25C102.086 28.25 101.75 28.5858 101.75 29V30.75H99C98.5858 30.75 98.25 31.0858 98.25 31.5V39C98.25 39.4142 98.5858 39.75 99 39.75H113C113.414 39.75 113.75 39.4142 113.75 39V31.5C113.75 31.0858 113.414 30.75 113 30.75H110.25V29C110.25 28.5858 109.914 28.25 109.5 28.25H102.5ZM111.25 38.25V35C111.25 34.5858 110.914 34.25 110.5 34.25C110.086 34.25 109.75 34.5858 109.75 35V38.25H108.25V35C108.25 34.5858 107.914 34.25 107.5 34.25C107.086 34.25 106.75 34.5858 106.75 35V38.25H105.25V35C105.25 34.5858 104.914 34.25 104.5 34.25C104.086 34.25 103.75 34.5858 103.75 35V38.25H102.25V35C102.25 34.5858 101.914 34.25 101.5 34.25C101.086 34.25 100.75 34.5858 100.75 35V38.25H99.75V32.25H102.5C102.914 32.25 103.25 31.9142 103.25 31.5V29.75H108.75V31.5C108.75 31.9142 109.086 32.25 109.5 32.25H112.25V38.25H111.25Z" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M95 27C95 25.8954 95.8954 25 97 25H115C116.105 25 117 25.8954 117 27V41C117 42.1046 116.105 43 115 43H97C95.8954 43 95 42.1046 95 41V27ZM97 26.5H115C115.276 26.5 115.5 26.7239 115.5 27V41C115.5 41.2761 115.276 41.5 115 41.5H97C96.7239 41.5 96.5 41.2761 96.5 41V27C96.5 26.7239 96.7239 26.5 97 26.5Z" />
        </g>

        <g opacity="0.2">
            <path
                d="M133.5 20C133.224 20 133 20.2239 133 20.5V22.5C133 22.7761 133.224 23 133.5 23H146.5C146.776 23 147 22.7761 147 22.5V20.5C147 20.2239 146.776 20 146.5 20H133.5Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M129 19C129 17.8954 129.895 17 131 17H149C150.105 17 151 17.8954 151 19V25C151 26.1046 150.105 27 149 27H131C129.895 27 129 26.1046 129 25V19ZM131 18.5H149C149.276 18.5 149.5 18.7239 149.5 19V25C149.5 25.2761 149.276 25.5 149 25.5H131C130.724 25.5 130.5 25.2761 130.5 25V19C130.5 18.7239 130.724 18.5 131 18.5Z"
                fill="#C0C6CC" />
        </g>
        <g opacity="0.2">
            <path
                d="M133.5 36C133.224 36 133 36.2239 133 36.5V38.5C133 38.7761 133.224 39 133.5 39H146.5C146.776 39 147 38.7761 147 38.5V36.5C147 36.2239 146.776 36 146.5 36H133.5Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M129 35C129 33.8954 129.895 33 131 33H149C150.105 33 151 33.8954 151 35V41C151 42.1046 150.105 43 149 43H131C129.895 43 129 42.1046 129 41V35ZM131 34.5H149C149.276 34.5 149.5 34.7239 149.5 35V41C149.5 41.2761 149.276 41.5 149 41.5H131C130.724 41.5 130.5 41.2761 130.5 41V35C130.5 34.7239 130.724 34.5 131 34.5Z"
                fill="#C0C6CC" />
        </g>
        <g opacity="0.2">
            <path
                d="M163.5 20C163.224 20 163 20.2239 163 20.5V22.5C163 22.7761 163.224 23 163.5 23H176.5C176.776 23 177 22.7761 177 22.5V20.5C177 20.2239 176.776 20 176.5 20H163.5Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M159 19C159 17.8954 159.895 17 161 17H179C180.105 17 181 17.8954 181 19V25C181 26.1046 180.105 27 179 27H161C159.895 27 159 26.1046 159 25V19ZM161 18.5H179C179.276 18.5 179.5 18.7239 179.5 19V25C179.5 25.2761 179.276 25.5 179 25.5H161C160.724 25.5 160.5 25.2761 160.5 25V19C160.5 18.7239 160.724 18.5 161 18.5Z"
                fill="#C0C6CC" />
        </g>
        <g opacity="0.2">
            <path
                d="M163.5 36C163.224 36 163 36.2239 163 36.5V38.5C163 38.7761 163.224 39 163.5 39H176.5C176.776 39 177 38.7761 177 38.5V36.5C177 36.2239 176.776 36 176.5 36H163.5Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M159 35C159 33.8954 159.895 33 161 33H179C180.105 33 181 33.8954 181 35V41C181 42.1046 180.105 43 179 43H161C159.895 43 159 42.1046 159 41V35ZM161 34.5H179C179.276 34.5 179.5 34.7239 179.5 35V41C179.5 41.2761 179.276 41.5 179 41.5H161C160.724 41.5 160.5 41.2761 160.5 41V35C160.5 34.7239 160.724 34.5 161 34.5Z"
                fill="#C0C6CC" />
        </g>
        <g opacity="0.2">
            <path
                d="M198 20.25C197.586 20.25 197.25 20.5858 197.25 21V23C197.25 23.4142 197.586 23.75 198 23.75C198.414 23.75 198.75 23.4142 198.75 23V21.75H211.25V23C211.25 23.4142 211.586 23.75 212 23.75C212.414 23.75 212.75 23.4142 212.75 23V21C212.75 20.5858 212.414 20.25 212 20.25H198Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M193 19C193 17.8954 193.895 17 195 17H215C216.105 17 217 17.8954 217 19V25C217 26.1046 216.105 27 215 27H196.828C196.298 27 195.789 26.7893 195.414 26.4142L193.586 24.5858C193.211 24.2107 193 23.702 193 23.1716V19ZM195 18.5H215C215.276 18.5 215.5 18.7239 215.5 19V25C215.5 25.2761 215.276 25.5 215 25.5H196.828C196.696 25.5 196.569 25.4473 196.475 25.3536L194.646 23.5251C194.553 23.4314 194.5 23.3042 194.5 23.1716V19C194.5 18.7239 194.724 18.5 195 18.5Z"
                fill="#C0C6CC" />
        </g>
        <g opacity="0.2">
            <path
                d="M198 36.25C197.586 36.25 197.25 36.5858 197.25 37C197.25 37.4142 197.586 37.75 198 37.75H212C212.414 37.75 212.75 37.4142 212.75 37C212.75 36.5858 212.414 36.25 212 36.25H198Z"
                fill="#C0C6CC" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M193 35C193 33.8954 193.895 33 195 33H215C216.105 33 217 33.8954 217 35V39C217 39.6295 216.704 40.2223 216.2 40.6L213.533 42.6C213.187 42.8596 212.766 43 212.333 43H197.667C197.234 43 196.813 42.8596 196.467 42.6L193.8 40.6C193.296 40.2223 193 39.6295 193 39V35ZM195 34.5H215C215.276 34.5 215.5 34.7239 215.5 35V39C215.5 39.1574 215.426 39.3056 215.3 39.4L212.633 41.4C212.547 41.4649 212.442 41.5 212.333 41.5H197.667C197.558 41.5 197.453 41.4649 197.367 41.4L194.7 39.4C194.574 39.3056 194.5 39.1574 194.5 39V35C194.5 34.7239 194.724 34.5 195 34.5Z"
                fill="#C0C6CC" />
        </g>
        <defs>
            <filter id="filter0_f_2531_15923" x="6.08496" y="45" width="247.83" height="28" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_2531_15923" />
            </filter>
            <filter id="filter1_f_2531_15923" x="12.8245" y="53" width="233.656" height="13" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2531_15923" />
            </filter>
            <filter id="filter2_iiii_2531_15923" x="16" y="-2" width="228" height="64" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2531_15923" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
                <feBlend mode="normal" in2="effect1_innerShadow_2531_15923" result="effect2_innerShadow_2531_15923" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="-2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.358333 0 0 0 0 0.375694 0 0 0 0 0.4 0 0 0 0.3 0" />
                <feBlend mode="normal" in2="effect2_innerShadow_2531_15923" result="effect3_innerShadow_2531_15923" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="-1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="effect3_innerShadow_2531_15923" result="effect4_innerShadow_2531_15923" />
            </filter>
            <filter id="filter3_i_2531_15923" x="21" y="5" width="218" height="51" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.537255 0 0 0 0 0.564706 0 0 0 0 0.6 0 0 0 0.3 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2531_15923" />
            </filter>
            <linearGradient id="paint0_linear_2531_15923" x1="101.362" y1="17.0496" x2="104.521" y2="62.6679"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#ACB4BF" />
                <stop offset="1" stop-color="#949CA6" />
            </linearGradient>
        </defs>
    </svg>
</template>
