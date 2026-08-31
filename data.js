// data.js
// Dữ liệu lớp: members, announcements, events, schedule
// ES module (export). Nếu dùng CommonJS, đổi thành module.exports.

export const members = [
  { id: "10T1-01", name: "Lê Ngọc Xuân Ngà", score: 100, role: "Lớp phó học tập" },
  { id: "10T1-02", name: "Nguyễn Duy Khoa", score: 100, role: "Thành viên" },
  { id: "10T1-03", name: "Nguyễn Minh Duy", score: 100, role: "Thành viên" },
  { id: "10T1-04", name: "Hồ Ngọc Hải", score: 100, role: "Thành viên" },
  { id: "10T1-05", name: "Chương Thiết Minh", score: 100, role: "Thành viên" },
  { id: "10T1-06", name: "Trần Hoàng Bảo Duy", score: 100, role: "Thành viên" },
  { id: "10T1-07", name: "Phạm Lê Duy Hưng", score: 100, role: "Thành viên" },
  { id: "10T1-08", name: "Nguyễn Văn Đức Huy", score: 100, role: "Thành viên" },
  { id: "10T1-09", name: "Nguyễn Hữu Phúc", score: 100, role: "Thành viên" },
  { id: "10T1-10", name: "Trần Minh Huy", score: 100, role: "Thành viên" },
  { id: "10T1-11", name: "Nguyễn Quốc Bảo Nam", score: 100, role: "Thành viên" },
  { id: "10T1-12", name: "Nguyễn Nam Anh", score: 100, role: "Thành viên" },
  { id: "10T1-13", name: "Phạm Lê Hải Bằng", score: 100, role: "Thành viên" },
  { id: "10T1-14", name: "Vũ Lê Anh Đức", score: 100, role: "Thành viên" },
  { id: "10T1-15", name: "Trần Bảo Huy", score: 100, role: "Thành viên" },
  { id: "10T1-16", name: "Phan Huy Khánh", score: 100, role: "Thành viên" },
  { id: "10T1-17", name: "Vũ Tuấn Minh", score: 100, role: "Lớp phó lao động" },
  { id: "10T1-18", name: "Nguyễn Lê Minh Nhật", score: 100, role: "Thành viên" },
  { id: "10T1-19", name: "Phạm Gia Phúc", score: 100, role: "Thành viên" },
  { id: "10T1-20", name: "Đoàn Minh Quân", score: 100, role: "Thành viên" },
  { id: "10T1-21", name: "Lê Trần Khánh Hưng", score: 100, role: "Thành viên" },
  { id: "10T1-22", name: "Phạm Nhật Huy", score: 100, role: "Thành viên" },
  { id: "10T1-23", name: "Bùi Minh Phú", score: 100, role: "Thành viên" },
  { id: "10T1-24", name: "Nguyễn Phú Bình", score: 100, role: "Lớp trưởng" },
  { id: "10T1-25", name: "Nguyễn Tấn Minh", score: 100, role: "Thành viên" },
  { id: "10T1-26", name: "Võ Gia Bảo", score: 100, role: "Thành viên" },
  { id: "10T1-27", name: "Phan Thị Minh Hằng", score: 100, role: "Thành viên" },
  { id: "10T1-28", name: "Phạm Bá Nhật Khánh", score: 100, role: "Thành viên" },
  { id: "10T1-29", name: "Nguyễn Hoàng Lân", score: 100, role: "Thành viên" },
  { id: "10T1-30", name: "Nguyễn Huy Minh Quân", score: 100, role: "Thành viên" },
  { id: "10T1-31", name: "Trần Thục Linh", score: 100, role: "Thành viên" },
  { id: "10T1-32", name: "Đỗ Đăng Khoa", score: 100, role: "Thành viên" },
  { id: "10T1-33", name: "Nguyễn Minh Tuấn", score: 100, role: "Thành viên" },
  { id: "10T1-34", name: "Nguyễn Mạnh Tùng", score: 100, role: "Thành viên" },
  { id: "10T1-35", name: "Bạch Ngọc Bảo Duy", score: 100, role: "Thành viên" },
  { id: "10T1-36", name: "Bùi Quang Dũng", score: 100, role: "Thành viên" },
  { id: "10T1-37", name: "Nguyễn Trà Giang", score: 100, role: "Thành viên" }
];

export const announcements = []; // Ví dụ: { id, title, content, date }
export const events = [];        // Ví dụ: { id, title, date, description }

export const schedule = [
  { day: "Thứ 2", periods: ["Toán", "Ngữ văn", "Anh", "Vật lý", "—"] },
  { day: "Thứ 3", periods: ["Hóa", "Toán", "Tin học", "Ngữ văn", "—"] },
  { day: "Thứ 4", periods: ["Anh", "Toán", "Vật lý", "Hóa", "Thể dục"] },
  { day: "Thứ 5", periods: ["Ngữ văn", "Toán", "Tin học", "Anh", "—"] },
  { day: "Thứ 6", periods: ["Toán", "Vật lý", "Ngữ văn", "Sinh", "Sinh hoạt"] },
  { day: "Thứ 7", periods: ["—", "—", "Hoạt động lớp", "—", "—"] }
];

// Helper đơn giản
export function findMemberById(id) {
  return members.find(m => m.id === id) ?? null;
}

export function findMembersByName(query) {
  const q = String(query).normalize("NFC").toLowerCase();
  return members.filter(m => m.name.normalize("NFC").toLowerCase().includes(q));
}

// Nếu bạn muốn coi dữ liệu này là mặc định không thay đổi ở runtime:
// Object.freeze(members); // bỏ comment nếu cần
