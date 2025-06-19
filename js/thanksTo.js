import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBWer4zVpTNwXuzrcC1LiXxAHTTK7kcc6I",
  authDomain: "jvisiondesign-web.firebaseapp.com",
  databaseURL: "https://jvisiondesign-web-default-rtdb.firebaseio.com", // RTDB URL!
  projectId: "jvisiondesign-web",
  storageBucket: "jvisiondesign-web.appspot.com",
  messagingSenderId: "191520684316",
  appId: "1:191520684316:web:08c611b8cad3fdbb0f22d9",
  measurementId: "G-EZ6RCL4MRR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔁 URL에서 year 받아오기
const params = new URLSearchParams(window.location.search);
const year = params.get("year");

if (!year) {
  alert("년도 정보가 없습니다.");
  window.location.href = "/index.html";
}

// 📥 댓글 불러오기
function loadComments() {
  const listRef = ref(db, `thanksComments/${year}`);
  onValue(listRef, snapshot => {
    const data = snapshot.val();
    const list = document.getElementById("comment-list");
    list.innerHTML = "";

    if (data) {
      Object.entries(data).forEach(([id, val]) => {
        const item = document.createElement("div");
        item.className = "comment-item";
        item.innerHTML = `
          <div class="comment-meta">
        <span class="comment-time">${timeAgo(val.timestamp)}</span>
        </div>
        <div class="comment-text">${val.content}</div>
        <div class="comment-setting">
        <a class="edit-link">수정</a> <span>/</span> <a class="delete-link">삭제</a> 
        </div>  
        <span class="comment-name">${val.name}</span>
            `;
        list.prepend(item);
      });
    }
  });
}

// ✍️ 댓글 등록
document.getElementById("comment-submit").onclick = async () => {
  const name = document.getElementById("id-input").value.trim();
  const pwd = document.getElementById("pwd-input").value.trim(); // optional
  const text = document.getElementById("comment-input").value.trim();

  if (!name || !pwd || !text) {
    alert("모든 입력란을 채워주세요.");
    return;
  }

  const newRef = push(ref(db, `thanksComments/${year}`));
  await set(newRef, {
    name,
    password: pwd,
    content: text,
    timestamp: Date.now()
  });

  // 입력창 초기화
  document.getElementById("id-input").value =
  document.getElementById("pwd-input").value =
  document.getElementById("comment-input").value = "";
};

// ⏳ 시간 텍스트 변환
function timeAgo(ms) {
  const diff = Math.floor((Date.now() - ms) / 60000); // 분 단위
  if (diff < 1) return "방금 전";
  if (diff < 60) return `${diff}분 전`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

// 🚀 시작
window.addEventListener("DOMContentLoaded", loadComments);
