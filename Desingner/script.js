const getImgUrl = (name) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsers%2F";
  return `${base}${encodeURIComponent(name)}.jpg?alt=media`;
};

window.getImgUrl = getImgUrl;
// DOM에 디자이너 카드 그리기
const grid = document.getElementById('designerGrid');

 fetch("../module/header.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("header-md").innerHTML = data;
      });

designers.forEach(d => {
  const div = document.createElement('div');
  div.innerHTML = `
    <a href="./Detail/view.html?id=${encodeURIComponent(d.name)}" class="grid-item" data-id="${d.name}">
      <div class="designer-img-wrap">
        <img src="${getImgUrl(d.name)}" alt="${d.name}_프로필" class="img-responsive">
      </div>
      <h2 class="head_title">
        <span>${d.name}</span>
      </h2>
    </a>
  `;
  grid.appendChild(div);
});