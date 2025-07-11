import { getImgUrl } from './all_getuserImg.js';

window.getImgUrl = getImgUrl;
// DOM에 디자이너 카드 그리기
const grid = document.getElementById('designerGrid');
const params = new URLSearchParams(window.location.search); // ← 이 줄 추가
const year = params.get("year");
if(!year){
   
}
  fetch(`/data/${year}.json`)
  .then(res => res.json())
  .then(data => {
    data.디자이너.forEach(designer => {
    const div = document.createElement('div');
    div.innerHTML = `
      <a href="/view/designerDetail.html?year=${year}&id=${encodeURIComponent(designer.name)}" class="grid-item" data-id="${designer.name}">
        <div class="designer-img-wrap">
          <img src="${getImgUrl(designer.name)}" alt="${designer.name}_프로필" class="img-responsive">
        </div>
        <h2 class="head_title">
          <span>${designer.name}</span>
        </h2>
      </a>
    `;
    grid.appendChild(div);
  });
});