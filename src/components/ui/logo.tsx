import Image from "next/image";

interface LogoProps {
  width: number;
  height: number;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ width, height, alt }) => {
  return (
    <Image
      src="/rick-and-morty-search-logo.png"
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Logo;
