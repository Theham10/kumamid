function goTo(page) {
  const params = new URLSearchParams(window.location.search); // ← 이 줄 추가
  const year = params.get("year");
  if (!year) {
    alert("요!");
    return;
  }
  window.location.href = page + `?year=${year}`;
}

window.goTo = goTo;
const currentPage = location.pathname.split("/").pop().toLowerCase();
console.log(currentPage)
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav a");
    const header = document.querySelector(".header");

    navLinks.forEach(link => {
      const match = link.getAttribute("onclick")?.match(/goTo\('(.+?)'\)/);
      if (!match) return;
      const linkPage = match[1].toLowerCase().replace('.html', '');
      const currentPath = currentPage.replace('.html', '');

      if (currentPath === linkPage) {
        link.classList.add("active-nav");
      } else {
        link.classList.remove("active-nav");
      }
    });

    window.addEventListener("scroll", () => {
      if (!header) return;
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  });