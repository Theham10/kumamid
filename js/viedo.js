// year, id 받아오기
const params = new URLSearchParams(window.location.search);
const videoId = params.get('id');
const year = params.get("year");

// 헤더 정보 로드
fetch("../module/header.html")
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
  });

document.addEventListener("DOMContentLoaded", () => {
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
    .then(res => res.json())
    .then(data => {
      const videoData = data.비디오.find(p => p.id === videoId);
      if (!videoData) {
        document.body.innerHTML = "<p>해당 포스트를 찾을 수 없습니다.</p>";
        return;
      }

      const designerNames = Array.isArray(videoData.designerName) ? videoData.designerName : [videoData.designerName];
      const designer = data.디자이너.find(d => designerNames.includes(d.name));

      document.title = videoData.postName;
      document.querySelector('.project-title').innerHTML = `${videoData.postName}`;
      document.querySelector('.project-client').innerHTML = `클라이언트 : ${videoData.client}`;
      document.querySelector('.project-description').innerHTML = videoData.clientDescription;
      document.querySelector('.project-section-text').innerHTML = videoData.videoDescription;

      if (designer) {
        tryLoadImageByImageTag(
          document.querySelector('.project-main-img'),
          designer.name,
          videoData.videoThumb,
          "img/default.png"
        );
      }

      if (videoData.vimeoId) {
        const iframe = document.createElement("iframe");
        iframe.src = `${videoData.vimeoId}`;
        iframe.style.aspectRatio = "16 / 9";
        iframe.style.width = "1440px";
        iframe.style.maxWidth = "100%";
        iframe.style.height = "auto";
        iframe.frameBorder = "0";
        iframe.allow = "autoplay; fullscreen; picture-in-picture";
        iframe.allowFullscreen = true;

        const container = document.querySelector('.project-section-image');
        container.innerHTML = '<div class="blur-background"></div>';
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.appendChild(iframe);
      }

      // ✅ stillCut 블록 통째로 제거 처리
      const projectStillCutSection = document.querySelector('.project-StillCut');
      if (videoData.stillCuts && Array.isArray(videoData.stillCuts) && videoData.stillCuts.length > 0) {
        const stillCutContainer = document.querySelector('.project-section-stillcut');

        videoData.stillCuts.forEach((cut) => {
          const block = document.createElement("div");
          block.className = "stillcut-block";
          const isArray = Array.isArray(cut.img);
          let imgHTML = "";

          if (isArray && cut.img != '') {
            imgHTML = `
              <div class="slideshow-wrapper">
                <img class="slideshow slideshow-a" data-index="0" data-img="${cut.img[0]}" src="">
                <img class="slideshow slideshow-b" data-index="0" style="opacity: 0;" src="">
              </div>
            `;
          } else if (cut.img != null) {
            imgHTML = `<img class="single-image" data-img="${cut.img}" src="">`;
          }

          block.innerHTML = `
            <h3>${cut.desc.split('<br/>')[0]}</h3>
            <p>${cut.desc.split('<br/>').slice(1).join('<br/>')}</p>
            ${imgHTML}
          `;

          stillCutContainer.appendChild(block);

          const baseImgEls = block.querySelectorAll("img[data-img]");
          baseImgEls.forEach((imgEl) => {
            tryLoadImageByImageTag(
              imgEl,
              Array.isArray(videoData.designerName) ? videoData.designerName[0] : videoData.designerName,
              imgEl.dataset.img
            );
          });
        });
      } else {
        if (projectStillCutSection) projectStillCutSection.remove();
      }

      // footer
      const footerContainer = document.querySelector('.project-footer-author');
      footerContainer.innerHTML = '';
      videoData.designerName.forEach(name => {
        const designer = data.디자이너.find(d => d.name === name);
        if (!designer) return;

        const footer = document.createElement('div');
        footer.className = 'footer-entry';

        const img = document.createElement('img');
        img.className = 'footer-author-img';
        img.src =
          designer ? `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FUsers%2F${encodeURIComponent(designer.name)}.jpg?alt=media`
          : "fallback.jpg";

        const nameDiv = document.createElement('div');
        nameDiv.className = 'footer-author-name';
        nameDiv.textContent = designer.name;

        footer.appendChild(img);
        footer.appendChild(nameDiv);

        footer.onclick = () => {
          window.location.href = `/view/디자이너상세정보.html?year=${year}&id=${designer.name}`;
        };

        footerContainer.appendChild(footer);
      });
    });
});
