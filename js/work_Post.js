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

// 데이터 렌더링
fetch(`/data/${year}.json`)
  .then(res => res.json())
  .then(data => {
    // ✅ POST 탭
    data.포스트.forEach(post => {
      const designer = data.디자이너.find(d => d.name === post.designerName);
      const posterImg = designer ? getUserAssetUrl(designer.name, "PosterSorce", designer.posterThumb) : 'img/default.png';

      const div = document.createElement('div');
      div.innerHTML = `
        <a href="./postView.html?id=${encodeURIComponent(post.id)}" class="grid-item">
          <div class="designer-img-wrap">
            <img src="${posterImg}" alt="${post.postName}_포스터" class="img-responsive">
          </div>
          <h2 class="head_title"><span>${post.postName}</span></h2>
        </a>
      `;
      postGrid.appendChild(div);
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

    // ✅ TEAM 탭 (신 구조 - data.팀 사용)

    // ✅ TEAM 탭
    data.팀.forEach(team => {
      const imgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(team.teamThumbnail)}?alt=media`;
      const description = team.teamDescription || "";

      const teamDiv = document.createElement('div');
      teamDiv.innerHTML = `
        <a href="./view/teamView.html?team=${encodeURIComponent(team.teamName)}" class="grid-item">
          <div class="designer-img-wrap">
            <img src="${imgUrl}" alt="${team.teamName}_썸네일" class="img-responsive">
          </div>
          <h2 class="head_title"><span>${team.teamName}</span></h2>
        </a>
      `;
      teamGrid.appendChild(teamDiv);
    });
  });

{/* <p class="eng_sub">${team.teamNameEng}</p>
        <p class="kor_sub">팀원: ${team.teamMembers.join(", ")}</p>
  */}

  
