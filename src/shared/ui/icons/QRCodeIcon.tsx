interface QRCodeIconProps {
  className?: string;
}

export const QRCodeIcon = ({ className }: QRCodeIconProps) => (
  <svg
    width="113"
    height="113"
    viewBox="0 0 113 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="113" height="113" rx="10" fill="white" />
    {/* QR код паттерн - упрощенная версия */}
    <rect x="20" y="20" width="8" height="8" fill="black" />
    <rect x="32" y="20" width="8" height="8" fill="black" />
    <rect x="44" y="20" width="8" height="8" fill="black" />
    <rect x="56" y="20" width="8" height="8" fill="black" />
    <rect x="68" y="20" width="8" height="8" fill="black" />
    <rect x="80" y="20" width="8" height="8" fill="black" />
    
    <rect x="20" y="32" width="8" height="8" fill="black" />
    <rect x="44" y="32" width="8" height="8" fill="black" />
    <rect x="68" y="32" width="8" height="8" fill="black" />
    
    <rect x="20" y="44" width="8" height="8" fill="black" />
    <rect x="32" y="44" width="8" height="8" fill="black" />
    <rect x="44" y="44" width="8" height="8" fill="black" />
    <rect x="56" y="44" width="8" height="8" fill="black" />
    <rect x="68" y="44" width="8" height="8" fill="black" />
    <rect x="80" y="44" width="8" height="8" fill="black" />
    
    <rect x="20" y="56" width="8" height="8" fill="black" />
    <rect x="44" y="56" width="8" height="8" fill="black" />
    <rect x="68" y="56" width="8" height="8" fill="black" />
    
    <rect x="20" y="68" width="8" height="8" fill="black" />
    <rect x="32" y="68" width="8" height="8" fill="black" />
    <rect x="44" y="68" width="8" height="8" fill="black" />
    <rect x="56" y="68" width="8" height="8" fill="black" />
    <rect x="68" y="68" width="8" height="8" fill="black" />
    <rect x="80" y="68" width="8" height="8" fill="black" />
    
    <rect x="20" y="80" width="8" height="8" fill="black" />
    <rect x="44" y="80" width="8" height="8" fill="black" />
    <rect x="68" y="80" width="8" height="8" fill="black" />
    
    <rect x="20" y="92" width="8" height="8" fill="black" />
    <rect x="32" y="92" width="8" height="8" fill="black" />
    <rect x="44" y="92" width="8" height="8" fill="black" />
    <rect x="56" y="92" width="8" height="8" fill="black" />
    <rect x="68" y="92" width="8" height="8" fill="black" />
    <rect x="80" y="92" width="8" height="8" fill="black" />
  </svg>
);
