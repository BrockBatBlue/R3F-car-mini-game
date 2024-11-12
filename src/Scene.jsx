import { Suspense, useEffect, useState } from "react";
import Track from "./Track";
import Ground from "./Ground";
import Car from "./Car";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

const Scene = () => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "k") {
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21] + Math.random() * 0.01);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);
  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background={"both"} />
      <PerspectiveCamera makeDefaultPosition={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
      <Track />
      <Ground />
      <Car thirdPerson={thirdPerson} />
    </Suspense>
  );
};

export default Scene;
