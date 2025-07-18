const params = new URLSearchParams(window.location.search)
const year = params.get("year");

export const  getImgUrl = (name) => {
  const base = `https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/${year}%2FUsers%2F`;
  return `${base}${encodeURIComponent(name)}.jpg?alt=media`;
};

export const getUserAssetUrl = (name, type, filename) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";

  const allFolders = [
    "VideoSorce", "VideoSorce01", "VideoSorce02"
  ];
  let candidateFolders = []; // 최종적으로 URL을 생성할 폴더 목록
  
  candidateFolders = allFolders.filter(folder => folder.toLowerCase().startsWith("videosorce"))
  // 필터링된 폴더들로 URL 생성
  const urls = candidateFolders.map(folder => {
    const fullPath = `${year}/UsersWorkData/${name}/${folder}/${filename}`;
    return `${base}${encodeURIComponent(fullPath)}?alt=media`;
  });

  return urls; // 가능한 URL 목록 반환
};

export const getUserAssetPostUrl = (name, relativePath) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";
  const fullPath = `${year}/UsersWorkData/${name}/${relativePath}`;
  return `${base}${encodeURIComponent(fullPath)}?alt=media`;
};

