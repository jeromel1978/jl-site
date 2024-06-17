"use client";
import * as THREE from "three";
import React, { useRef, useState, useLayoutEffect } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import type { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";

type Logo3DProps = {
  currentColor?: string;
};
export function Model(props: Logo3DProps) {
  const { nodes, materials } = useGLTF("/models/Logo.glb");
  const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | null>(
    null
  );
  // const ref = useRef(null)
  useFrame((state, delta) => {
    if (!!ref?.current) ref.current.rotation.z += delta;
  });
  const ResetPosition = () => {
    if (!!ref?.current) {
      ref.current.rotation.x = 0;
      ref.current.rotation.y = 0;
    }
  };
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Logo.geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, 0]}
        // onPointerOut={ResetPosition}
      />
    </group>
  );
}
useGLTF.preload("/models/Logo.glb");

const Logo = () => {
  return (
    <Canvas className="w-full h-full">
      <color attach="background" args={["black"]} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
};
export default Logo;
