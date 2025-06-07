import { getImgUrl, getUserAssetUrl } from './all_getuserImg.js';
window.getImgUrl = getImgUrl;

const year = localStorage.getItem("selectedYear") || "2023";
const postGrid = document.getElementById("post");
const videoGrid = document.getElementById("video");
const teamGrid = document.getElementById("team");

// 메뉴 클릭시 탭 전환
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// header
fetch("/module/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-md").innerHTML = data;
  });

// 이미지 URL 중 유효한 첫 번째를 찾는 함수
function loadFirstValidImage(urls, onSuccess, onError) {
  const tryNext = (index) => {
    if (index >= urls.length) {
      onError();
      return;
    }

    const img = new Image();
    img.onload = () => onSuccess(urls[index]);
    img.onerror = () => tryNext(index + 1);
    img.src = urls[index];
  };
  tryNext(0);
}

// 데이터 렌더링
fetch(`/data/${year}.json`)
  .then(res => res.json())
  .then(data => {
    // ✅ POST 탭
    data.포스트.forEach(post => {
      const designer = data.디자이너.find(d => d.name === post.designerName);
      if (!designer) return;

      const urls = getUserAssetUrl(designer.name, "PosterSorce", designer.posterThumb);
      loadFirstValidImage(urls, (validUrl) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <a href="./postView.html?id=${encodeURIComponent(post.id)}" class="grid-item">
            <div class="designer-img-wrap">
              <img src="${validUrl}" alt="${post.postName}_포스터" class="img-responsive">
            </div>
            <h3 class="head_title"><span>${designer.name}<span></h3>
            <h3><span>${post.postName}</h2>
          </a>
        `;
        postGrid.appendChild(div);
      }, () => {
        console.warn("No valid poster found for", designer.name);
      });
    });

    // ✅ VIDEO 탭 (예시)
    // data.디자이너.forEach(designer => {
    //   const videoDiv = document.createElement('div');
    //   videoDiv.innerHTML = `
    //     <div class="grid-item">
    //       <div class="designer-img-wrap">
    //         <img src="${getUserAssetUrl(designer.name, "VideoThumb", designer.videoFile)}" alt="${designer.name}_비디오썸네일" class="img-responsive">
    //       </div>
    //       <h2 class="head_title"><span>${designer.vidioName}</span></h2>
    //     </div>
    //   `;
    //   videoGrid.appendChild(videoDiv);
    // });

    // ✅ TEAM 탭 (예시)
    // data.디자이너.forEach(designer => {
    //   const teamDiv = document.createElement('div');
    //   teamDiv.innerHTML = `
    //     <div class="grid-item">
    //       <div class="designer-img-wrap">
    //         <img src="${getUserAssetUrl(designer.name, "PosterSorce", designer.posterThumb)}" alt="${designer.name}" class="img-responsive">
    //       </div>
    //       <h2 class="head_title"><span>${designer.teamWork}</span></h2>
    //     </div>
    //   `;
    //   teamGrid.appendChild(teamDiv);
    // });
  });
