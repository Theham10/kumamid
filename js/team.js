// 🔽 header 렌더링
fetch("../module/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-md").innerHTML = data;

    requestAnimationFrame(() => {
      const year = sessionStorage.getItem("selectedYear");
      if (year) {
        const count = parseInt(year) - 1999 + 1;
        const displayText = `제 ${count}회 ${year} 졸업전`;
        const el = document.querySelector("#header-md #exhibition-info");
        if (el) el.textContent = displayText;
      }
    });
  });

// 🔽 본문 내용 로딩
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get('id'); // 🔁 teamName 대신 숫자 ID로 받음
  const year = sessionStorage.getItem("selectedYear") || "2023";

  fetch(`/data/${year}.json`)
    .then(res => res.json())
    .then(data => {
      const team = data.팀.find(t => t.id === teamId); // ← 문자열 비교임! (숫자로 안 바꿔도 됨)
      if (!team) {
        document.body.innerHTML = "<p>해당 팀 정보를 찾을 수 없습니다.</p>";
        return;
      }

      // 타이틀 및 설명
      document.title = team.teamtitle || team.teamName;
      document.querySelector('.project-title').textContent = team.teamtitle || team.teamName;
      document.querySelector('.project-client').innerHTML = `클라이언트 : ${team.client}`;
      document.querySelector('.project-description').innerHTML = team.teamSubTitle;
      document.querySelector('.project-section-text').innerHTML = `
        ${team.teamDescription01 || ""}
        <br><br>${team.teamDescription02 || ""}
        <br><br>${team.teamDescription03 || ""}
      `;

      // 이미지
      const imgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(team.teamThumbnail)}?alt=media`;
      document.querySelector('.project-main-img').src = imgUrl;

      // 푸터
      document.querySelector('.footer-author-name').textContent = `팀원: ${team.teamMembers?.join(", ") || "정보 없음"}`;
    });
});
