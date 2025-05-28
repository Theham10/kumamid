function goTo(page) {
  const year = sessionStorage.getItem("selectedYear");
  if (!year) {
    alert("먼저 연도를 선택해주세요!");
    return;
  }
  window.location.href = page;
}