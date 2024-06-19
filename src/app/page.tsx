import Logo from "@/components/three/logo";
import Overlay from "./overlay";
import { Suspense } from "react";

export default function Root() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Logo />
      </Suspense>
      <Overlay />
      {/* <div className="flex absolute inset-x-0 inset-y-0 text-4xl text-white">Jerome Losorata</div> */}
    </div>
  );
}
