import { getImgUrl } from './all_getuserImg.js';


fetch("/module/header.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("header-md").innerHTML = data;
      });
    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const year = sessionStorage.getItem("selectedYear") || "2023";

      const getUserAssetUrl = (name, type, filename) => {
        const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";
        const fullPath = type
          ? `2023/UsersWorkData/${name}/${type}/${filename}`
          : `2023/UsersWorkData/${name}/${filename}`;  // flat path if type is empty
        return `${base}${encodeURIComponent(fullPath)}?alt=media`;
      };
      const TeamAssetUrl = (projectname, thumnail) => {
        const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";
        const fullPath = `2023/TeamWorkData/${projectname}/${thumnail}`;
        return `${base}${encodeURIComponent(fullPath)}?alt=media`;
      };

      fetch(`/data/${year}.json`)
        .then(res => res.json())
        .then(data => {
          const designer = data.디자이너.find(d => d.name === id);
          console.log(designer)

          if (designer) {
            const profileImgEl = document.getElementById("profileImg");
            if (profileImgEl) {
              const profileImgUrl = getImgUrl(designer.name);
              console.log("profileImgUrl:", profileImgUrl);
              profileImgEl.src = profileImgUrl;
              profileImgEl.alt = `${designer.name}_프로필`;
            }

            document.title = designer.name;
            document.getElementById("designerName").textContent = designer.name;

            if (designer.posterThumb) {
              const poster = document.createElement("img");
              const posterName = document.createElement("div");
              poster.src = getUserAssetUrl(designer.name, "PosterSorce", designer.posterThumb);
              poster.alt = `${designer.name}_포스터`;
              posterName.innerHTML = `<strong style="font-size:20px">${designer.posterName}</strong><br/><p style="font-size:14px; color:#e5e5e5">포스터</p>`;
              document.querySelector(".detail-project-img").appendChild(poster);
              document.querySelector(".detail-project-img").appendChild(posterName);
            }

            if (designer.videoFile) {
              const video = document.createElement("img");
              const vidioName = document.createElement("div");
              video.src = getUserAssetUrl(designer.name, "VideoSorce", designer.videoFile);
              video.controls = true;
              vidioName.innerHTML = `<strong style="font-size:20px">${designer.vidioName}</strong><br/><p style="font-size:14px; color:#e5e5e5">비디오</p>`;
              document.querySelector(".detail-project-vidio").appendChild(video);
              document.querySelector(".detail-project-vidio").appendChild(vidioName);
            }
            if (designer.teamProjectThum) {
              const tproject = document.createElement("img");
              const tprojectName = document.createElement("div");
              tproject.src = TeamAssetUrl(designer.teamWork, designer.teamProjectThum);
              tproject.controls = true;
              tprojectName.innerHTML = `<strong style="font-size:20px">${designer.teamWorkEng}</strong><br/><p style="font-size:14px; color:#e5e5e5">팀 프로젝트</p>`;
              document.querySelector(".detail-project-tproject").appendChild(tproject);
              document.querySelector(".detail-project-tproject").appendChild(tprojectName);
            }

            // Render specific labeled content from .txt file if profileText exists
            // JSON 안에 값이 있다면 바로 DOM에 출력
            const comment = designer.profileComment || "";
            const email = designer.profileEmail || "";
            const hope = designer.profileDream || "";
            console.log("comment:", comment);
            document.querySelector(".designer-quote").innerHTML = `<strong>${comment}</stong>`;
            document.querySelector(".profile-info").innerHTML = `${hope}<br>${email}`;
          } else {
            document.querySelector(".detail-container").innerHTML = "<p>디자이너 정보를 찾을 수 없습니다.</p>";
          }

          function getComments() {
            const saved = localStorage.getItem(`comments_${id}`);
            return saved ? JSON.parse(saved) : [];
          }

          function addComment() {
            const input = document.getElementById('commentInput');
            const comment = input.value.trim();
            if (!comment) return;

            const comments = getComments();
            comments.push(comment);
            localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
            input.value = '';
            renderComments();
          }

          function renderComments() {
            // Implement comment rendering
          }

          renderComments();
        });
    });