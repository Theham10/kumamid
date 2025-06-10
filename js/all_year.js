function goTo(page) {
  const year = localStorage.getItem("selectedYear");
  if (!year) {
    alert("요!");
    return;
  }
  window.location.href = page;
}