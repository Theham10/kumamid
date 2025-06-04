import { getImgUrl ,getUserAssetUrl } from './all_getuserImg.js';

window.getImgUrl = getImgUrl;
const year = localStorage.getItem("selectedYear") || "2023";
const grid = document.getElementById("project-list");
fetch("/module/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header-md").innerHTML = data;
    });

fetch(`/data/${year}.json`)
    .then(res => res.json())
    .then(data => {
        data.포스트.forEach(post => {
            // 포스트에 맞는 디자이너 찾기
            const designer = data.디자이너.find(d => d.name === post.designerName);

            // 대표 이미지: 디자이너의 포스터 썸네일 사용
            const posterImg = designer ? getUserAssetUrl(designer.name,"PosterSorce",designer.posterThumb) : 'img/default.png';

            const div = document.createElement('div');
            div.innerHTML = `
                <a href="./postView.html?id=${encodeURIComponent(post.id)}" class="grid-item" data-id="${post.id}">
                    <div class="designer-img-wrap">
                        <img src="${posterImg}" alt="${post.postName}_포스터" class="img-responsive">
                    </div>
                    <h2 class="head_title">
                        <span>${post.postName}</span>
                    </h2>
                </a>
            `;
            grid.appendChild(div);
        });
    });