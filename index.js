if (typeof DeviceOrientationEvent.requestPermission === "function") {
  // iOS 13+ requires permission
  document.getElementById("permissionButton").addEventListener("click", () => {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener(
            "deviceorientation",
            (event) => {
              const leftToRight = event.gamma; // gamma: left to right
              const frontToBack = event.beta; // beta: front back

              document.getElementById("test-section").innerHTML = `
                  <p>Left to Right: ${leftToRight}</p>
                  <p>Front to Back: ${frontToBack}</p>
              `;

              const { width, height } = cardWrapper.getBoundingClientRect();
              // Map gamma (-90 to 90) to offsetX (0 to width)
              const minGamma = -5;
              const maxGamma = 5;
              const leftToRightClamped = Math.max(
                minGamma,
                Math.min(maxGamma, leftToRight)
              );
              const offsetX =
                ((leftToRightClamped - minGamma) / (maxGamma - minGamma)) *
                width;

              // Map beta (-90 to 90, or -180 to 180 depending on device) to offsetY (0 to height)
              const minBeta = 25;
              const maxBeta = 50;
              const frontToBackClamped = Math.max(
                minBeta,
                Math.min(maxBeta, frontToBack)
              );
              const offsetY =
                ((frontToBackClamped - minBeta) / (maxBeta - minBeta)) * height;

              const halfWidth = width / 2;
              const halfHeight = height / 2;

              // calculate angle
              const rotationY = ((offsetX - halfWidth) / halfWidth) * mostX;
              const rotationX = ((offsetY - halfHeight) / halfHeight) * mostY;

              document.getElementById("position-x-y").innerHTML = `
                  <p>offsetX: ${offsetX}</p>
                  <p>offsetY: ${offsetY}</p>
                  <p>rotationX: ${rotationX}</p>
                  <p>rotationY: ${rotationY}</p>
              `;

              // set rotation
              card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
              highlight.style.left = `${(rotationY / mostX) * 60 * -1}%`;
              highlight.style.top = `${(rotationX / mostY) * 60 * -1}%`;

              dot.style.left = `${offsetX}px`;
              dot.style.top = `${offsetY}px`;
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
    const leftToRight = event.gamma; // gamma: left to right
    const frontToBack = event.beta; // beta: front back

    const { width, height } = cardWrapper.getBoundingClientRect();
    // Map gamma (-90 to 90) to offsetX (0 to width)
    const minGamma = -5;
    const maxGamma = 5;
    const leftToRightClamped = Math.max(
      minGamma,
      Math.min(maxGamma, leftToRight)
    );
    const offsetX =
      ((leftToRightClamped - minGamma) / (maxGamma - minGamma)) * width;

    // Map beta (-90 to 90, or -180 to 180 depending on device) to offsetY (0 to height)
    const minBeta = 25;
    const maxBeta = 50;
    const frontToBackClamped = Math.max(
      minBeta,
      Math.min(maxBeta, frontToBack)
    );
    const offsetY =
      ((frontToBackClamped - minBeta) / (maxBeta - minBeta)) * height;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // calculate angle
    const rotationY = ((offsetX - halfWidth) / halfWidth) * mostX;
    const rotationX = ((offsetY - halfHeight) / halfHeight) * mostY;

    document.getElementById("position-x-y").innerHTML = `
                  <p>offsetX: ${offsetX}</p>
                  <p>offsetY: ${offsetY}</p>
                  <p>rotationX: ${rotationX}</p>
                  <p>rotationY: ${rotationY}</p>
              `;

    // set rotation
    card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    highlight.style.left = `${(rotationY / mostX) * 60 * -1}%`;
    highlight.style.top = `${(rotationX / mostY) * 60 * -1}%`;

    dot.style.left = `${offsetX}px`;
    dot.style.top = `${offsetY}px`;
  });
} else {
  console.log("Device Orientation API not supported");
  document.getElementById("test-section").innerHTML = `
        <p>Device Orientation API not supported</p>
    `;
}

// ================ Card Animation ================
// DOM Element selections
const cardWrapper = document.querySelector(".cardWrapper");
const card = document.querySelector(".card");
const highlight = document.querySelector(".highlight");
const dot = document.querySelector(".dot");

// highest values for angle
const mostX = 10; // 10 or -10
const mostY = 10; // 10 or -10

cardWrapper.addEventListener("mousemove", (e) => {
  // remove transition
  card.style.transition = "none";
  highlight.style.transition = "none";

  // console.log([e.offsetX, e.offsetY]);

  const x = e.offsetX;
  const y = e.offsetY;
  const { width, height } = cardWrapper.getBoundingClientRect();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  // calculate angle
  const rotationY = ((x - halfWidth) / halfWidth) * mostX;
  const rotationX = ((y - halfHeight) / halfHeight) * mostY;

  console.log([rotationX, rotationY]);

  document.getElementById("position-x-y").innerHTML = `
    <p>e.offsetX: ${e.offsetX}</p>
    <p>e.offsetY: ${e.offsetY}</p>
    <p>rotationX: ${rotationX}</p>
    <p>rotationY: ${rotationY}</p>
  `;

  // set rotation
  card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
  highlight.style.left = `${(rotationY / mostX) * 60 * -1}%`;
  highlight.style.top = `${(rotationX / mostY) * 60 * -1}%`;

  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
});

cardWrapper.addEventListener("mouseleave", () => {
  // add transition back
  card.style.transition = "transform 0.5s ease-in-out";
  card.style.transform = `rotateY(0) rotateX(0)`;
  highlight.style.transition = "left 0.5s ease-in-out, top 0.5s ease-in-out";

  // add default position back to highlight
  highlight.style.left = `16%`;
  highlight.style.top = `10%`;

  const { width, height } = cardWrapper.getBoundingClientRect();
  dot.style.left = `${width / 2}px`;
  dot.style.top = `${height / 2}px`;
});
