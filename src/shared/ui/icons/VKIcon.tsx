interface VKIconProps {
  className?: string;
}

export const VKIcon = ({ className }: VKIconProps) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="30" cy="30" r="30" fill="#2EF3CB" />
    <path
      d="M111.541 41.2457C100.602 41.2457 94.3616 33.7481 94.1024 21.2681H99.584C99.7664 30.4265 103.803 34.3097 107.005 35.1065V21.2681H112.165V29.1689C115.323 28.8281 118.645 25.2281 119.763 21.2681H124.923C124.064 26.1497 120.464 29.7497 117.906 31.2281C120.464 32.4281 124.568 35.5673 126.128 41.2505H120.45C119.23 37.4489 116.192 34.5113 112.17 34.1081V41.2505H111.55L111.541 41.2457Z"
      fill="#1E1E1E"
      transform="translate(-80 0)"
    />
  </svg>
);
