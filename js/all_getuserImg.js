 export const  getImgUrl = (name) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/2023%2FUsers%2F";
  return `${base}${encodeURIComponent(name)}.jpg?alt=media`;
};

export const getUserAssetUrl = (name, type, filename) => {
  const base = "https://firebasestorage.googleapis.com/v0/b/jvisiondesign-web.firebasestorage.app/o/";
  const fullPath = type
    ? `2023/UsersWorkData/${name}/${type}/${filename}`
    : `2023/UsersWorkData/${name}/${filename}`;  // flat path if type is empty
  return `${base}${encodeURIComponent(fullPath)}?alt=media`;
};