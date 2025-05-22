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
}
