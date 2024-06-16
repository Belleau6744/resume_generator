import { IconProps } from "@types";

const OpenIcon = ({ width = 30, height = 30 }: IconProps) => {
    return (
        <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="icon" fill="#000000" transform="translate(85.333333, 64.000000)">
                    <path d="M128,63.999444 L128,106.666444 L42.6666667,106.666667 L42.6666667,320 L256,320 L256,234.666444 L298.666,234.666444 L298.666667,362.666667 L4.26325641e-14,362.666667 L4.26325641e-14,64 L128,63.999444 Z M362.666667,1.42108547e-14 L362.666667,170.666667 L320,170.666667 L320,72.835 L143.084945,249.751611 L112.915055,219.581722 L289.83,42.666 L192,42.6666667 L192,1.42108547e-14 L362.666667,1.42108547e-14 Z" id="Combined-Shape"></path>
                </g>
            </g>
        </svg>
    )
}

export default OpenIcon;