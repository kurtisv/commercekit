"use client";

import dynamic from "next/dynamic";

import { CommerceKitSceneFallback } from "./CommerceKitSceneFallback";
import { ThreeSceneShell } from "./ThreeSceneShell";

const CommerceKitSceneCanvas = dynamic(() => import("./CommerceKitSceneCanvas"), {
  ssr: false,
  loading: () => <CommerceKitSceneFallback />,
});

export function CommerceKitScene() {
  return (
    <ThreeSceneShell
      label="CommerceKit premium commerce kit"
      fallback={<CommerceKitSceneFallback />}
      className="h-[420px] sm:h-[460px] lg:h-[520px]"
    >
      <CommerceKitSceneCanvas />
    </ThreeSceneShell>
  );
}
