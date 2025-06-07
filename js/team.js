import { getImgUrl, getUserAssetUrl } from './all_getuserImg.js';
window.getImgUrl = getImgUrl;

// ✅ year와 teamGrid 정의 필요
const year = localStorage.getItem("selectedYear") || "2023";
const teamGrid = document.getElementById("team");


data.팀.forEach(team => {
  const imgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(team.teamThumbnail)}?alt=media`;
  const description = team.teamDescription || "";

  const teamDiv = document.createElement('div');
  teamDiv.innerHTML = `
    <div class="grid-item">
      <div class="designer-img-wrap">
        <img src="${imgUrl}" alt="${team.teamName}_썸네일" class="img-responsive">
      </div>
      <h2 class="head_title"><span>${team.teamName}</span></h2>
      <p class="team-description">${description}</p>
    </div>
  `;
  teamGrid.appendChild(teamDiv);
});
