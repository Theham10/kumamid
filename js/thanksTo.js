import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase 설정 및 초기화 (=Firestore Database)
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

// 🔧 전역 상태 관리
let modalAction = null;
let currentCommentId = null;

// 📅 시간 계산
function getTimeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000 / 60);
  if (diff < 60) return `${diff}분 전`;
  if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
  return `${Math.floor(diff / 1440)}일 전`;
}

// 🔁 댓글 불러오기
async function loadComments() {
  const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  document.getElementById("comment-list").innerHTML = "";
  snapshot.forEach(doc => renderComment(doc.id, doc.data()));
}

// 💬 댓글 렌더링
function renderComment(docId, { name, text, timestamp }) {
  const commentList = document.getElementById("comment-list");
  const item = document.createElement("div");
  item.className = "comment-item";
  item.setAttribute("data-id", docId);

  item.innerHTML = `
    <div class="comment-left-section">
      <div class="comment-meta">
        <span class="comment-time">${getTimeAgo(timestamp.toDate())}</span>
      </div>
      <div class="comment-text">${text}</div>
      <div class="comment-setting">
        <a class="edit-link">수정</a> <span>/</span>
        <a class="delete-link">삭제</a>
      </div>
    </div>
    <span class="comment-name">${name}</span>
  `;

  commentList.prepend(item);

  item.querySelector(".edit-link").onclick = () => {
    modalAction = "edit";
    currentCommentId = docId;
    modal.classList.remove("hidden");
  };

  item.querySelector(".delete-link").onclick = () => {
    modalAction = "delete";
    currentCommentId = docId;
    modal.classList.remove("hidden");
  };
}

// ✍️ 댓글 등록
document.getElementById("comment-submit").onclick = async () => {
  const name = document.getElementById("id-input").value.trim();
  const pwd = document.getElementById("pwd-input").value.trim();
  const text = document.getElementById("comment-input").value.trim();

  if (!name || !pwd || !text) {
    alert("모든 입력란을 채워주세요.");
    return;
  }

  await addDoc(collection(db, "comments"), {
    name,
    password: pwd,
    text,
    timestamp: serverTimestamp()
  });

  document.getElementById("id-input").value =
    document.getElementById("pwd-input").value =
    document.getElementById("comment-input").value =
    "";

  await loadComments();
};

// 🔐 비밀번호 모달
const modal = document.getElementById("password-modal");
const modalInput = document.getElementById("modal-password-input");
const modalError = document.getElementById("modal-error-msg");

document.getElementById("modal-close-btn").onclick =
document.getElementById("modal-cancel-btn").onclick = () => {
  modal.classList.add("hidden");
  modalInput.value = "";
  modalError.textContent = "";
};

document.getElementById("modal-confirm-btn").onclick = async () => {
  const inputPassword = modalInput.value.trim();
  if (!inputPassword || !currentCommentId) return;

  const docRef = doc(db, "comments", currentCommentId);
  const docSnap = await getDoc(docRef);
  const comment = docSnap.data();

  if (!comment || comment.password !== inputPassword) {
    modalError.textContent = "비밀번호가 맞지 않습니다";
    return;
  }

  if (modalAction === "edit") {
    showEditModal(docRef, comment.text);
  } else if (modalAction === "delete") {
    await deleteDoc(docRef);
    await loadComments();
  }

  modal.classList.add("hidden");
  modalInput.value = "";
  modalError.textContent = "";
};

// 🛠 수정 모달 로직
const editModal = document.getElementById("edit-modal");
const editTextarea = document.getElementById("edit-textarea");

document.getElementById("edit-close-btn").onclick =
document.getElementById("edit-cancel-btn").onclick = () => {
  editModal.classList.add("hidden");
};

function showEditModal(docRef, originalText) {
  editTextarea.value = originalText;
  editModal.classList.remove("hidden");

  document.getElementById("edit-confirm-btn").onclick = async () => {
    const newText = editTextarea.value.trim();
    if (!newText) return;
    await updateDoc(docRef, { text: newText });
    editModal.classList.add("hidden");
    await loadComments();
  };
}

// 🚀 초기 로딩
window.addEventListener("DOMContentLoaded", loadComments);
