if (typeof DeviceOrientationEvent.requestPermission === "function") {
  // iOS 13+ requires permission
  document.getElementById("permissionButton").addEventListener("click", () => {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener(
            "deviceorientation",
            (event) => {
              const rotateDegrees = event.alpha; // alpha: rotation around z-axis
              const leftToRight = event.gamma; // gamma: left to right
              const frontToBack = event.beta; // beta: front back
              console.log(
                `Rotation: ${rotateDegrees}, Left to Right: ${leftToRight}, Front to Back: ${frontToBack}`
              );

              document.getElementById("test-section").innerHTML = `
      <p>Rotation: ${rotateDegrees}</p>
      <p>Left to Right: ${leftToRight}</p>
      <p>Front to Back: ${frontToBack}</p>
    `;
            },
            true
          );
        } else {
          console.log("Permission denied for Device Orientation.");
          document.getElementById("test-section").innerHTML = `
        <p>Permission denied for Device Orientation.</p>
    `;
        }
      })
      .catch((error) => {
        console.error("Error requesting permission:", error);
      });
  });
}
if (window.DeviceOrientationEvent) {
  addEventListener("deviceorientation", (event) => {
    const rotateDegrees = event.alpha; // alpha: rotation around z-axis
    const leftToRight = event.gamma; // gamma: left to right
    const frontToBack = event.beta; // beta: front back

    console.log(
      `Rotation: ${rotateDegrees}, Left to Right: ${leftToRight}, Front to Back: ${frontToBack}`
    );

    document.getElementById("test-section").innerHTML = `
      <p>Rotation: ${rotateDegrees}</p>
      <p>Left to Right: ${leftToRight}</p>
      <p>Front to Back: ${frontToBack}</p>
    `;
  });
} else {
  console.log("Device Orientation API not supported");
  document.getElementById("test-section").innerHTML = `
        <p>Device Orientation API not supported</p>
    `;
}
