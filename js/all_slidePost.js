export function insertPosterNavigation(data, postId, year) {
  console.log("[DEBUG] insertPosterNavigation called:", postId, year);
  const isVideo = data.비디오?.some(p => p.id === postId);
  const isTeam = data.팀?.some(p => p.id === postId);
  const list = isVideo ? data.비디오 : isTeam ? data.팀 : data.포스트;
  const currentIndex = list.findIndex(p => p.id === postId);
  const footerAuthor = document.querySelector('.project-footer-author') || document.querySelector('.team-members-container');
  if (!footerAuthor) {
    console.warn("⚠️ .project-footer-author or .team-members-container not found.");
    return;
  }
  const nameElem = footerAuthor.querySelector('.footer-author-name') || document.createElement('div');
  const originalName = nameElem.textContent;
  let nameHTML = `<span class="author-name-text">${originalName}</span>`;
  nameElem.innerHTML = nameHTML;

  const leftNav = document.createElement('span');
  leftNav.className = 'poster-nav left';
  leftNav.textContent = '‹';

  const rightNav = document.createElement('span');
  rightNav.className = 'poster-nav right';
  rightNav.textContent = '›';

  if (currentIndex > 0) {
    leftNav.onclick = () => {
      const prevId = list[currentIndex - 1].id;
      const nextHref = isVideo ? '/view/videoView.html' : isTeam ? '/view/teamView.html' : '/view/postView.html';
      window.location.href = `${nextHref}?year=${year}&id=${prevId}`;
    };
  } else {
    leftNav.style.display = 'none';
  }

  if (currentIndex < list.length - 1) {
    rightNav.onclick = () => {
      const nextId = list[currentIndex + 1].id;
      const nextHref = isVideo ? '/view/videoView.html' : isTeam ? '/view/teamView.html' : '/view/postView.html';
      window.location.href = `${nextHref}?year=${year}&id=${nextId}`;
    };
  } else {
    rightNav.style.display = 'none';
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'poster-nav-wrapper';
  navWrapper.appendChild(leftNav);
  if (nameElem) navWrapper.appendChild(nameElem);
  navWrapper.appendChild(rightNav);

  footerAuthor.appendChild(navWrapper);

  const navStyle = document.createElement('style');
  navStyle.textContent = `
    .footer-author-name {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 2.5rem;
      color: white;
    }

    .poster-nav {
      font-size: 3.2rem;
      font-weight: 600;
      color: #aaa;
      cursor: pointer;
      user-select: none;
      margin: 0 10px;
      padding: 1rem 1.5rem;
      line-height: 1.2;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .poster-nav:hover {
      color: #ffa647;
    }

    @media (max-width: 768px) {
      .poster-nav-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-direction: row;
        margin-top: 10px;
      }

      .footer-author-name {
        font-size: 2rem;
        order: 1;
      }

      .poster-nav.left {
        order: 0;
      }

      .poster-nav.right {
        order: 2;
      }
    }

    @media (min-width: 769px) {
      .project-footer-author {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        position: relative;
      }

      .poster-nav.left {
        position: absolute;
        left: 15%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 3rem;
        z-index: 10;
      }

      .poster-nav.right {
        position: absolute;
        right: 15%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 3rem;
        z-index: 10;
      }

      .footer-author-img {
        order: 1;
      }

      .footer-author-name {
        order: 2;
        display: block;
        font-size: 2.5rem;
        color: white;
      }
    }
  `;
  document.head.appendChild(navStyle);
}