fetch("/module/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-md").innerHTML = data;

    requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const year = params.get("year");
      if (year) {
        const count = parseInt(year) - 1999 + 1;
        const displayText = `제 ${count}회 ${year} 졸업전`;
        const el = document.querySelector("#header-md #exhibition-info");
        if (el) el.textContent = displayText;
      }else{
        alert("년도를 선택해주세요");
        window.location.href = "/index.html";
      }
    });
  });
