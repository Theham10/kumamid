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

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const teamIndex = parseInt(params.get('id')); // 🔁 team은 index로 받음
  const year = sessionStorage.getItem("selectedYear") || "2023";

  fetch(`/data/${year}.json`)
    .then(res => res.json())
    .then(data => {
      const team = data.팀[teamIndex];
      if (!team) {
        document.body.innerHTML = "<p>해당 팀 정보를 찾을 수 없습니다.</p>";
        return;
      }

      // 🔽 타이틀 및 설명 채우기
      document.title = team.teamName;
      document.querySelector('.project-client').innerHTML = `팀명 : ${team.teamNameEng || team.teamName}`;
      document.querySelector('.project-description').innerHTML = team.teamDescription || "설명 없음";
      document.querySelector('.project-section-text').innerHTML = `팀원 : ${team.teamMembers?.join(", ") || "정보 없음"}`;

      // 🔽 이미지
      document.querySelector('.project-main-img').src =
        `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(team.teamThumbnail)}?alt=media`;

      // 🔽 푸터 (팀명만 넣자)
      document.querySelector('.footer-author-name').textContent = team.teamName;
      document.querySelector('.footer-author-img').src = "img/default_team.png"; // 팀 대표 이미지 없으면 고정
    });
});
