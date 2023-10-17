//dark mode
function profile(url, nama, team) {
  // const areaProfile = document.querySelector(".areaProfile");
  // const img = document.createElement("img");
  // img.src = url;
  // img.alt = nama + team;
  // img.className = "imgProfile";
  // areaProfile.appendChild(img);
  const imgProfile = document.querySelector(".imgProfile"); //dapatkan target
  const container = document.querySelector(".container"); //element yang ingin dimainkan
  imgProfile.addEventListener("click", () => {
    //fungsi saat di klik
    container.classList.toggle("active"); //beri class baru
    const localContainer = localStorage.getItem("container");
    if (localContainer === "active") {
      localStorage.removeItem("container");
    } else {
      localStorage.setItem("container", "active");
    }
  });
  const author = document.querySelector(".author");
  author.textContent = nama;
  const span = document.createElement("span");
  span.textContent = team;
  author.appendChild(span);
}

document.addEventListener("DOMContentLoaded", () => {
  const localContainer = localStorage.getItem("container");
  if (localContainer === "active") {
    document.querySelector(".container").classList.add("active");
  }
  const hoverProfile = document.querySelector(".hoverProfile");
  hoverProfile.textContent = "kenapa sentuh - sentuh";
  const hoverProfileRight = document.querySelector(".hoverProfileRight");
  hoverProfileRight.textContent = "❗";
});

//musik
function musik(url) {
  const musicSpan = document.querySelector(".container .music span");
  musicSpan.textContent = "play";
  const musicI = document.querySelector(".container .music i");
  const traffic = document.querySelector(".container .traffic-lights");
  var audio = new Audio(url);
  musicI.addEventListener("click", function () {
    traffic.classList.toggle("active");
    this.classList.toggle("bx-play");
    this.classList.toggle("bx-pause");
    if (musicI.classList.contains("bx-play")) {
      audio.pause();
      musicSpan.textContent = "play";
    } else {
      audio.play();
      musicSpan.textContent = "pause";
    }
  });
}
//data sosmed
const listlink = document.getElementById("listlink"); // parent
const material = document.querySelector(".container .material"); // parent
fetch("./src/database/data.json") //mengambil data
  .then((response) => response.json())
  .then((data) => {
    const profiles = data.profile;
    const btnList = data.btnList;
    const btnIcon = data.btnIcon;
    profile(profiles.gambar, profiles.author, profiles.Team);
    musik(data.musik);
    btnList.forEach((item) => {
      const divBtnList = document.createElement("div"); //buat element
      divBtnList.className = "btn-List"; //beri class

      const a = document.createElement("a"); //buat element link
      a.textContent = item.sosmed; // beri text
      a.href = item.link; // beri link yang di tuju
      a.target = "_blank";
      divBtnList.appendChild(a); // masukkan link ke parent nya
      listlink.appendChild(divBtnList); // masukkan element ke parent paling atas
    });

    btnIcon.forEach((item) => {
      const a = document.createElement("a");
      a.target = "_blank";
      a.href = item.link;
      const icon = document.createElement("i");
      icon.className = `bx ${item.icon}`;
      a.appendChild(icon);
      const span = document.createElement("span");
      span.textContent = item.sosmed;
      a.appendChild(span);
      material.appendChild(a);
    });
  })
  .catch((e) => {
    document.write(`
    <html>
    <head><title>error</title>
    <link rel="stylesheet" href="./src/css/style.css" />
    <style>
    .listLink p {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      font-weight: bold;
      color: var(--merah);
      letter-spacing: 2px;
    }
    </style>
    </head>
    <body>
      <div class="container">
      <div class="traffic-lights">
      <span class="merah"></span>
      <span class="kuning"></span>
      <span class="hijau"></span>
      </div> 
      <div class="listLink">
      <p>Error🤔</p>
      </div>
      </div>
    </body>
    </html>`); //jika gagal
  });
