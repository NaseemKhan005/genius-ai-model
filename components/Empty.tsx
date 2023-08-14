import Image from "next/image";

interface EmptyProps {
  image: string;
  alt: string;
  label: string;
}

const Empty = ({ image: imgSrc, alt, label }: EmptyProps) => {
  return (
    <div className="select-none w-full h-full flex items-center justify-center">
      <div className="flex flex-col">
        <Image
          src={imgSrc}
          alt={alt}
          width={300}
          height={300}
          className="mx-auto select-none drop-shadow-xl"
        />
        <p className="text-center text-muted-foreground text-xs md:text-sm 2xl:text-base">{label}</p>
      </div>
    </div>
  );
};

export default Empty;
