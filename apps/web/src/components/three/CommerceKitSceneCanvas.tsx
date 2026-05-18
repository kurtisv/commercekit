"use client";

import { Line, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";

type Vector3Tuple = [number, number, number];

function ReceiptSheet({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.position.y = 0.4 + (active ? 0.2 : 0.06) + Math.sin(clock.elapsedTime * 0.8) * 0.03;
    ref.current.rotation.z = 0.08 + Math.sin(clock.elapsedTime * 0.28) * 0.01;
  });

  return (
    <group ref={ref} position={[1.88, 0.4, 0.14]} rotation={[0.02, -0.28, 0.08]}>
      <RoundedBox args={[0.82, 1.46, 0.04]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#fff7eb" roughness={0.7} metalness={0.02} />
      </RoundedBox>
      <Text position={[0, 0.52, 0.03]} fontSize={0.075} color="#6d5c49" anchorX="center">
        CK-2026-0001
      </Text>
      <Text position={[0, 0.3, 0.03]} fontSize={0.07} color="#2d261f" anchorX="center">
        Paid
      </Text>
      <Text position={[0, 0.08, 0.03]} fontSize={0.07} color="#2d261f" anchorX="center">
        Fulfillment
      </Text>
      <Text position={[0, -0.14, 0.03]} fontSize={0.07} color="#7a6a54" anchorX="center">
        Client Launch Kit
      </Text>
    </group>
  );
}

function PaymentCard({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.position.x = 1.22 + (active ? 0.12 : 0);
    ref.current.position.y = -0.18 + Math.sin(clock.elapsedTime * 0.55) * 0.03;
  });

  return (
    <group ref={ref} position={[1.22, -0.18, 0.26]} rotation={[0.1, -0.34, -0.06]}>
      <RoundedBox args={[1.68, 1.06, 0.12]} radius={0.18} smoothness={5}>
        <meshPhysicalMaterial color="#222721" roughness={0.34} metalness={0.22} clearcoat={0.55} clearcoatRoughness={0.26} />
      </RoundedBox>
      <mesh position={[0, 0.16, 0.07]}>
        <planeGeometry args={[1.15, 0.16]} />
        <meshBasicMaterial color="#657657" transparent opacity={0.46} />
      </mesh>
      <Text position={[-0.42, 0.24, 0.08]} fontSize={0.08} color="#f6ecd8" anchorX="left">
        Checkout ready
      </Text>
      <Text position={[-0.42, -0.04, 0.08]} fontSize={0.11} color="#ffffff" anchorX="left">
        Paid
      </Text>
      <Text position={[0.36, -0.32, 0.08]} fontSize={0.08} color="#d8c9b4" anchorX="center">
        Stripe-ready
      </Text>
    </group>
  );
}

function SmallKitBox({ active }: { active: boolean }) {
  return (
    <group position={[-0.38, -0.22, 0.18]} rotation={[0.05, 0.16, -0.05]}>
      <RoundedBox args={[1.38, 0.92, 0.92]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#7f9172" roughness={0.74} metalness={0.05} />
      </RoundedBox>
      <mesh position={[0, 0.48, 0.02]} rotation={[active ? -0.18 : -0.05, 0, 0]}>
        <boxGeometry args={[1.46, 0.06, 0.96]} />
        <meshStandardMaterial color="#95a588" roughness={0.72} metalness={0.04} />
      </mesh>
      <Text position={[0, 0.02, 0.48]} fontSize={0.09} color="#182015" anchorX="center">
        Workshop Seat
      </Text>
      <Text position={[0, -0.16, 0.48]} fontSize={0.08} color="#182015" anchorX="center">
        Bundle
      </Text>
    </group>
  );
}

function HeroKitBox({ active }: { active: boolean }) {
  const lidRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!lidRef.current) {
      return;
    }

    lidRef.current.rotation.x += ((active ? -0.36 : -0.05) - lidRef.current.rotation.x) * 0.08;
  });

  return (
    <group position={[-1.55, 0.14, 0.28]} rotation={[0.08, 0.22, -0.06]}>
      <RoundedBox args={[2.24, 1.52, 1.46]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#b8844c" roughness={0.78} metalness={0.04} />
      </RoundedBox>
      <mesh ref={lidRef} position={[0, 0.82, 0.02]} castShadow>
        <boxGeometry args={[2.3, 0.07, 1.52]} />
        <meshStandardMaterial color="#d1a16a" roughness={0.76} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0.02, 0.74]}>
        <planeGeometry args={[1.45, 0.68]} />
        <meshBasicMaterial color="#f4ddba" transparent opacity={0.9} />
      </mesh>
      <Text position={[0, 0.16, 0.76]} fontSize={0.12} color="#201a13" anchorX="center">
        Client Launch Kit
      </Text>
      <Text position={[0, -0.14, 0.76]} fontSize={0.08} color="#5f4325" anchorX="center">
        premium product box
      </Text>
    </group>
  );
}

function Pipeline({ active }: { active: boolean }) {
  const points = useMemo<Vector3Tuple[]>(() => {
    return [
      [-2.2, -1.3, 0.15],
      [-0.9, -1.3, 0.15],
      [0.42, -1.3, 0.15],
      [1.74, -1.3, 0.15],
    ];
  }, []);

  const labels = ["Cart", "Checkout", "Paid", "Fulfillment"];

  return (
    <group>
      <Line points={points} color="#f1d59b" lineWidth={1.6} transparent opacity={active ? 0.95 : 0.52} />
      {points.map((point, index) => (
        <group key={labels[index]} position={point}>
          <mesh>
            <sphereGeometry args={[0.09, 24, 24]} />
            <meshStandardMaterial
              color={index < 3 || active ? "#f1d59b" : "#6d5c49"}
              emissive={index < 3 || active ? "#8b5e2f" : "#211b16"}
              emissiveIntensity={active ? 0.28 : 0.08}
            />
          </mesh>
          <Text position={[0, -0.28, 0]} fontSize={0.085} color="#f8edd7" anchorX="center">
            {labels[index]}
          </Text>
        </group>
      ))}
    </group>
  );
}

function PriceTag({
  position,
  label,
  value,
  active,
}: {
  position: Vector3Tuple;
  label: string;
  value: string;
  active: boolean;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7 + position[0]) * (active ? 0.012 : 0.04);
  });

  return (
    <group ref={ref} position={position} rotation={[0, position[0] > 0 ? -0.26 : 0.26, position[0] > 0 ? -0.08 : 0.08]}>
      <RoundedBox args={[1.2, 0.56, 0.1]} radius={0.16} smoothness={5}>
        <meshStandardMaterial color="#201a13" roughness={0.4} metalness={0.08} />
      </RoundedBox>
      <Text position={[0, 0.08, 0.06]} fontSize={0.075} color="#bda98c" anchorX="center">
        {label}
      </Text>
      <Text position={[0, -0.08, 0.06]} fontSize={0.095} color="#fff7e8" anchorX="center">
        {value}
      </Text>
    </group>
  );
}

function CommerceKitSceneObject() {
  const rootRef = useRef<Group>(null);
  const [active, setActive] = useState(false);

  useFrame(({ clock, pointer }) => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.06;
    rootRef.current.rotation.x = 0.12 + pointer.y * 0.05 + Math.sin(clock.elapsedTime * 0.18) * 0.01;
    rootRef.current.rotation.y = -0.28 + pointer.x * 0.08;
    rootRef.current.rotation.z = -0.02;
  });

  return (
    <group>
      <mesh position={[0, -1.9, -0.35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.8, 4.6]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>

      <mesh position={[0, 0.3, -1.3]}>
        <planeGeometry args={[7.4, 5.2]} />
        <meshBasicMaterial color="#61745a" transparent opacity={0.06} />
      </mesh>

      <group
        ref={rootRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          setActive(true);
        }}
        onPointerOut={() => setActive(false)}
      >
        <HeroKitBox active={active} />
        <SmallKitBox active={active} />
        <PaymentCard active={active} />
        <ReceiptSheet active={active} />
        <Pipeline active={active} />
        <PriceTag position={[-2.38, 1.02, 0.1]} label="Product" value="Launch kit" active={active} />
        <PriceTag position={[2.26, 0.94, 0.1]} label="Badge" value="Stripe-ready" active={active} />
        <PriceTag position={[2.18, -0.88, 0.1]} label="Order" value="CK-2026-0001" active={active} />
      </group>
    </group>
  );
}

export default function CommerceKitSceneCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      style={{ width: "100%", height: "100%" }}
      shadows
      dpr={[1, 1.4]}
      camera={{ position: [0, 0.15, 6.9], fov: 34 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#201a13"]} />
      <ambientLight intensity={0.76} />
      <directionalLight position={[-3.6, 4.8, 4.8]} intensity={2.1} color="#fff4dd" castShadow />
      <directionalLight position={[3.8, -1.4, 3.6]} intensity={1.0} color="#a6b195" />
      <pointLight position={[1.9, 1.2, 2.8]} intensity={0.8} color="#f1d59b" />
      <pointLight position={[-2.2, 0.4, 2.4]} intensity={0.65} color="#7f9172" />
      <CommerceKitSceneObject />
    </Canvas>
  );
}
