import Image from "next/image";

const Loader = () => {
  return (
    <div className="select-none w-full h-full p-20 flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <Image
          src="/logo.png"
          alt="logo"
          width={45}
          height={45}
          className="mx-auto animate-spin"
        />
        <p className="text-center animate-pulse text-sm text-muted-foreground">
          Genius is Thinking...
        </p>
      </div>
    </div>
  );
};

export default Loader;
