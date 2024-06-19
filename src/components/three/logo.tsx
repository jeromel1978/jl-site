"use client";
import * as THREE from "three";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import type { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap, Group } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Text } from "troika-three-text";
// import Hel from "three/examples/fonts/helvetiker_regular.typeface.json";
import {
  useGLTF,
  Center,
  Caustics,
  Environment,
  Lightformer,
  RandomizedLight,
  PerformanceMonitor,
  AccumulativeShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { easing } from "maath";

const myText = new Text();
const Logo = () => {
  const [perfSucks, degrade] = useState(false);
  return (
    <Canvas
      shadows
      // className="w-full h-full"
      dpr={[1, perfSucks ? 1.5 : 2]}
      // eventSource={document.getElementById("root") as HTMLElement}
      // eventPrefix="client"
      camera={{ position: [20, 0.9, 20], fov: 26 }}
    >
      <PerformanceMonitor onDecline={() => degrade(true)} />
      <color attach="background" args={["black"]} />
      {/* <color attach="background" args={["#f0f0f0"]} /> */}
      {/* <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}

      <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <Scene />
        {/* <AccumulativeShadows
          frames={100}
          alphaTest={0.85}
          opacity={0.8}
          color="white"
          scale={20}
          position={[0, -0.005, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={6}
            ambient={0.5}
            intensity={1}
            position={[-1.5, 2.5, -2.5]}
            bias={0.001}
          />
        </AccumulativeShadows> */}
      </group>
      <Env perfSucks={perfSucks} />
    </Canvas>
  );
};

export function Scene(props: any) {
  const { nodes, materials } = useGLTF("/models/Logo.glb");
  const [TitleGeo, setTitleGeo] = useState<TextGeometry | undefined>();
  useGLTF.preload("/models/Logo.glb");

  // useEffect(() => {
  //   console.log(TitleGeo);
  // }, [TitleGeo]);

  const [Clear, setClear] = useState(false);
  // const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | null>(
  //   null
  // );

  // const ref = useRef(null)

  // useFrame((state, delta) => {
  //   if (!!ref?.current) ref.current.rotation.z += delta;
  // });

  const innerMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 1,
    color: "red",
    roughness: 0,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    envMapIntensity: 2,
  });

  const LogoMesh = nodes.Logo as any;
  return (
    <group {...props} dispose={null}>
      {!!TitleGeo && (
        <mesh
          visible
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={innerMaterial}
          scale={[0.5, 0.5, 0.5]}
          geometry={TitleGeo}
        ></mesh>
      )}
      <mesh
        visible
        position={[0.5, 0.5, -4]}
        rotation={[Math.PI / 2, 0, 0]}
        material={innerMaterial}
        scale={[0.5, 0.5, 0.5]}
      >
        <sphereGeometry args={[1, 128, 128]} />
      </mesh>
      <mesh
        visible
        position={[-0.75, -0.5, -2]}
        rotation={[Math.PI / 2, 0, 0]}
        material={innerMaterial}
        scale={[0.25, 0.25, 0.25]}
      >
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      <mesh
        visible
        position={[0.75, -0.35, -1]}
        rotation={[Math.PI / 2, 0, 0]}
        material={innerMaterial}
        scale={[0.1, 0.1, 0.1]}
      >
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      <mesh
        visible={!Clear}
        castShadow
        receiveShadow
        geometry={LogoMesh.geometry}
        // material={materials["Material.001"]}
        material={innerMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        // onPointerOut={ResetPosition}
        onClick={() => setClear(!Clear)}
      ></mesh>
      <Caustics
        visible={!!Clear}
        color={[1, 0.8, 0.8]}
        lightSource={[-1.2, 3, -2]}
        intensity={0.003}
        worldRadius={0.26 / 10}
        ior={0.9}
        causticsOnly={false}
        backside={true}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={LogoMesh.geometry}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => setClear(!Clear)}
        >
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.1}
            thickness={0.05}
            chromaticAberration={0.05}
            anisotropicBlur={1}
            clearcoat={1}
            clearcoatRoughness={1}
            envMapIntensity={2}
          />
        </mesh>
      </Caustics>
    </group>
  );
}

function Env({ perfSucks }: { perfSucks: boolean }) {
  const ref = useRef<any | null>(null);
  useFrame((state, delta) => {
    // Animate the environment as well as the camera
    if (!perfSucks) {
      if (!!ref.current) {
        easing.damp3(
          ref.current.rotation as any,
          [Math.PI / 2, 0, state.clock.elapsedTime / 5 + state.pointer.x],
          0.2,
          delta
        );
        easing.damp3(
          state.camera.position,
          [Math.sin(state.pointer.x / 4) * 9, 1.25 + state.pointer.y, Math.cos(state.pointer.x / 4) * 9],
          0.5,
          delta
        );
        state.camera.lookAt(0, 0, 0);
      }
    }
  });
  // Runtime environments can be too slow on some systems, better safe than sorry with PerfMon
  return (
    <Environment
      frames={perfSucks ? 1 : Infinity}
      // preset="city"
      // resolution={1080}
      // background blur={0.8}
    >
      <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[Math.PI / 2, 1, 0]}>
        {[2, -2, 2, -4, 2, -5, 2, -9].map((x, i) => (
          <Lightformer
            key={i}
            intensity={1}
            rotation={[Math.PI / 4, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[4, 1, 1]}
          />
        ))}
        <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
        <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[50, 2, 1]} />
        <Lightformer intensity={0.5} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
      </group>
      <group ref={ref}>
        <Lightformer
          intensity={5}
          form="ring"
          color="red"
          rotation-y={Math.PI / 2}
          position={[-5, 2, -1]}
          scale={[10, 10, 1]}
        />
      </group>
    </Environment>
  );
}

export default Logo;
