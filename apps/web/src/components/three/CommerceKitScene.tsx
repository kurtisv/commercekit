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
    <ThreeSceneShell label="CommerceKit 3D commerce operations flow" fallback={<CommerceKitSceneFallback />}>
      <CommerceKitSceneCanvas />
    </ThreeSceneShell>
  );
}
