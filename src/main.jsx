import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Scene from "./Scene.jsx";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  </StrictMode>
);
