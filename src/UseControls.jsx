import { useEffect, useState } from "react";

const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({});
  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true,
      }));
    };
    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    if (controls.w) {
      vehicleApi.applyEngineForce(0, 0);
      vehicleApi.applyEngineForce(0, 1);
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);

      console.log("Press W");
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 0);
      vehicleApi.applyEngineForce(-150, 1);
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      console.log("Press S");
    } else {
      vehicleApi.applyEngineForce(0, 0);
      vehicleApi.applyEngineForce(0, 1);
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      //   console.log("Unpressed W/S");
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
      console.log("Press A");
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
      console.log("Press D");
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
      //   console.log("Unpressed A/D");
    }

    if (controls.arrowdown) {
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
      console.log("Press Down");
    }
    if (controls.arrowup) {
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
      console.log("Press Up");
    }
    if (controls.arrowleft) {
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
      console.log("Press Left");
    }
    if (controls.arrowright) {
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);
      console.log("Press Right");
    }

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};

export default useControls;
