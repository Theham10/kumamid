const getImgUrl = (name) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsers%2F";
  return `${base}${encodeURIComponent(name)}.jpg?alt=media`;
};

window.getImgUrl = getImgUrl;
// DOM에 디자이너 카드 그리기
const grid = document.getElementById('designerGrid');
const year = localStorage.getItem("selectedYear") || "2023";


