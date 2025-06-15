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
    const folder = encodeURIComponent(team.teamfolder || team.teamName);  // teamfolder 기준 사용
    const imgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder}%2F${encodeURIComponent(team.mainImage)}?alt=media`;
    const subimgUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.client)}%2F${encodeURIComponent(team.mainImage)}?alt=media`;

    const imgEl = document.querySelector('.project-main-img');
    const preloadImg = new Image();
    preloadImg.onload = () => imgEl.src = imgUrl;
    preloadImg.onerror = () => imgEl.src = subimgUrl;
    preloadImg.src = imgUrl;


    //비디오
   // 비디오
const videoUrl = team.video;
const iframe = document.querySelector('.project-video');

if (videoUrl && iframe) {
  let embedUrl = "";

  if (videoUrl.includes("vimeo.com")) {
    const videoId = videoUrl.split("/").pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  } else if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    // 유튜브 전체 주소나 축약주소 모두 처리
    if (videoUrl.includes("embed")) {
      embedUrl = videoUrl; // 이미 embed 형식이면 그대로
    } else if (videoUrl.includes("watch?v=")) {
      const videoId = new URL(videoUrl).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtu.be/")) {
      const videoId = videoUrl.split("youtu.be/")[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  if (embedUrl) {
    iframe.src = embedUrl;
  } else {
    const section = iframe.closest('.content-box');
    if (section) section.style.display = 'none';
  }
} else {
  const section = iframe?.closest('.content-box');
  if (section) section.style.display = 'none';
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
      const folder1 = encodeURIComponent(team.teamfolder || team.teamName); // 기본 폴더
      const folder2 = encodeURIComponent(team.client); // 예외 fallback 폴더
      const encodedFile = encodeURIComponent(file);

      const url1 = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder1}%2F${encodedFile}?alt=media`;
      const url2 = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder2}%2F${encodedFile}?alt=media`;

      ppmImg.onerror = () => {
        ppmImg.onerror = null; // 재귀 방지
        ppmImg.src = url2;
      };
      ppmImg.src = url1;
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
  const folder = encodeURIComponent(team.teamfolder || team.teamName);
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder}%2F${encodeURIComponent(team.membersImg)}?alt=media`;
  const fallbackUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.client)}%2F${encodeURIComponent(team.membersImg)}?alt=media`;

  const container = document.createElement("div");
  container.className = "content-box";
  container.innerHTML = `
    <h1>Members Image</h1>
    <div class="members-img-wrap">
      <img class="members-img" src="${baseUrl}" alt="팀 구성원 이미지">
    </div>
  `;

}

if (team.membersImg) {
  const folder = encodeURIComponent(team.teamfolder || team.teamName);
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder}%2F${encodeURIComponent(team.membersImg)}?alt=media`;
  const fallbackUrl = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${encodeURIComponent(team.client)}%2F${encodeURIComponent(team.membersImg)}?alt=media`;

  const imgEl = document.querySelector(".members-img");
  if (imgEl) {
    imgEl.src = baseUrl;
    imgEl.onerror = () => {
      imgEl.src = fallbackUrl;
    };
  }
} else {
  // 이미지 없으면 섹션 숨기기
  const section = document.querySelector(".members-img-wrap")?.closest(".content-box");
  if (section) section.style.display = "none";
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
  const folder1 = encodeURIComponent(team.teamfolder || teamName); // 기본 폴더
  const folder2 = encodeURIComponent(team.client); // 예외 fallback 폴더
  const encodedFile = encodeURIComponent(filename);

  const url1 = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder1}%2F${encodedFile}?alt=media`;
  const url2 = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FTeamWorkData%2F${folder2}%2F${encodedFile}?alt=media`;

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

  imgEl.onerror = () => {
    imgEl.onerror = null; // 재귀 방지
    imgEl.src = url2;
  };

  imgEl.src = url1;
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
