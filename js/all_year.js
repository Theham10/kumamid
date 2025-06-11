function goTo(page) {
  const params = new URLSearchParams(window.location.search); // ← 이 줄 추가
  const year = params.get("year");
  if (!year) {
    alert("요!");
    return;
  }
  console.log(year)
  window.location.href = page+`?year=${year}`;
}

window.goTo = goTo;