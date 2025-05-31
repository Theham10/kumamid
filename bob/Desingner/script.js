const getImgUrl = (name) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsers%2F";
  return `${base}${encodeURIComponent(name)}.jpg?alt=media`;
};

// 디자이너 데이터 배열
window.designers = [
    {
      name: "곽희진",
    },
    {
      name: "김민주",
    },
    {
      name: "김사랑",
    },
    {
      name: "김은서",
    },
    {
      name: "김참슬",
    },
    {
      name: "김태영",
    },
    {
      name: "김혜령",
    },
    {
      name: "김효진",
    },
    {
      name: "노동균",
    },
    {
      name: "서지원",
    },
    {
      name: "송정호",
    },
    {
      name: "안성현",
    },
    {
      name: "안장현",
    },
    {
      name: "여수지",
    },
    {
      name: "예주은",
    },
    {
      name: "오수경",
    },
    {
      name: "오승은",
    },
    {
      name: "왕영은",
    },
    {
      name: "위혜림",
    },
    {
      name: "유영훈",
    },
    {
      name: "이건희",
    },
    {
      name: "이기석",
    },
    {
      name: "이민혁",
    },
    {
      name: "이성준",
    },
    {
      name: "이승호",
    },
    {
      name: "이윤정",
    },
    {
      name: "이윤지",
    },
    {
      name: "이지혁",
    },
    {
      name: "이채원",
    },
    {
      name: "이채은",
    },
    {
      name: "이혜린",
    },
    {
      name: "이희창",
    },
    {
      name: "임수현",
    },
    {
      name: "장소정",
    },
    {
      name: "장인규",
    },
    {
      name: "정우경",
    },
    {
      name: "정진모",
    },
    {
      name: "조민국",
    },
    {
      name: "최명진",
    },
    {
      name: "최하현",
    },{
        name: "최효민",
    },
    {
      name: "한유정",
    },
    {
      name: "홍은택",
    },
   {
    name: "홍채은",
    profileText:"홍채은.txt",
    posterFile: "홍채은.png",       // ✅ 메인 포스터
    posterThumb: "홍채은1x1.png",   // ✅ 1x1 썸네일 (선택)
    posterText: "Text_Poster.txt"  // ✅ 설명 텍스트 (선택)
  },
  ];

window.getImgUrl = getImgUrl;
// DOM에 디자이너 카드 그리기
const grid = document.getElementById('designerGrid');

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
  console.log(getImgUrl("곽희진"));
  grid.appendChild(div);
});