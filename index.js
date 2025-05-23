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

              const { width, height } = cardWrapper.getBoundingClientRect();
              // Map gamma (-90 to 90) to offsetX (0 to width)
              const minGamma = -90;
              const maxGamma = 90;
              const leftToRightClamped = Math.max(
                minGamma,
                Math.min(maxGamma, leftToRight)
              );
              const offsetX =
                ((leftToRightClamped - minGamma) / (maxGamma - minGamma)) *
                width;

              // Map beta (-90 to 90, or -180 to 180 depending on device) to offsetY (0 to height)
              const minBeta = -90;
              const maxBeta = 90;
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
                  <p>rotationX: ${rotationX}</p>
                  <p>rotationY: ${rotationY}</p>
              `;

              // set rotation
              card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
              highlight.style.left = `${(rotationY / mostX) * 60 * -1}%`;
              highlight.style.top = `${(rotationX / mostY) * 60 * -1}%`;
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

// ================ Card Animation ================
// DOM Element selections
const cardWrapper = document.querySelector(".cardWrapper");
const card = document.querySelector(".card");
const highlight = document.querySelector(".highlight");

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

  // set rotation
  card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
  highlight.style.left = `${(rotationY / mostX) * 60 * -1}%`;
  highlight.style.top = `${(rotationX / mostY) * 60 * -1}%`;
});

cardWrapper.addEventListener("mouseleave", () => {
  // add transition back
  card.style.transition = "transform 0.5s ease-in-out";
  card.style.transform = `rotateY(0) rotateX(0)`;
  highlight.style.transition = "left 0.5s ease-in-out, top 0.5s ease-in-out";

  // add default position back to highlight
  highlight.style.left = `16%`;
  highlight.style.top = `10%`;
});
