import { getImgUrl, getUserAssetPostUrl, getUserAssetUrl } from './all_getuserImg.js';
import { loadComments, addComment } from './desinger_msg_md.js';

  const params = new URLSearchParams(window.location.search);
  const designerId = params.get('id');
  const year = params.get("year");

// 헤더 로드 (DOMContentLoaded 밖에서 처리)
fetch("/module/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-md").innerHTML = data;
    requestAnimationFrame(() => {
      if (year) {
        const count = parseInt(year) - 1999 + 1;
        const displayText = `제 ${count}회 ${year} 졸업전`;
        const el = document.querySelector("#header-md #exhibition-info");
        if (el) el.textContent = displayText;
      }
    });
  })
  .catch(error => console.error("Error loading header:", error));

document.addEventListener("DOMContentLoaded", () => {


  // 팀 프로젝트 URL 생성 함수 (변경 없음)
  const TeamAssetUrl = (projectname, thumnail) => {
    const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";
    const fullPath = `${year}/TeamWorkData/${projectname}/${thumnail}`;
    return `${base}${encodeURIComponent(fullPath)}?alt=media`;
  };

  // 이미지 로드 함수 (이전에 수정된 내용과 동일하게 유지)
  function tryLoadImageByImageTag(imgEl, name, file, fallback) {
    const folders = ["VideoSorce", "VideoSorce01", "VideoSorce02"];
    const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";
    const encodedName = encodeURIComponent(name);
    const encodedFile = encodeURIComponent(file);

    const urls = folders.map(folder => `${base}${year}%2FUsersWorkData%2F${encodedName}%2F${folder}%2F${encodedFile}?alt=media`);

    const tryNext = (index) => {
      if (index >= urls.length) {
        imgEl.src = fallback;
        return;
      }
      const img = new Image();
      img.onload = () => imgEl.src = urls[index];
      img.onerror = () => tryNext(index + 1);
      img.src = urls[index];
    };
    tryNext(0);
  }

  fetch(`/data/${year}.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const designer = data.디자이너.find(d => d.name === designerId);

      if (!designer) {
        document.querySelector(".detail-container").innerHTML = "<p>디자이너 정보를 찾을 수 없습니다.</p>";
        return;
      }

      // 디자이너 정보 출력
      const profileImgEl = document.getElementById("profileImg");
      if (profileImgEl) {
        const profileImgUrl = getImgUrl(designer.name);
        console.log("profileImgUrl:", profileImgUrl);
        profileImgEl.src = profileImgUrl;
        profileImgEl.alt = `${designer.name}_프로필`;
      }

      document.title = designer.name;
      document.getElementById("designerName").textContent = designer.name;

      const mainProjectContainer = document.querySelector(".detail-project"); // ⭐ 모든 프로젝트 아이템을 담을 단일 컨테이너
      mainProjectContainer.innerHTML = ''; // 기존 내용 초기화

      // 모든 프로젝트를 담을 배열 생성
      const allProjects = [];

      // 비디오 프로젝트 추가
      
      // 포스터 프로젝트 추가
      const postProjects = data.포스트.filter(p => {
        if (Array.isArray(p.designerName)) {
          return p.designerName.includes(designer.name);
        } else {
          return p.designerName === designer.name;
        }
      });
      postProjects.forEach(postData => {
        allProjects.push({ type: 'poster', data: postData, designerName: designer.name });
      });

      const videoProjects = data.비디오.filter(v => {
        if (Array.isArray(v.designerName)) {
          return v.designerName.includes(designer.name);
        } else {
          return v.designerName === designer.name;
        }
      });
      videoProjects.forEach(videoData => {
        allProjects.push({ type: 'video', data: videoData, designerName: designer.name });
      });

      const teamProjects = data.팀.filter(t => {
      if (Array.isArray(t.teamMembers)) {
        return t.teamMembers.includes(designer.name);
      } else {
        return t.designerName === designer.name;
      }
    });
      // 팀 프로젝트 추가
      teamProjects.forEach(teamData => {
        allProjects.push({ type: 'team', data: teamData, designerName: designer.name });
      });


      // 모든 프로젝트 렌더링
      allProjects.forEach(project => {
        const projectItemDiv = document.createElement("div");
        projectItemDiv.classList.add("project-item");

        let title = '';
        let typeText = '';
        let mediaElement; // 이미지 또는 iframe

        if (project.type === 'poster') {
          mediaElement = document.createElement("img");
          mediaElement.src = getUserAssetPostUrl(project.designerName, project.data.posterFile);
          mediaElement.alt = `${project.designerName}_포스터`;
          title = project.data.postName;
          typeText = '포스터';
          projectItemDiv.classList.add('poster-type'); // 포스터 타입 클래스 추가 (필요시 CSS에서 활용)
          projectItemDiv .onclick = function() {
            location.href=`../view/postView.html?year=${year}&id=${project.data.id}`
          }
        }else if (project.type === 'video') {
          // 비디오 썸네일 이미지 생성
          mediaElement = document.createElement("img");
          tryLoadImageByImageTag(
            mediaElement,
            project.designerName,
            project.data.videoThumb,
            "img/default.png"
          );
          title = project.data.postName || '제목 없음';
          typeText = '비디오';
          projectItemDiv.classList.add('video-type'); // 비디오 타입 클래스 추가 (필요시 CSS에서 활용)
            projectItemDiv .onclick = function() {
            location.href=`../view/videoView.html?year=${year}&id=${project.data.id}`
          }
        } else if (project.type === 'team') {
          mediaElement = document.createElement("img");
          mediaElement.src = TeamAssetUrl(project.data.teamName, project.data.teamThumbnail);
          title = project.data.teamtitle;
          typeText = '팀 프로젝트';
          projectItemDiv.classList.add('team-type'); // 팀 프로젝트 타입 클래스 추가 (필요시 CSS에서 활용)
            projectItemDiv .onclick = function() {
            location.href=`../view/year=${year}&teamView.html?id=${project.data.id}`
          }
        }

        if (mediaElement) {
          projectItemDiv.appendChild(mediaElement); // 미디어 요소 추가
        }

        // 프로젝트 제목 및 타입 추가
        const projectTitleDiv = document.createElement("div");
        projectTitleDiv.innerHTML = `<strong style="font-size:20px">${title}</strong><br/><p style="font-size:14px; color:#e5e5e5">${typeText}</p>`;
        projectItemDiv.appendChild(projectTitleDiv);

        mainProjectContainer.appendChild(projectItemDiv); // 모든 프로젝트 아이템을 mainProjectContainer에 추가
      });

      const comment = designer.profileComment || "";
      const email = designer.profileEmail || "";
      const hope = designer.profileDream || "";
      console.log("comment:", comment);
      document.querySelector(".designer-quote").innerHTML = `<strong>${comment}</strong>`;
      document.querySelector(".profile-info").innerHTML = `
        <div class="profile-role">${hope}</div>
        <div class="profile-email">${email}</div>
      `;

      function renderComments() {
        // 댓글 렌더링 로직 (현재 코드에서는 구현되지 않음)
        loadComments(year, designerId);
        document.getElementById("commentSubmitBtn")?.addEventListener("click", () => addComment(year, designerId));
      }

      renderComments();
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      document.querySelector(".detail-container").innerHTML = `<p>데이터를 불러오는 중 오류가 발생했습니다: ${error.message}</p>`;
    });
});