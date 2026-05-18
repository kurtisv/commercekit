"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import type { Group, Mesh } from "three";

function ProductBox({ position, color, label, active }: { position: [number, number, number]; color: string; label: string; active: boolean }) {
  const lidRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.72 + position[0]) * 0.04;
    if (lidRef.current) lidRef.current.rotation.x = active ? -0.58 : -0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.92, 0.72, 0.82]} />
        <meshStandardMaterial color={color} roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh ref={lidRef} position={[0, 0.42, -0.08]} castShadow>
        <boxGeometry args={[0.98, 0.08, 0.88]} />
        <meshStandardMaterial color="#fff7ed" roughness={0.28} />
      </mesh>
      <Text position={[0, -0.03, 0.43]} fontSize={0.095} color="#1b1b18" anchorX="center" anchorY="middle" maxWidth={0.76}>
        {label}
      </Text>
    </group>
  );
}

function PaymentTerminal({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.06, -0.34, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.98, 1.2, 0.18]} />
        <meshStandardMaterial color="#1b1b18" roughness={0.2} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0.18, 0.11]}>
        <boxGeometry args={[0.72, 0.36, 0.035]} />
        <meshStandardMaterial color="#2e3f34" emissive="#84cc16" emissiveIntensity={0.12} />
      </mesh>
      <Text position={[0, 0.18, 0.132]} fontSize={0.08} color="#f1d59b" anchorX="center" anchorY="middle">
        PAID
      </Text>
    </group>
  );
}

function Receipt({ active }: { active: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = 0.75 + (active ? 0.18 : 0) + Math.sin(clock.elapsedTime) * 0.035;
  });

  return (
    <group position={[1.35, 0.72, 0.15]} rotation={[0.05, -0.22, 0.1]}>
      <mesh ref={ref} castShadow>
        <boxGeometry args={[0.58, 1.12, 0.035]} />
        <meshStandardMaterial color="#fffdf7" roughness={0.4} />
      </mesh>
      <Text position={[0, 0.8, 0.03]} fontSize={0.07} color="#2e3f34" anchorX="center">
        ORDER CK-008
      </Text>
    </group>
  );
}

function Pipeline({ active }: { active: boolean }) {
  const points: [number, number, number][] = [[-2.1, -1.35, 0.25], [-0.72, -1.35, 0.25], [0.7, -1.35, 0.25], [2.1, -1.35, 0.25]];
  const labels = ["Cart", "Checkout", "Order", "Fulfillment"];

  return (
    <group>
      <Line points={points} color="#f1d59b" lineWidth={2} transparent opacity={active ? 0.94 : 0.48} />
      {points.map((point, index) => (
        <group key={labels[index]} position={point}>
          <mesh>
            <sphereGeometry args={[0.09, 24, 24]} />
            <meshStandardMaterial color={index < 3 || active ? "#f1d59b" : "#6b6255"} emissive="#b76935" emissiveIntensity={active ? 0.35 : 0.1} />
          </mesh>
          <Text position={[0, -0.28, 0]} fontSize={0.09} color="#fff7ed" anchorX="center">
            {labels[index]}
          </Text>
        </group>
      ))}
    </group>
  );
}

function CommerceOperationsFlow() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = pointer.x * 0.12 + Math.sin(clock.elapsedTime * 0.24) * 0.04;
    groupRef.current.rotation.x = -0.16 + pointer.y * 0.04;
  });

  return (
    <group ref={groupRef} rotation={[-0.16, 0.26, 0]}>
      <mesh position={[0, -1.75, -0.1]} receiveShadow>
        <boxGeometry args={[5.6, 0.18, 2.45]} />
        <meshStandardMaterial color="#2e3f34" roughness={0.38} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.36, -0.95]} receiveShadow>
        <boxGeometry args={[5.8, 2.8, 0.16]} />
        <meshStandardMaterial color="#1b1b18" roughness={0.28} metalness={0.12} />
      </mesh>

      <group
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(0);
        }}
        onPointerOut={() => setHovered(null)}
      >
        <ProductBox position={[-1.55, 0.1, 0.36]} color="#f1d59b" label="Client Launch Kit" active={hovered === 0} />
      </group>
      <group
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(1);
        }}
        onPointerOut={() => setHovered(null)}
      >
        <ProductBox position={[-0.42, -0.18, 0.25]} color="#b76935" label="Workshop Seat Bundle" active={hovered === 1} />
      </group>
      <ProductBox position={[0.58, 0.02, 0.18]} color="#6b7b56" label="Support Credits" active={false} />
      <PaymentTerminal position={[1.72, -0.05, 0.38]} />
      <Receipt active={hovered !== null} />
      <Pipeline active={hovered !== null} />
    </group>
  );
}

export default function CommerceKitSceneCanvas() {
  return (
    <Canvas className="min-h-[440px]" style={{ width: "100%", height: "440px" }} shadows dpr={[1, 1.5]} camera={{ position: [0, 0.25, 6.3], fov: 42 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <color attach="background" args={["#201a13"]} />
      <ambientLight intensity={0.78} />
      <directionalLight position={[2.5, 4, 4]} intensity={1.65} castShadow />
      <pointLight position={[-3, 1.5, 3]} intensity={1.2} color="#f1d59b" />
      <CommerceOperationsFlow />
    </Canvas>
  );
}
