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
      document.querySelector(".project-team-names").textContent = team.teamMembers?.join(", ") || "팀원 정보 없음";

      // ✅ teamDescription들만 별도 영역에 출력
      /*  document.querySelector('.project-section-text').innerHTML = `
        ${team.teamDescription01 || ""}
        <br><br>${team.teamDescription02 || ""}
        <br><br>${team.teamDescription03 || ""}
        `;*/

      // 이미지 설정
    const imgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(team.mainImage)}?alt=media`;
    document.querySelector('.project-main-img').src = imgUrl;

      const vimeoUrl = team.video;
    if (vimeoUrl && vimeoUrl.includes("vimeo.com")) {
    const videoId = vimeoUrl.split("/").pop(); // 835133108
    const embedUrl = `https://player.vimeo.com/video/${videoId}`;
    const iframe = document.querySelector('.project-video');
    if (iframe) iframe.src = embedUrl;
    }

    // 🔽 PPM 슬라이드
    const ppmList = team.teamPPMNote || [];
    let currentIndex = 0;

    if (ppmList.length > 0) {
    const ppmImg = document.querySelector('.ppm-image');
    const prevBtn = document.querySelector('.ppm-btn.prev');
    const nextBtn = document.querySelector('.ppm-btn.next');

    const updateImage = () => {
        const file = ppmList[currentIndex];
        const src = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(file)}?alt=media`;
        ppmImg.src = src;
    };

    // 처음 이미지 설정
    updateImage();

    // 버튼 기능
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + ppmList.length) % ppmList.length;
        updateImage();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % ppmList.length;
        updateImage();
    });
    }

    // 자동슬라이더 이미지 
function setupAutoSlider(imageList, teamName, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !imageList || !Array.isArray(imageList) || imageList.length === 0) {
    if (container) container.style.display = "none"; // 컨테이너까지 안보이게
    return;
  }

  const imgEl = container.querySelector("img");
  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");

  if (!imgEl) {
    container.style.display = "none";
    return;
  }

  // 이미지가 1개인 경우 → 슬라이드 없이 1장만 표시 + 버튼 숨김
  if (imageList.length === 1) {
    const filename = imageList[0];
    const url = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(teamName)}%2F${encodeURIComponent(filename)}?alt=media`;
    imgEl.src = url;

    if (prev) prev.style.display = "none";
    if (next) next.style.display = "none";
    return;
  }

  // 슬라이더 동작
  let index = 0;

  const updateImg = () => {
    const filename = imageList[index];
    const url = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(teamName)}%2F${encodeURIComponent(filename)}?alt=media`;
    imgEl.src = url;
  };

  updateImg();

  setInterval(() => {
    index = (index + 1) % imageList.length;
    updateImg();
  }, 4000);

  // 버튼 작동
  if (prev && next) {
    prev.addEventListener("click", () => {
      index = (index - 1 + imageList.length) % imageList.length;
      updateImg();
    });

    next.addEventListener("click", () => {
      index = (index + 1) % imageList.length;
      updateImg();
    });
  }
}


    setupAutoSlider(team.storyBord, team.teamName, "storyBord-slider");
    setupAutoSlider(team.memoRise, team.teamName, "memoRise-slider");

    //디저이너 데이터 렌더링 
    const memberWrap = document.getElementById("team-members-wrap");
    if (memberWrap && team.teamMembers?.length) {
    team.teamMembers.forEach(name => {
        const div = document.createElement("div");
        div.classList.add("member-box");

        const img = document.createElement("img");
        img.src = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FUsers%2F${encodeURIComponent(name)}.jpg?alt=media`;
        img.alt = name;
        img.classList.add("member-img");

        const span = document.createElement("span");
        span.textContent = name;
        span.classList.add("member-name");

        div.appendChild(img);
        div.appendChild(span);
        memberWrap.appendChild(div);
    });
    }

    /* 비디오, 사진, 사진, 사진 설명 텍스트 출력구간 */
    const vText = team["v-text"];
    const sText = team["s-text"];
    const mText = team["m-text"];
    const pptText = team["ppt-text"];

    if (vText) {
    const vEl = document.querySelector(".v-text");
    if (vEl) vEl.innerHTML = vText;
    }

    if (sText) {
    const sEl = document.querySelector(".s-text");
    if (sEl) sEl.innerHTML = sText;
    }

    if (mText) {
    const mEl = document.querySelector(".m-text");
    if (mEl) mEl.innerHTML = mText;
    }

    if (pptText) {
    const pptEl = document.querySelector(".ppt-text");
    if (pptEl) pptEl.innerHTML = pptText;
    }


      // 푸터
      document.querySelector('.footer-author-name').textContent = `팀원: ${team.teamMembers?.join(", ") || "정보 없음"}`;
    });
});
