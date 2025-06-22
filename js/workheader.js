export function createStyledPageTitle(text = "Works", containerSelector = ".work-header") {
  const style = document.createElement('style');
  style.textContent = `
    .work-header{
      padding:0px 15%;
      margin-top:20px;
    }
    .page-title {
      font-size: 2rem;
      color: #fff;
      text-align: left;
    }
  `;
  document.head.appendChild(style);

  const h1 = document.createElement('h1');
  h1.className = 'page-title';
  h1.textContent = text;

  const container = document.querySelector(containerSelector);
  if (container) {
    container.insertBefore(h1, container.firstChild);
  } else {
    document.body.insertBefore(h1, document.body.firstChild);
  }

  return h1;
}