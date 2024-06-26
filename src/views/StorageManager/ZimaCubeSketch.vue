<script setup lang="ts">
// import OverlayPanel from 'primevue/overlaypanel';
import { ref, watch, onMounted } from "vue";
import { HDDStatus, SSDStatus }  from "./controlData.ts";

let ZimaCubeSketchRef = ref<SVGSVGElement | null>(null);
const setOpacity = (name: string, opacity: number) => {
    const svg = ZimaCubeSketchRef.value?.querySelectorAll(`[name=${name}]`);
    if (svg) {
        svg.forEach((item) => {
            item.setAttribute("opacity", opacity.toString());
        });
    }
};
onMounted(() => {
    watch(
        [HDDStatus, SSDStatus],
        ([newHDDVal, newSSDVal]) => {
            newHDDVal.forEach((item, index) => {
                setOpacity(`disk${index}`, item.exit ? 1 : 0.5);
            });
            // 全部无效，则设置ABCD无效。
            if (
                Array.from(newSSDVal.values()).every((item: any) => !item.exit)
            ) {
                setOpacity(`diskABCD`, 0.5);
            }
        },
        { immediate: true },
    );
});
</script>

<template>
    <svg
        ref="ZimaCubeSketchRef"
        width="366"
        height="100"
        viewBox="0 0 366 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g opacity="0.8">
            <g opacity="0.4" filter="url(#filter0_f_988_10640)">
                <path
                    d="M10 79C10 76.7909 11.7909 75 14 75H86C88.2091 75 90 76.7909 90 79V81C90 83.2091 88.2091 85 86 85H14C11.7909 85 10 83.2091 10 81V79Z"
                    fill="#6C7480"
                />
            </g>
            <g opacity="0.6" filter="url(#filter1_f_988_10640)">
                <path
                    d="M16 81C16 79.8954 16.8954 79 18 79H82C83.1046 79 84 79.8954 84 81C84 82.1046 83.1046 83 82 83H18C16.8954 83 16 82.1046 16 81Z"
                    fill="#6C7480"
                />
            </g>
        </g>
        <g filter="url(#filter2_iiii_988_10640)">
            <rect
                x="10"
                width="80"
                height="80"
                rx="4"
                fill="url(#paint0_linear_988_10640)"
            />
        </g>
        <path
            d="M14 6C14 4.89543 14.8954 4 16 4H84C85.1046 4 86 4.89543 86 6V21C86 22.1046 85.1046 23 84 23H16C14.8954 23 14 22.1046 14 21V6Z"
            fill="#DADFE6"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M36.3855 31.5C36.3855 31.0692 36.0362 30.72 35.6055 30.72H31.6673C31.2365 30.72 30.8873 31.0692 30.8873 31.5C30.8873 31.9308 31.2365 32.28 31.6673 32.28H35.6055C36.0362 32.28 36.3855 31.9308 36.3855 31.5ZM31.2146 31.3699C31.2146 31.1904 31.3601 31.0449 31.5396 31.0449H35.7332C35.9127 31.0449 36.0582 31.1904 36.0582 31.3699V31.4331C36.0582 31.5777 35.941 31.6949 35.7965 31.6949H35.5998C35.5639 31.6949 35.5347 31.724 35.5347 31.7599C35.5347 31.7959 35.5056 31.825 35.4697 31.825H34.9453C34.9093 31.825 34.8802 31.7959 34.8802 31.7599C34.8802 31.724 34.8511 31.6949 34.8151 31.6949H34.5525C34.5165 31.6949 34.4874 31.724 34.4874 31.7599C34.4874 31.7959 34.4583 31.825 34.4223 31.825H33.8979C33.862 31.825 33.8329 31.7959 33.8329 31.7599C33.8329 31.724 33.8037 31.6949 33.7678 31.6949H33.5051C33.4692 31.6949 33.4401 31.724 33.4401 31.7599C33.4401 31.7959 33.4109 31.825 33.375 31.825H32.8506C32.8146 31.825 32.7855 31.7959 32.7855 31.7599C32.7855 31.724 32.7564 31.6949 32.7205 31.6949H32.4578C32.4219 31.6949 32.3927 31.724 32.3927 31.7599C32.3927 31.7959 32.3636 31.825 32.3277 31.825H31.8032C31.7673 31.825 31.7382 31.7959 31.7382 31.7599C31.7382 31.724 31.7091 31.6949 31.6731 31.6949H31.4764C31.3318 31.6949 31.2146 31.5777 31.2146 31.4331V31.3699Z"
            fill="#DADFE6"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M41.36 31.5C41.36 31.0692 41.7092 30.72 42.14 30.72H46.0782C46.509 30.72 46.8582 31.0692 46.8582 31.5C46.8582 31.9308 46.509 32.28 46.0782 32.28H42.14C41.7092 32.28 41.36 31.9308 41.36 31.5ZM41.6873 31.3699C41.6873 31.1904 41.8328 31.0449 42.0123 31.0449H46.2059C46.3854 31.0449 46.5309 31.1904 46.5309 31.3699V31.4331C46.5309 31.5777 46.4138 31.6949 46.2692 31.6949H46.0725C46.0366 31.6949 46.0075 31.724 46.0075 31.7599C46.0075 31.7959 45.9783 31.825 45.9424 31.825H45.418C45.382 31.825 45.3529 31.7959 45.3529 31.7599C45.3529 31.724 45.3238 31.6949 45.2879 31.6949H45.0252C44.9893 31.6949 44.9601 31.724 44.9601 31.7599C44.9601 31.7959 44.931 31.825 44.8951 31.825H44.3706C44.3347 31.825 44.3056 31.7959 44.3056 31.7599C44.3056 31.724 44.2765 31.6949 44.2405 31.6949H43.9779C43.9419 31.6949 43.9128 31.724 43.9128 31.7599C43.9128 31.7959 43.8837 31.825 43.8477 31.825H43.3233C43.2874 31.825 43.2582 31.7959 43.2582 31.7599C43.2582 31.724 43.2291 31.6949 43.1932 31.6949H42.9305C42.8946 31.6949 42.8655 31.724 42.8655 31.7599C42.8655 31.7959 42.8363 31.825 42.8004 31.825H42.276C42.24 31.825 42.2109 31.7959 42.2109 31.7599C42.2109 31.724 42.1818 31.6949 42.1458 31.6949H41.9491C41.8045 31.6949 41.6873 31.5777 41.6873 31.4331V31.3699Z"
            fill="#DADFE6"
        />
        <path
            d="M60.8 32.605C60.1855 32.605 59.6873 32.1103 59.6873 31.5C59.6873 30.8897 60.1855 30.395 60.8 30.395C61.4145 30.395 61.9127 30.8897 61.9127 31.5C61.9127 32.1103 61.4145 32.605 60.8 32.605Z"
            fill="#DADFE6"
        />
        <path
            d="M54.2545 31.045H52.2909C52.0379 31.045 51.8327 31.2487 51.8327 31.5C51.8327 31.7513 52.0379 31.955 52.2909 31.955H54.2545C54.5076 31.955 54.7127 31.7513 54.7127 31.5C54.7127 31.2487 54.5076 31.045 54.2545 31.045Z"
            fill="#DADFE6"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 27C14 25.8954 14.8954 25 16 25H84C85.1046 25 86 25.8954 86 27V36C86 37.1046 85.1046 38 84 38H16C14.8954 38 14 37.1046 14 36V27ZM31.6636 30.2C30.9457 30.2 30.3636 30.782 30.3636 31.5C30.3636 32.218 30.9457 32.8 31.6636 32.8H35.6091C36.3271 32.8 36.9091 32.218 36.9091 31.5C36.9091 30.782 36.3271 30.2 35.6091 30.2H31.6636ZM42.1364 32.8C41.4184 32.8 40.8364 32.218 40.8364 31.5C40.8364 30.782 41.4184 30.2 42.1364 30.2H46.0818C46.7998 30.2 47.3818 30.782 47.3818 31.5C47.3818 32.218 46.7998 32.8 46.0818 32.8H42.1364ZM59.1636 31.5C59.1636 30.6025 59.8963 29.875 60.8 29.875C61.7037 29.875 62.4364 30.6025 62.4364 31.5C62.4364 32.3975 61.7037 33.125 60.8 33.125C59.8963 33.125 59.1636 32.3975 59.1636 31.5ZM51.3091 31.5C51.3091 30.9615 51.7487 30.525 52.2909 30.525H54.2545C54.7968 30.525 55.2364 30.9615 55.2364 31.5C55.2364 32.0385 54.7968 32.475 54.2545 32.475H52.2909C51.7487 32.475 51.3091 32.0385 51.3091 31.5Z"
            fill="#DADFE6"
        />
        <rect
            x="66.3638"
            y="29.9091"
            width="3.27273"
            height="3.27273"
            rx="1.63636"
            fill="#929AA3"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.149 31.5454C67.149 32.0153 67.5299 32.3963 67.9999 32.3963C68.4698 32.3963 68.8508 32.0153 68.8508 31.5454C68.8508 31.0754 68.4698 30.6945 67.9999 30.6945C67.5299 30.6945 67.149 31.0754 67.149 31.5454ZM67.9999 30.5636C67.4576 30.5636 67.0181 31.0031 67.0181 31.5454C67.0181 32.0876 67.4576 32.5272 67.9999 32.5272C68.5421 32.5272 68.9817 32.0876 68.9817 31.5454C68.9817 31.0031 68.5421 30.5636 67.9999 30.5636Z"
            fill="white"
        />
        <g filter="url(#filter3_i_988_10640)">
            <rect x="14" y="40" width="72" height="36" rx="2" fill="#B8C0CC" />
        </g>
        <path
            d="M23 80H27V81C27 81.5523 26.5523 82 26 82H24C23.4477 82 23 81.5523 23 81V80Z"
            fill="#7E858C"
        />
        <path
            d="M73 80H77V81C77 81.5523 76.5523 82 76 82H74C73.4477 82 73 81.5523 73 81V80Z"
            fill="#7E858C"
        />

        <g name="diskABCD">
            <rect x="76" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="78" y="71" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="68" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="65" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="62" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="59" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="56" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="53" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="50" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="47" width="4" height="1" fill="#DADFE6" />
            <rect x="78" y="44" width="4" height="1" fill="#DADFE6" />
        </g>
        <g name="disk1">
            <rect x="16" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="18" y="62" width="4" height="10" rx="1" fill="#DADFE6" />
        </g>
        <g name="disk2">
            <rect x="26" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="28" y="62" width="4" height="10" rx="1" fill="#DADFE6" />
        </g>
        <g name="disk3">
            <rect x="36" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="38" y="62" width="4" height="10" rx="1" fill="#DADFE6" />
        </g>
        <g name="disk4">
            <rect x="46" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="48" y="62" width="4" height="10" rx="1" fill="#DADFE6" />
        </g>
        <g name="disk5">
            <rect x="56" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="58" y="62" width="4" height="10" rx="1" fill="#DADFE6" />
        </g>
        <g name="disk6">
            <rect x="66" y="42" width="8" height="32" rx="1" fill="white" />
            <rect x="68" y="62" width="4" height="10" rx="1" fill="#DADFE6" />
        </g>

        <g opacity="0.8">
            <g opacity="0.4" filter="url(#filter4_f_988_10640)">
                <path
                    d="M124.811 74.2971C125.569 73.4706 126.638 73 127.76 73H344.24C345.362 73 346.431 73.4706 347.189 74.2971L350.856 78.2971C353.207 80.8627 351.387 85 347.907 85H124.093C120.613 85 118.793 80.8627 121.144 78.2971L124.811 74.2971Z"
                    fill="#6C7480"
                />
            </g>
            <g opacity="0.4" filter="url(#filter5_f_988_10640)">
                <path
                    d="M123.828 78.1716C124.579 77.4214 125.596 77 126.657 77H344.552C345.488 77 346.394 77.3281 347.113 77.9271L347.756 78.4636C349.193 79.6611 348.346 82 346.476 82H124.828C123.047 82 122.154 79.8457 123.414 78.5858L123.828 78.1716Z"
                    fill="#6C7480"
                />
            </g>
        </g>
        <g filter="url(#filter6_iiii_988_10640)">
            <rect
                x="122"
                width="228"
                height="80"
                rx="8"
                fill="url(#paint1_linear_988_10640)"
            />
        </g>
        <g filter="url(#filter7_i_988_10640)">
            <rect x="130" y="8" width="124" height="64" rx="4" fill="#B8C0CC" />
        </g>
        <rect
            x="130.5"
            y="8.5"
            width="123"
            height="63"
            rx="3.5"
            stroke="#CFD8E5"
        />
        <g filter="url(#filter8_i_988_10640)">
            <rect x="258" y="8" width="84" height="64" rx="4" fill="#B8C0CC" />
        </g>
        <rect
            x="258.5"
            y="8.5"
            width="83"
            height="63"
            rx="3.5"
            stroke="#CFD8E5"
        />

        <defs>
            <filter
                id="filter0_f_988_10640"
                x="4"
                y="69"
                width="92"
                height="22"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation="3"
                    result="effect1_foregroundBlur_988_10640"
                />
            </filter>
            <filter
                id="filter1_f_988_10640"
                x="13"
                y="76"
                width="74"
                height="10"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation="1.5"
                    result="effect1_foregroundBlur_988_10640"
                />
            </filter>
            <filter
                id="filter2_iiii_988_10640"
                x="10"
                y="-2"
                width="80"
                height="84"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_988_10640"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_innerShadow_988_10640"
                    result="effect2_innerShadow_988_10640"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="-2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.358333 0 0 0 0 0.375694 0 0 0 0 0.4 0 0 0 0.3 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect2_innerShadow_988_10640"
                    result="effect3_innerShadow_988_10640"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="-1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect3_innerShadow_988_10640"
                    result="effect4_innerShadow_988_10640"
                />
            </filter>
            <filter
                id="filter3_i_988_10640"
                x="14"
                y="40"
                width="72"
                height="37"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.537255 0 0 0 0 0.564706 0 0 0 0 0.6 0 0 0 0.3 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_988_10640"
                />
            </filter>
            <filter
                id="filter4_f_988_10640"
                x="112.085"
                y="65"
                width="247.83"
                height="28"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation="4"
                    result="effect1_foregroundBlur_988_10640"
                />
            </filter>
            <filter
                id="filter5_f_988_10640"
                x="118.824"
                y="73"
                width="233.656"
                height="13"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation="2"
                    result="effect1_foregroundBlur_988_10640"
                />
            </filter>
            <filter
                id="filter6_iiii_988_10640"
                x="122"
                y="-2"
                width="228"
                height="84"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_988_10640"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_innerShadow_988_10640"
                    result="effect2_innerShadow_988_10640"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="-2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.358333 0 0 0 0 0.375694 0 0 0 0 0.4 0 0 0 0.3 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect2_innerShadow_988_10640"
                    result="effect3_innerShadow_988_10640"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="-1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect3_innerShadow_988_10640"
                    result="effect4_innerShadow_988_10640"
                />
            </filter>
            <filter
                id="filter7_i_988_10640"
                x="130"
                y="8"
                width="124"
                height="65"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.537255 0 0 0 0 0.564706 0 0 0 0 0.6 0 0 0 0.3 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_988_10640"
                />
            </filter>
            <filter
                id="filter8_i_988_10640"
                x="258"
                y="8"
                width="84"
                height="65"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.537255 0 0 0 0 0.564706 0 0 0 0 0.6 0 0 0 0.3 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_988_10640"
                />
            </filter>
            <linearGradient
                id="paint0_linear_988_10640"
                x1="39.9516"
                y1="-1.81024"
                x2="68.7092"
                y2="74.6877"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#ACB4BF" />
                <stop offset="1" stop-color="#899099" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_988_10640"
                x1="207.362"
                y1="-1.81024"
                x2="218.682"
                y2="84.0053"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#ACB4BF" />
                <stop offset="1" stop-color="#949CA6" />
            </linearGradient>
        </defs>
        <!-- HDD -->
        <path
            d="M186.904 91.1367V92.0566H182.287V91.1367H186.904ZM182.463 87.4688V96H181.332V87.4688H182.463ZM187.889 87.4688V96H186.764V87.4688H187.889ZM192.207 96H190.426L190.438 95.0801H192.207C192.816 95.0801 193.324 94.9531 193.73 94.6992C194.137 94.4414 194.441 94.082 194.645 93.6211C194.852 93.1562 194.955 92.6133 194.955 91.9922V91.4707C194.955 90.9824 194.896 90.5488 194.779 90.1699C194.662 89.7871 194.49 89.4648 194.264 89.2031C194.037 88.9375 193.76 88.7363 193.432 88.5996C193.107 88.4629 192.734 88.3945 192.312 88.3945H190.391V87.4688H192.312C192.871 87.4688 193.381 87.5625 193.842 87.75C194.303 87.9336 194.699 88.2012 195.031 88.5527C195.367 88.9004 195.625 89.3223 195.805 89.8184C195.984 90.3105 196.074 90.8652 196.074 91.4824V91.9922C196.074 92.6094 195.984 93.166 195.805 93.6621C195.625 94.1543 195.365 94.5742 195.025 94.9219C194.689 95.2695 194.283 95.5371 193.807 95.7246C193.334 95.9082 192.801 96 192.207 96ZM191.029 87.4688V96H189.898V87.4688H191.029ZM200.082 96H198.301L198.312 95.0801H200.082C200.691 95.0801 201.199 94.9531 201.605 94.6992C202.012 94.4414 202.316 94.082 202.52 93.6211C202.727 93.1562 202.83 92.6133 202.83 91.9922V91.4707C202.83 90.9824 202.771 90.5488 202.654 90.1699C202.537 89.7871 202.365 89.4648 202.139 89.2031C201.912 88.9375 201.635 88.7363 201.307 88.5996C200.982 88.4629 200.609 88.3945 200.188 88.3945H198.266V87.4688H200.188C200.746 87.4688 201.256 87.5625 201.717 87.75C202.178 87.9336 202.574 88.2012 202.906 88.5527C203.242 88.9004 203.5 89.3223 203.68 89.8184C203.859 90.3105 203.949 90.8652 203.949 91.4824V91.9922C203.949 92.6094 203.859 93.166 203.68 93.6621C203.5 94.1543 203.24 94.5742 202.9 94.9219C202.564 95.2695 202.158 95.5371 201.682 95.7246C201.209 95.9082 200.676 96 200.082 96ZM198.904 87.4688V96H197.773V87.4688H198.904Z"
            fill="#909599"
        />
        <!-- SSD -->
        <path
            d="M294.975 93.8438C294.975 93.6445 294.943 93.4688 294.881 93.3164C294.822 93.1602 294.717 93.0195 294.564 92.8945C294.416 92.7695 294.209 92.6504 293.943 92.5371C293.682 92.4238 293.35 92.3086 292.947 92.1914C292.525 92.0664 292.145 91.9277 291.805 91.7754C291.465 91.6191 291.174 91.4414 290.932 91.2422C290.689 91.043 290.504 90.8145 290.375 90.5566C290.246 90.2988 290.182 90.0039 290.182 89.6719C290.182 89.3398 290.25 89.0332 290.387 88.752C290.523 88.4707 290.719 88.2266 290.973 88.0195C291.23 87.8086 291.537 87.6445 291.893 87.5273C292.248 87.4102 292.645 87.3516 293.082 87.3516C293.723 87.3516 294.266 87.4746 294.711 87.7207C295.16 87.9629 295.502 88.2812 295.736 88.6758C295.971 89.0664 296.088 89.4844 296.088 89.9297H294.963C294.963 89.6094 294.895 89.3262 294.758 89.0801C294.621 88.8301 294.414 88.6348 294.137 88.4941C293.859 88.3496 293.508 88.2773 293.082 88.2773C292.68 88.2773 292.348 88.3379 292.086 88.459C291.824 88.5801 291.629 88.7441 291.5 88.9512C291.375 89.1582 291.312 89.3945 291.312 89.6602C291.312 89.8398 291.35 90.0039 291.424 90.1523C291.502 90.2969 291.621 90.4316 291.781 90.5566C291.945 90.6816 292.152 90.7969 292.402 90.9023C292.656 91.0078 292.959 91.1094 293.311 91.207C293.795 91.3438 294.213 91.4961 294.564 91.6641C294.916 91.832 295.205 92.0215 295.432 92.2324C295.662 92.4395 295.832 92.6758 295.941 92.9414C296.055 93.2031 296.111 93.5 296.111 93.832C296.111 94.1797 296.041 94.4941 295.9 94.7754C295.76 95.0566 295.559 95.2969 295.297 95.4961C295.035 95.6953 294.721 95.8496 294.354 95.959C293.99 96.0645 293.584 96.1172 293.135 96.1172C292.74 96.1172 292.352 96.0625 291.969 95.9531C291.59 95.8438 291.244 95.6797 290.932 95.4609C290.623 95.2422 290.375 94.9727 290.188 94.6523C290.004 94.3281 289.912 93.9531 289.912 93.5273H291.037C291.037 93.8203 291.094 94.0723 291.207 94.2832C291.32 94.4902 291.475 94.6621 291.67 94.7988C291.869 94.9355 292.094 95.0371 292.344 95.1035C292.598 95.166 292.861 95.1973 293.135 95.1973C293.529 95.1973 293.863 95.1426 294.137 95.0332C294.41 94.9238 294.617 94.7676 294.758 94.5645C294.902 94.3613 294.975 94.1211 294.975 93.8438ZM302.1 93.8438C302.1 93.6445 302.068 93.4688 302.006 93.3164C301.947 93.1602 301.842 93.0195 301.689 92.8945C301.541 92.7695 301.334 92.6504 301.068 92.5371C300.807 92.4238 300.475 92.3086 300.072 92.1914C299.65 92.0664 299.27 91.9277 298.93 91.7754C298.59 91.6191 298.299 91.4414 298.057 91.2422C297.814 91.043 297.629 90.8145 297.5 90.5566C297.371 90.2988 297.307 90.0039 297.307 89.6719C297.307 89.3398 297.375 89.0332 297.512 88.752C297.648 88.4707 297.844 88.2266 298.098 88.0195C298.355 87.8086 298.662 87.6445 299.018 87.5273C299.373 87.4102 299.77 87.3516 300.207 87.3516C300.848 87.3516 301.391 87.4746 301.836 87.7207C302.285 87.9629 302.627 88.2812 302.861 88.6758C303.096 89.0664 303.213 89.4844 303.213 89.9297H302.088C302.088 89.6094 302.02 89.3262 301.883 89.0801C301.746 88.8301 301.539 88.6348 301.262 88.4941C300.984 88.3496 300.633 88.2773 300.207 88.2773C299.805 88.2773 299.473 88.3379 299.211 88.459C298.949 88.5801 298.754 88.7441 298.625 88.9512C298.5 89.1582 298.438 89.3945 298.438 89.6602C298.438 89.8398 298.475 90.0039 298.549 90.1523C298.627 90.2969 298.746 90.4316 298.906 90.5566C299.07 90.6816 299.277 90.7969 299.527 90.9023C299.781 91.0078 300.084 91.1094 300.436 91.207C300.92 91.3438 301.338 91.4961 301.689 91.6641C302.041 91.832 302.33 92.0215 302.557 92.2324C302.787 92.4395 302.957 92.6758 303.066 92.9414C303.18 93.2031 303.236 93.5 303.236 93.832C303.236 94.1797 303.166 94.4941 303.025 94.7754C302.885 95.0566 302.684 95.2969 302.422 95.4961C302.16 95.6953 301.846 95.8496 301.479 95.959C301.115 96.0645 300.709 96.1172 300.26 96.1172C299.865 96.1172 299.477 96.0625 299.094 95.9531C298.715 95.8438 298.369 95.6797 298.057 95.4609C297.748 95.2422 297.5 94.9727 297.312 94.6523C297.129 94.3281 297.037 93.9531 297.037 93.5273H298.162C298.162 93.8203 298.219 94.0723 298.332 94.2832C298.445 94.4902 298.6 94.6621 298.795 94.7988C298.994 94.9355 299.219 95.0371 299.469 95.1035C299.723 95.166 299.986 95.1973 300.26 95.1973C300.654 95.1973 300.988 95.1426 301.262 95.0332C301.535 94.9238 301.742 94.7676 301.883 94.5645C302.027 94.3613 302.1 94.1211 302.1 93.8438ZM306.986 96H305.205L305.217 95.0801H306.986C307.596 95.0801 308.104 94.9531 308.51 94.6992C308.916 94.4414 309.221 94.082 309.424 93.6211C309.631 93.1562 309.734 92.6133 309.734 91.9922V91.4707C309.734 90.9824 309.676 90.5488 309.559 90.1699C309.441 89.7871 309.27 89.4648 309.043 89.2031C308.816 88.9375 308.539 88.7363 308.211 88.5996C307.887 88.4629 307.514 88.3945 307.092 88.3945H305.17V87.4688H307.092C307.65 87.4688 308.16 87.5625 308.621 87.75C309.082 87.9336 309.479 88.2012 309.811 88.5527C310.146 88.9004 310.404 89.3223 310.584 89.8184C310.764 90.3105 310.854 90.8652 310.854 91.4824V91.9922C310.854 92.6094 310.764 93.166 310.584 93.6621C310.404 94.1543 310.145 94.5742 309.805 94.9219C309.469 95.2695 309.062 95.5371 308.586 95.7246C308.113 95.9082 307.58 96 306.986 96ZM305.809 87.4688V96H304.678V87.4688H305.809Z"
            fill="#909599"
        />
    </svg>
    <!-- <OverlayPanel ref="op">
            <div>
                <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Health:</span>
                <span class="text-green-600 text-sm font-medium font-['Roboto'] leading-5">Healthy</span>
            </div>
            <div>
                <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Temperature:</span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">36.6 °C</span>
            </div>
        </OverlayPanel> -->
</template>
