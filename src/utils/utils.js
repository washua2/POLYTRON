// 格式化时间为 10/02/2025 14:10:28 这种格式
export function formatCctvTime(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // JS 的月从 0 开始
  const day = pad(date.getDate());

  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  // 返回格式：MM/DD/YYYY HH:mm:ss
  return `${month}/${day}/${year} ${hour}:${minute}:${second}`;
}
