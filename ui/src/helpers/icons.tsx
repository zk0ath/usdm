import React from "react";
import { FC } from "react";

interface IIcons {
  fillColor?: string;
  width?: string;
  height?: string;
  transform?: string;
  className?: string;
}

export const ParticipantsIcon: FC<IIcons> = ({ fillColor }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 2C2 1.44687 1.55313 1 1 1C0.446875 1 0 1.44687 0 2V12.5C0 13.8813 1.11875 15 2.5 15H15C15.5531 15 16 14.5531 16 14C16 13.4469 15.5531 13 15 13H2.5C2.225 13 2 12.775 2 12.5V2ZM14.7063 4.70625C15.0969 4.31563 15.0969 3.68125 14.7063 3.29063C14.3156 2.9 13.6812 2.9 13.2906 3.29063L10 6.58437L8.20625 4.79063C7.81563 4.4 7.18125 4.4 6.79063 4.79063L3.29063 8.29062C2.9 8.68125 2.9 9.31563 3.29063 9.70625C3.68125 10.0969 4.31563 10.0969 4.70625 9.70625L7.5 6.91563L9.29375 8.70938C9.68437 9.1 10.3188 9.1 10.7094 8.70938L14.7094 4.70937L14.7063 4.70625Z" />
  </svg>
);
export const ArrowDown: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke={fillColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ArrowRight: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0202 7.64641C11.2155 7.84167 11.2155 8.15825 11.0202 8.35351L5.68688 13.6868C5.49161 13.8821 5.17503 13.8821 4.97977 13.6868C4.78451 13.4916 4.78451 13.175 4.97977 12.9797L9.95955 7.99996L4.97977 3.02018C4.78451 2.82492 4.78451 2.50833 4.97977 2.31307C5.17503 2.11781 5.49161 2.11781 5.68688 2.31307L11.0202 7.64641Z"
      fill="#4F86FF"
    />
  </svg>
);
export const MinaLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 180"
    fill="#ff603b"
    width={width}
    height={height}
  >
    <path
      className="cls-1"
      d="M90,152.74a9.1,9.1,0,0,1-9.34-8.31l-1-8.23c-10-2.85-15.86-10.25-17.37-22l-9-69.34a33.52,33.52,0,0,0-5.85-.42,31.56,31.56,0,0,0-8.56,1.11V150.71H21.18V66.18c0-11.47,5.14-19.57,14.53-22.94V37.79c0-6.3,3.82-10.53,9.51-10.53s9.26,3.54,10.18,10l.7,5.05c10.25,2.9,16.32,11.15,18.06,24.54l8.31,66.84a39.74,39.74,0,0,0,15.06,0l8.31-66.83c1.74-13.4,7.81-21.65,18.06-24.55l.7-5.05c.92-6.43,4.53-10,10.18-10s9.51,4.23,9.51,10.53v5.45c9.39,3.37,14.53,11.47,14.53,22.94v84.53H141.14V45.54a31.62,31.62,0,0,0-8.56-1.11,33.52,33.52,0,0,0-5.85.42l-9,69.35c-1.48,11.54-7.48,19.12-17.37,22l-1,8.25A8.89,8.89,0,0,1,90,152.74ZM82.89,137l.9,7.09A5.92,5.92,0,0,0,90,149.59a5.8,5.8,0,0,0,6.21-5.54l.9-7.1a43.87,43.87,0,0,1-14.22,0Zm61.4,10.61h11.38V66.18c0-9.72-3.92-16.43-11.38-19.56Zm-120,0H35.71V46.62c-7.46,3.13-11.38,9.84-11.38,19.56ZM56.56,45.72l8.81,68.07c1.27,9.85,5.91,16.22,13.82,19L71,67.21C69.53,55.65,64.79,48.59,56.56,45.72Zm66.88,0c-8.23,2.87-13,9.93-14.47,21.5l-8.15,65.53c7.9-2.78,12.55-9.15,13.81-19ZM38.86,42.24v0a35.31,35.31,0,0,1,8.56-1,39,39,0,0,1,5.41.32l-.55-3.93c-.69-4.82-3.06-7.26-7.06-7.26s-6.36,2.83-6.36,7.38Zm93.72-1a35.31,35.31,0,0,1,8.56,1V37.79c0-4.55-2.44-7.38-6.36-7.38s-6.37,2.44-7.06,7.26l-.55,3.93A39,39,0,0,1,132.58,41.28Z"
    />
  </svg>
);
export const UsdcLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    data-name="86977684-12db-4850-8f30-233a7c267d11"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 2000"
    width={width}
    height={height}
  >
    <path
      d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
      fill="#2775ca"
    />
    <path
      d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
      fill="#fff"
    />
    <path
      d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
      fill="#fff"
    />
  </svg>
);

export const EthereumLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    height={height}
    viewBox="420.1 80.7 1079.8 1758.6"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m959.8 80.7-539.7 895.6 539.7-245.3z" fill="#8a92b2" />
    <path
      d="m959.8 731-539.7 245.3 539.7 319.1zm539.8 245.3-539.8-895.6v650.3z"
      fill="#62688f"
    />
    <path d="m959.8 1295.4 539.8-319.1-539.8-245.3z" fill="#454a75" />
    <path d="m420.1 1078.7 539.7 760.6v-441.7z" fill="#8a92b2" />
    <path d="m959.8 1397.6v441.7l540.1-760.6z" fill="#62688f" />
  </svg>
);
export const ProcessIcon: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 15.62V19"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.01965 13.98L3.63965 16.36"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.38 10H1"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.63965 3.64001L6.01965 6.02001"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 4V1"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.7695 5.23001L16.3595 3.64001"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 10H17.5"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.3597 16.36L15.8297 15.83"
      stroke="#090A0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ChangeChain: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={width} height={height} rx="16" fill="#F4F5F6" />
    <path
      d="M28.502 22.793L31.399 19.897L28.502 17"
      stroke="#8BB7A2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.3994 19.9H31.3994"
      stroke="#8BB7A2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2964 25.207L17.3994 28.103L20.2964 31"
      stroke="#8BB7A2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.3994 28.1H17.3994"
      stroke="#8BB7A2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const DottedLine: FC<IIcons & { animated?: boolean }> = ({ width, height, fillColor, animated = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "250"}
    height={height || "2"}
    viewBox="0 0 250 2"
    fill="none"
    className={animated ? 'animatedDottedLine' : ''}
  >
    <path d="M0 1H249.25" stroke={animated ? "#77BF3D" : "#788691"} strokeDasharray="3 3" />
  </svg>
);
export const TelegramLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.7263 22.5413L12.9729 25.2199C12.4956 25.6839 11.6969 25.4786 11.5036 24.8413L9.66895 18.8013"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8051 14.5693C18.8051 14.5693 15.3531 17.6839 13.5824 19.2826C13.0531 19.7599 13.0971 20.5999 13.6704 21.0226L20.8411 26.3199C21.5464 26.8413 22.5544 26.4586 22.7371 25.5999L26.2584 9.00394C26.4291 8.20128 25.6411 7.53061 24.8758 7.82528L4.18911 15.8039C3.57977 16.0386 3.60911 16.9093 4.23177 17.1039L9.66778 18.7999"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const TwitterLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.35 12.4667C26.35 12.0525 26.0142 11.7167 25.6 11.7167C25.1858 11.7167 24.85 12.0525 24.85 12.4667H26.35ZM4.60565 21.6243C4.36134 21.2898 3.89213 21.2167 3.55764 21.461C3.22314 21.7053 3.15004 22.1745 3.39435 22.509L4.60565 21.6243ZM3.87257 21.3276C3.46438 21.398 3.19053 21.7859 3.2609 22.1941C3.33128 22.6023 3.71924 22.8761 4.12743 22.8058L3.87257 21.3276ZM7.6 20.8667L7.83829 21.5778C8.08386 21.4955 8.26961 21.2924 8.3296 21.0404C8.3896 20.7885 8.31535 20.5234 8.13322 20.3392L7.6 20.8667ZM6.4 6.46667L7.06058 6.11152C6.93797 5.88346 6.70639 5.73478 6.44798 5.71821C6.18958 5.70164 5.94091 5.81954 5.79018 6.03007L6.4 6.46667ZM13.6 12.4667L13.4229 13.1955C13.6422 13.2488 13.8739 13.2004 14.0537 13.0639C14.2334 12.9273 14.3421 12.7171 14.3496 12.4915L13.6 12.4667ZM24.4 8.86667L23.7738 9.27945C23.9126 9.48997 24.1479 9.61667 24.4 9.61667V8.86667ZM28 8.86667L28.624 9.2827C28.7775 9.05256 28.7918 8.75665 28.6613 8.51278C28.5307 8.26891 28.2766 8.11667 28 8.11667V8.86667ZM24.976 12.0506C24.7462 12.3953 24.8393 12.8609 25.184 13.0907C25.5286 13.3205 25.9943 13.2273 26.224 12.8827L24.976 12.0506ZM24.85 12.4667C24.85 16.5286 23.6901 19.9377 21.5876 22.3205C19.4954 24.6916 16.4093 26.1167 12.4 26.1167V27.6167C16.7907 27.6167 20.3046 26.0417 22.7124 23.3129C25.1099 20.5957 26.35 16.8047 26.35 12.4667H24.85ZM12.4 26.1167C10.1446 26.1167 8.61715 25.5325 7.46172 24.7149C6.28337 23.8811 5.44722 22.7765 4.60565 21.6243L3.39435 22.509C4.22878 23.6515 5.19263 24.9469 6.59528 25.9394C8.02085 26.9481 9.85542 27.6167 12.4 27.6167V26.1167ZM4.12743 22.8058C4.15123 22.8017 4.16967 22.7973 4.17608 22.7957C4.1848 22.7936 4.19188 22.7918 4.19617 22.7906C4.20475 22.7883 4.21182 22.7862 4.21566 22.7851C4.22379 22.7827 4.23145 22.7804 4.23688 22.7787C4.24841 22.7751 4.26236 22.7706 4.27722 22.7658C4.3075 22.7561 4.34936 22.7424 4.40026 22.7256C4.50245 22.692 4.6456 22.6445 4.81543 22.5881C5.15532 22.4751 5.60456 22.3251 6.05223 22.1755C6.49998 22.0259 6.94649 21.8764 7.28104 21.7644C7.44832 21.7084 7.58762 21.6618 7.68511 21.6291C7.73385 21.6128 7.77214 21.6 7.79825 21.5912C7.8113 21.5869 7.82131 21.5835 7.82805 21.5812C7.83143 21.5801 7.83398 21.5793 7.8357 21.5787C7.83656 21.5784 7.8372 21.5782 7.83764 21.578C7.83785 21.578 7.83802 21.5779 7.83812 21.5779C7.83818 21.5779 7.83822 21.5778 7.83825 21.5778C7.83827 21.5778 7.83829 21.5778 7.6 20.8667C7.36171 20.1555 7.3617 20.1555 7.36167 20.1555C7.36164 20.1556 7.3616 20.1556 7.36155 20.1556C7.36144 20.1556 7.36128 20.1557 7.36107 20.1558C7.36064 20.1559 7.35999 20.1561 7.35914 20.1564C7.35743 20.157 7.35488 20.1578 7.35151 20.159C7.34478 20.1612 7.33478 20.1646 7.32174 20.1689C7.29566 20.1777 7.2574 20.1905 7.20869 20.2068C7.11126 20.2394 6.97204 20.2861 6.80484 20.342C6.47043 20.454 6.02419 20.6033 5.57677 20.7528C5.12928 20.9024 4.68093 21.052 4.34219 21.1647C4.17271 21.221 4.03129 21.2679 3.93132 21.3008C3.88114 21.3173 3.84252 21.3299 3.81639 21.3384C3.80303 21.3427 3.79479 21.3453 3.79058 21.3466C3.78814 21.3474 3.78954 21.3469 3.79307 21.3459C3.79461 21.3454 3.7998 21.3439 3.80693 21.342C3.81049 21.341 3.81694 21.3393 3.82514 21.3374C3.83104 21.3359 3.84907 21.3316 3.87257 21.3276L4.12743 22.8058ZM8.13322 20.3392C4.38741 16.5523 4.10617 10.9589 7.00982 6.90328L5.79018 6.03007C2.46983 10.6677 2.79659 17.077 7.06678 21.3941L8.13322 20.3392ZM5.73942 6.82183C7.28849 9.70308 10.1972 12.4115 13.4229 13.1955L13.7771 11.7379C11.0668 11.0792 8.46351 8.72094 7.06058 6.11152L5.73942 6.82183ZM14.3496 12.4915C14.4015 10.9221 14.9564 9.60801 15.8535 8.69124C16.7467 7.77855 18.0202 7.21667 19.6 7.21667V5.71667C17.6451 5.71667 15.976 6.42146 14.7815 7.64211C13.591 8.85867 12.9132 10.5445 12.8504 12.4419L14.3496 12.4915ZM19.6 7.21667C20.7065 7.21667 21.5356 7.42692 22.1829 7.77235C22.8285 8.11691 23.3396 8.6207 23.7738 9.27945L25.0262 8.4539C24.4831 7.62999 23.7975 6.93377 22.8891 6.449C21.9824 5.9651 20.9002 5.71667 19.6 5.71667V7.21667ZM24.4 9.61667H28V8.11667H24.4V9.61667ZM27.376 8.45065L24.976 12.0506L26.224 12.8827L28.624 9.2827L27.376 8.45065Z"
      fill="#111318"
    />
  </svg>
);
export const TheLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="139"
    height="139"
    viewBox="0 0 139 139"
    fill="none"
  >
    <path
      d="M132.348 99.2092C136.614 90.201 139 80.1292 139 69.5C139 31.1162 107.884 0 69.5 0C31.1162 0 0 31.1162 0 69.5C0 107.884 31.1162 139 69.5 139C78.3141 139 86.745 137.359 94.5038 134.366V94.988H78.3398V86.6H120.1V94.988H103.9V129.903C111.373 125.638 117.978 120.026 123.384 113.398V84.044H132.348V99.2092Z"
      fill="#374BFF"
    />
  </svg>
);
export const CurrencyLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="86"
    height="86"
    viewBox="0 0 86 86"
    fill="none"
  >
    <path
      d="M43 86C66.7482 86 86 66.7482 86 43C86 19.2518 66.7482 0 43 0C21.0295 0 2.90744 16.4774 0.317444 37.7486C2.14503 37.2389 4.07931 36.984 6.12028 36.984C8.52028 36.984 10.8123 37.332 12.9963 38.028C14.083 38.3705 15.0767 38.7654 15.9774 39.2126L15.4154 38.136H25.6394L38.1314 62.976L49.1834 38.136H59.4074L36.2877 85.4792C38.4748 85.822 40.7166 86 43 86Z"
      fill="#277EFF"
    />
    <path
      d="M13.9911 74.7412C17.8556 78.275 22.3675 81.1124 27.3283 83.0548L32.9474 71.724L17.6215 42.3624L15.2643 46.812C13.1763 45.204 10.5723 44.4 7.45227 44.4C4.90828 44.4 2.71228 44.964 0.864277 46.092C0.617399 46.2447 0.377996 46.4039 0.146068 46.5698C0.824978 54.8308 3.83901 62.4301 8.52674 68.7064C11.1591 68.548 13.3929 67.7539 15.2283 66.324L18.4683 72.372C17.2263 73.3086 15.7339 74.0983 13.9911 74.7412Z"
      fill="#277EFF"
    />
  </svg>
);
export const YoutubeLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.7777 8.49737C28.4723 7.1587 27.5683 6.1027 26.419 5.74003C24.3403 5.0907 16.0003 5.0907 16.0003 5.0907C16.0003 5.0907 7.66433 5.0907 5.58166 5.74003C4.43633 6.09736 3.53233 7.15337 3.22299 8.49737C2.66699 10.9267 2.66699 16 2.66699 16C2.66699 16 2.66699 21.0734 3.22299 23.5027C3.52833 24.8414 4.43233 25.8974 5.58166 26.26C7.66433 26.9094 16.0003 26.9094 16.0003 26.9094C16.0003 26.9094 24.3403 26.9094 26.419 26.26C27.5643 25.9027 28.4683 24.8467 28.7777 23.5027C29.3337 21.0734 29.3337 16 29.3337 16C29.3337 16 29.3337 10.9267 28.7777 8.49737Z"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3359 20L20.2639 16L13.3359 12V20Z"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const MediumLogo: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.77409 20.64V9.94666"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.6164 7.72664V21.872L19.0777 24.9493V25.3333H28.3084V24.948L26.0004 21.872V8.94531L28.2924 6.82797H28.3004V5.28931H28.3084H21.3471L15.3337 25.3333H14.0777L7.70038 11.1626C7.54705 10.8226 7.33372 10.5133 7.06972 10.2493L3.69238 6.87197V5.33331H11.371L17.3244 18.6973"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.69238 24.9479V25.3333H9.84705V24.9479L6.76972 20.6439L3.69238 24.9479Z"
      stroke="#191D24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const BusdIcon: FC<IIcons> = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9732 3L14.1964 5.27678L8.59821 10.875L6.375 8.65178L11.9732 3Z"
      fill="#F0B90B"
    />
    <path
      d="M15.3482 6.375L17.5714 8.65178L8.59821 17.625L6.375 15.4018L15.3482 6.375Z"
      fill="#F0B90B"
    />
    <path
      d="M5.22321 9.75L7.44643 12.0268L5.22321 14.25L3 12.0268L5.22321 9.75Z"
      fill="#F0B90B"
    />
    <path
      d="M18.7232 9.75L20.9464 12.0268L11.9732 21L9.75 18.7768L18.7232 9.75Z"
      fill="#F0B90B"
    />
  </svg>
);
