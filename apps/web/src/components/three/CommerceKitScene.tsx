import Image from "next/image";

const desktopImage = "/images/hero/commercekit-hero-3d.svg";
const mobileImage = "/images/hero/commercekit-hero-3d-mobile.svg";

export function CommerceKitScene() {
  return (
    <div className="commercekit-hero-image group relative h-[420px] overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#211913] shadow-2xl shadow-stone-950/25 sm:h-[460px] lg:h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(241,213,155,0.22),transparent_17rem),radial-gradient(circle_at_80%_24%,rgba(146,166,123,0.18),transparent_18rem),linear-gradient(150deg,#1e1812,#2f241b_52%,#231b14)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

      <div className="absolute inset-0 hidden md:block">
        <Image
          src={desktopImage}
          alt=""
          fill
          priority
          unoptimized
          aria-hidden="true"
          sizes="(max-width: 1279px) 48vw, 42rem"
          className="object-contain object-center p-5 transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-[1.012]"
        />
      </div>

      <div className="absolute inset-0 md:hidden">
        <Image
          src={mobileImage}
          alt=""
          fill
          priority
          unoptimized
          aria-hidden="true"
          sizes="100vw"
          className="object-contain object-center p-4 transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.01]"
        />
      </div>

      <div className="absolute inset-y-0 left-[-28%] w-[38%] bg-[linear-gradient(110deg,transparent,rgba(255,245,220,0.18),transparent)] opacity-30 mix-blend-screen transition-transform duration-1000 ease-out motion-reduce:hidden motion-safe:group-hover:translate-x-[210%]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#17110d] via-[#17110d]/55 to-transparent" />
    </div>
  );
}
