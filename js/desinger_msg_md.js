// js/commentModule.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase 설정 및 초기화 (Realtime Database 포함)
const firebaseConfig = {
  apiKey: "AIzaSyBWer4zVpTNwXuzrcC1LiXxAHTTK7kcc6I",
  authDomain: "jvisiondesign-web.firebaseapp.com",
  databaseURL: "https://jvisiondesign-web-default-rtdb.firebaseio.com",
  projectId: "jvisiondesign-web",
  storageBucket: "jvisiondesign-web.firebasestorage.app",
  messagingSenderId: "191520684316",
  appId: "1:191520684316:web:08c611b8cad3fdbb0f22d9",
  measurementId: "G-EZ6RCL4MRR"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 댓글 불러오기
export function loadComments(year, designerName, containerSelector = ".comment-section") {
  const commentRef = ref(db, `comments/${year}/${designerName}`);
  onValue(commentRef, (snapshot) => {
    const container = document.querySelector(containerSelector);
    const commentList = container.querySelector(".comment-list");
    if (!commentList) return;

    commentList.innerHTML = '';
    const items = snapshot.val();

    if (items) {
      const entries = Object.values(items);
      entries.forEach(item => {
        const div = document.createElement("div");
        div.className = "comment-item";
        div.innerHTML = `
          <div class="comment-avatar">👤</div>
          <div class="comment-body">
            <div class="comment-header">
              <span class="comment-author">${item.name || "익명"}</span>
              <span class="comment-time">${new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
            <div class="comment-text">${item.content}</div>
          </div>`;
        commentList.appendChild(div);
      });

      // 댓글 수 표시
      const countSpan = container.querySelector("h3 span");
      if (countSpan) countSpan.textContent = entries.length;
    }
  });
}

// 댓글 추가
export function addComment(year, designerName) {
  const commentRef = ref(db, `comments/${year}/${designerName}`);
  const contentInput = document.getElementById("commentInput");
  const nameInput = document.getElementById("nameInput");

  const content = contentInput?.value.trim();
  const name = nameInput?.value.trim() || "익명";

  if (!content) return;

  push(commentRef, {
    name,
    content,
    timestamp: Date.now()
  });

  contentInput.value = "";
  if (nameInput) nameInput.value = "";
}
