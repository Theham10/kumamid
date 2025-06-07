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
  const isPostTab = document.querySelector("#post");
  if (!isPostTab) return;

  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');
  const year = sessionStorage.getItem("selectedYear") || "2023";

  fetch(`/data/${year}.json`)
    .then(res => res.json())
    .then(data => {
      const postData = data.포스트.find(p => p.id === postId);
      if (!postData) {
        document.querySelector("#post").innerHTML = "<p>해당 포스트를 찾을 수 없습니다.</p>";
        return;
      }
      const designer = data.디자이너.find(d => d.name === postData.designerName);
      document.title = postData.postName;
      document.querySelector('.project-client').innerHTML  = `클라이언트 : ${postData.client}`;
      document.querySelector('.project-description').innerHTML  = postData.clientDescription;
      document.querySelector('.project-section-text').innerHTML  = postData.subDescription;

      document.querySelector('.project-main-img').src =
        designer ? `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsersWorkData%2F${encodeURIComponent(designer.name)}%2FPosterSorce%2F${encodeURIComponent(designer.posterThumb)}?alt=media`
        : "default.png";

      document.querySelector('.project-section-image img').src =
        designer ? `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsersWorkData%2F${encodeURIComponent(designer.name)}%2FPosterSorce%2F${encodeURIComponent(designer.posterFile)}?alt=media`
        : "default2.png";

      document.querySelector('.footer-author-name').textContent = designer?.name || "Unknown";
      document.querySelector('.footer-author-img').src =
        designer ? `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsers%2F${encodeURIComponent(designer.name)}.jpg?alt=media`
        : "fallback.jpg";
    });
});
