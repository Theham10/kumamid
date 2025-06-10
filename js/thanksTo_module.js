// js/comment-module.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWer4zVpTNwXuzrcC1LiXxAHTTK7kcc6I",
  authDomain: "jvisiondesign-web.firebaseapp.com",
  projectId: "jvisiondesign-web",
  storageBucket: "jvisiondesign-web.firebasestorage.app",
  messagingSenderId: "191520684316",
  appId: "1:191520684316:web:08c611b8cad3fdbb0f22d9",
  measurementId: "G-EZ6RCL4MRR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getTimeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000 / 60);
  if (diff < 60) return `${diff}분 전`;
  if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
  return `${Math.floor(diff / 1440)}일 전`;
}

function renderComment({ name, text, timestamp }) {
  const commentList = document.getElementById("comment-list");
  const item = document.createElement("div");
  item.className = "comment-item";

  // 1. comment-left-section 생성 및 그 안에 comment-meta, comment-text, comment-setting 추가
  const leftSection = document.createElement("div");
  leftSection.className = "comment-left-section";

  // 2. comment-meta 생성 (comment-time만 포함)
  const meta = document.createElement("div");
  meta.className = "comment-meta";
  meta.innerHTML = `<span class="comment-time">${getTimeAgo(timestamp.toDate())}</span>`;

  // 3. comment-text 생성
  const content = document.createElement("div");
  content.className = "comment-text";
  content.textContent = text;

  // 4. comment-setting 생성 (수정/삭제 버튼)
  const setting = document.createElement("div");
  setting.className = "comment-setting";
  // 실제 수정/삭제 기능은 여기서 구현해야 합니다 (예: 클릭 이벤트 리스너 추가)
  setting.innerHTML = `
    <a class="edit-link">수정</a>
    <span>/</span>
    <a class="delete-link">삭제</a>
  `;

  // comment-left-section에 요소들 추가
  leftSection.appendChild(meta);
  leftSection.appendChild(content);
  leftSection.appendChild(setting);

  // 5. comment-name 생성 (comment-left-section 밖에)
  const commentNameSpan = document.createElement("span");
  commentNameSpan.className = "comment-name";
  commentNameSpan.textContent = name;

  // comment-item에 모든 섹션 추가
  item.appendChild(leftSection);
  item.appendChild(commentNameSpan);

  // 리스트의 가장 위에 추가 (최신 댓글이 위로 오도록)
  commentList.prepend(item);
}

async function loadComments() {
  const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => renderComment(doc.data()));
}

window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("comment-submit");
  const inputName = document.getElementById("id-input");
  const inputPwd = document.getElementById("pwd-input");
  const inputComment = document.getElementById("comment-input");

  submitBtn.addEventListener("click", async () => {
    const name = inputName.value.trim();
    const pwd = inputPwd.value.trim();
    const text = inputComment.value.trim();

    if (!name || !pwd || !text) {
      alert("모든 입력란을 채워주세요.");
      return;
    }

    await addDoc(collection(db, "comments"), {
      name,
      password: pwd,
      text,
      timestamp: serverTimestamp(),
    });

    inputName.value = inputPwd.value = inputComment.value = "";
    document.getElementById("comment-list").innerHTML = "";
    loadComments();
  });

  loadComments();
});
