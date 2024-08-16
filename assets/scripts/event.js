// const button = document.getElementById("button");

// function trackUser() {
//   navigator.geolocation.getCurrentPosition(
//     (posData) => {
//       console.log(posData);
//     },
//     (error) => {
//       console.error();
//     }
//   );
// }

// button.addEventListener("click", trackUser);


const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Timer completed!");
  }, 1000);
})
  .then((text) => {
    throw new Error("Failed!");
  })
  .catch((err) => console.log(err))
  .then(() => console.log("Does that execute?"));