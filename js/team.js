// 🔽 header 렌더링
fetch("/module/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-md").innerHTML = data;

    requestAnimationFrame(() => {
      const year = localStorage.getItem("selectedYear");
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
  const year = localStorage.getItem("selectedYear") || "2023";

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

    //비디오
    const vimeoUrl = team.video;
    if (vimeoUrl && vimeoUrl.includes("vimeo.com")) {
      const videoId = vimeoUrl.split("/").pop(); // 예: 835133108
      const embedUrl = `https://player.vimeo.com/video/${videoId}`;
      const iframe = document.querySelector('.project-video');
      if (iframe) iframe.src = embedUrl;
    } else {
      const videoSection = document.querySelector('.project-video')?.closest('.content-box');
      if (videoSection) videoSection.style.display = 'none';
    }


    // 🔽 PPM 슬라이드
    if (team.teamPPMNote && team.teamPPMNote.length > 0) {
  const ppmList = team.teamPPMNote;
  let currentIndex = 0;

  const ppmImg = document.querySelector('.ppm-image');
  const prevBtn = document.querySelector('.ppm-btn.prev');
  const nextBtn = document.querySelector('.ppm-btn.next');

  const updateImage = () => {
    const file = ppmList[currentIndex];
    const src = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(file)}?alt=media`;
    ppmImg.src = src;
  };

  updateImage();

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + ppmList.length) % ppmList.length;
    updateImage();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % ppmList.length;
    updateImage();
  });
} else {
  const section = document.querySelector('.ppm-carousel')?.closest('.content-box');
  if (section) section.style.display = 'none';
}


  if (team.membersImg) {
  const imgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.teamName)}%2F${encodeURIComponent(team.membersImg)}?alt=media`;

  const container = document.createElement("div");
  container.className = "content-box";
  container.innerHTML = `
  
    <h1>Members Image</h1>
    <div class="members-img-wrap">
      <img class="members-img" src="${imgUrl}" alt="팀 구성원 이미지">
    </div>
  `;

  const divider = document.querySelectorAll('.footer-divider')[1]; // ← 두 번째 선
  if (divider) {
    divider.insertAdjacentElement("afterend", container);
  }
}

    // 자동슬라이더 이미지 
function setupAutoSlider(imageList, teamName, containerId, textList = []) {
  const container = document.getElementById(containerId);
  const titleEl = container?.previousElementSibling; // 바로 위 <h1> 요소 가져오기

  
  if (!container || !Array.isArray(imageList) || imageList.length === 0) {
    if (container) container.style.display = "none";
    if (titleEl?.tagName === "H1") titleEl.style.display = "none"; // 🔥 제목 숨김
    return;
  }
  
  if (!container || !Array.isArray(imageList) || imageList.length === 0) {
    if (container) container.style.display = "none";
    return;
  }

  const imgEl = container.querySelector("img");
  const textEl = container.querySelector(".overlay-text");
  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");

  if (!imgEl) {
    container.style.display = "none";
    return;
  }

  let index = 0;

  // ✅ 이미지 로드 후에 텍스트 보여주기 (onload 동기화)
  const updateImg = () => {
    const filename = imageList[index];
    const url = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(teamName)}%2F${encodeURIComponent(filename)}?alt=media`;

    imgEl.onload = () => {
      const currentText = textList[index];
      if (textEl) {
        if (currentText && currentText.trim() !== "") {
          textEl.innerHTML = currentText;
          textEl.style.display = "block";
        } else {
          textEl.style.display = "none";
        }
      }
    };

    imgEl.src = url;
  };

  updateImg();

  setInterval(() => {
    index = (index + 1) % imageList.length;
    updateImg();
  }, 4000);

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

    if (team.storyBord && team.storyBord.length > 0) {
  setupAutoSlider(team.storyBord, team.teamName, "storyBord-slider");
    } else {
      // 이미지 없으면 통째로 숨김
      const section = document.querySelector('#storyBord-slider')?.closest('.content-box');
      if (section) section.style.display = 'none';
    }

    if (team.memoRise && team.memoRise.length > 0) {
      setupAutoSlider(team.memoRise, team.teamName, "memoRise-slider", team["m-inner-text"]);
    } else {
      const section = document.querySelector('#memoRise-slider')?.closest('.content-box');
      if (section) section.style.display = 'none';
    }



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
        img.onclick = () => {
          window.location.href=`/view/디자이너상세정보.html?year=${year}&id=${name}`
        }

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
