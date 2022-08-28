// var map = L.map("map").setView([40.384544, 49.983978], 13);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution: "© OpenStreetMap",
// }).addTo(map);

let form = document.querySelector(".form-el");

form.addEventListener("submit", (e) => {    //! BakuCityID 103.119.111.0
  e.preventDefault();
  let inputValue = document.querySelector(".form-control").value;
  if (inputValue == "" || inputValue == null) {
    alert("Error, Please write any IP adress !");
  } else {
    var requestUrl = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_ocC36BFduVfhGXRWaWZtxbIltu35B&ipAddress=${inputValue}`;
  }
  let ip = document.querySelector("#current_ip");
  let town = document.querySelector("#current_town");
  let zone = document.querySelector("#current_zone");
  let isp = document.querySelector("#current_isp");
  console.log(inputValue);

  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ip.innerHTML = data.ip;
      town.innerHTML = data.location.region;
      zone.innerHTML = data.location.timezone;
      isp.innerHTML = data.isp;

      var map = L.map("map").setView(
        [`${data.location.lat}`, `${data.location.lng}`],
        13
      );
      var marker = L.marker([
        `${data.location.lat}`,
        `${data.location.lng}`,
      ]).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    });
});

