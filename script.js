const app = document.getElementById("app");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

function showToast(msg){ toast.textContent=msg; toast.classList.add("show"); setTimeout(()=>toast.classList.remove("show"),2200); }
function initials(name){ return name.split(" ").slice(-2).map(x=>x[0]).join("").toUpperCase(); }

function layout(title, sub, body){
  return `<section class="page"><div class="section-head"><div><span class="eyebrow">10 TOÁN 1</span><h1>${title}</h1><p>${sub}</p></div></div>${body}</section>`;
}

function home(){
  const top=[...members].sort((a,b)=>b[2]-a[2]).slice(0,3);
  return `<section class="hero">
    <div class="hero-copy"><span class="eyebrow light">WELCOME TO CLASS HUB</span><h1>10 TOÁN 1<br><span>không chỉ giỏi Toán.</span></h1>
    <p>Một nơi để cả lớp cập nhật thông báo, xem bảng xếp hạng, lịch học và những sự kiện không thể bỏ lỡ.</p>
    <div class="hero-actions"><button class="primary" onclick="location.hash='members'">Khám phá lớp →</button><button class="ghost" onclick="location.hash='ranking'">Xem xếp hạng</button></div></div>
    <div class="math-art"><span>∑</span><i>π</i><b>√x</b><em>∞</em><small>10²</small></div>
  </section>
  <section class="stats"><div><b>${members.length}</b><span>Thành viên</span></div><div><b>${Math.round(members.reduce((s,m)=>s+m[2],0)/members.length)}</b><span>Điểm TB</span></div><div><b>${events.length}</b><span>Sự kiện sắp tới</span></div><div><b>∞</b><span>Năng lượng</span></div></section>
  <section class="grid-2">
    <div class="card"><div class="card-title"><h2>🏆 Top thi đua</h2><a href="#ranking">Xem tất cả →</a></div>${top.map((m,i)=>rankRow(m,i+1)).join("")}</div>
    <div class="card"><div class="card-title"><h2>📢 Mới nhất</h2><a href="#announcements">Tất cả →</a></div>${announcements.slice(0,3).map(a=>`<article class="mini-news"><span>${a.tag}</span><b>${a.title}</b><small>${a.date}</small></article>`).join("")}</div>
  </section>`;
}
function rankRow(m, i) {
  return `
    <div class="rank-row">
      <strong class="rank-no">#${i}</strong>
      <div class="avatar">${initials(m[0])}</div>
      <div class="grow">
        <b>${m[0]}</b>
        <small>${m[3] || 'Thành viên'}</small>
      </div>
      <div class="score" style="font-weight: 800;">${m[2]} điểm</div>
    </div>
  `;
}
// Biến lưu từ khóa tìm kiếm và bộ lọc hiện tại
let memberSearchKeyword = '';
let currentMemberRoleFilter = 'all';

// 1. Hàm hiển thị trang Thành viên
function membersPage() {
  return layout("Thành viên lớp", "Gặp gỡ 37 thành viên tuyệt vời của lớp 10 Toán 1", `
    <div class="members-filter-bar">
      <!-- Ô tìm kiếm gọi trực tiếp hàm searchMembers -->
      <div class="search-box">
        <input 
          type="text" 
          id="memberSearchInput" 
          placeholder="Tìm kiếm thành viên..." 
          oninput="searchMembers(this.value)"
        >
      </div>

      <!-- Bộ lọc vai trò -->
      <div class="filter-tabs">
        <button class="tab-btn active" onclick="filterMembers('all', this)">Tất cả</button>
        <button class="tab-btn" onclick="filterMembers('bcs', this)">Ban cán sự</button>
        <button class="tab-btn" onclick="filterMembers('member', this)">Thành viên</button>
      </div>
    </div>

    <!-- Khung chứa danh sách thẻ thành viên -->
    <div id="membersContainer">
      ${renderMembersList(members)}
    </div>
  `);
}

// 2. Xử lý khi gõ vào ô tìm kiếm
function handleSearchMembers(keyword) {
  memberSearchKeyword = keyword.trim().toLowerCase();
  const container = document.getElementById('membersListContainer');
  if (container) {
    container.innerHTML = renderMembersList();
  }
}

// 3. Xử lý khi bấm nút Lọc Ban cán sự / Thành viên
function filterMemberRole(role, btn) {
  currentMemberRoleFilter = role;
  document.querySelectorAll('.members-filter-bar .pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const container = document.getElementById('membersListContainer');
  if (container) {
    container.innerHTML = renderMembersList();
  }
}

// 4. Hàm lọc và xuất HTML danh sách thành viên
function renderMembersList() {
  // Lọc theo từ khóa tìm kiếm và vai trò
  const filtered = membersData.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearchKeyword);
    const isBCS = m.role && m.role !== 'Thành viên';
    
    if (currentMemberRoleFilter === 'bcs') return matchesSearch && isBCS;
    if (currentMemberRoleFilter === 'member') return matchesSearch && !isBCS;
    return matchesSearch;
  });

  if (filtered.length === 0) {
    return `<p style="text-align:center; color:#888; padding: 40px 0;">Không tìm thấy thành viên nào phù hợp.</p>`;
  }

  // Tách danh sách thành Ban cán sự và Thành viên thường
  const bcsList = filtered.filter(m => m.role && m.role !== 'Thành viên');
  const memberList = filtered.filter(m => !m.role || m.role === 'Thành viên');

  let html = '';

  // Nhóm Ban cán sự
  if (bcsList.length > 0 && currentMemberRoleFilter !== 'member') {
    html += `
      <h3 style="margin: 20px 0 12px; font-weight: 800; color: #17182d;">| Ban cán sự</h3>
      <div class="members-grid">
        ${bcsList.map(m => renderMemberCard(m)).join('')}
      </div>
    `;
  }

  // Nhóm Thành viên
  if (memberList.length > 0 && currentMemberRoleFilter !== 'bcs') {
    html += `
      <h3 style="margin: 24px 0 12px; font-weight: 800; color: #17182d;">| Thành viên</h3>
      <div class="members-grid">
        ${memberList.map(m => renderMemberCard(m)).join('')}
      </div>
    `;
  }

  return html;
}

// 5. Thẻ hiển thị từng thành viên
function renderMemberCard(m) {
  const avatarText = m.name.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();
  return `
    <div class="member-card" onclick="location.hash='#member-${m.id}'">
      <div class="member-avatar" style="background: ${m.color || '#624cff'}">${avatarText}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role">${m.role || 'Thành viên'}</div>
      <div class="member-points">${m.points || 100} điểm</div>
    </div>
  `;
}
function rankingPage() {
  const sorted = [...members].sort((a, b) => b[2] - a[2]);
  
  // Nút bấm/dòng chữ "Cách tính điểm" & Khung ẩn/hiện Quy định cộng trừ điểm
  const rulesHTML = `
    <div style="text-align: right; margin-bottom: 15px;">
      <button class="text-btn" onclick="document.getElementById('rulesBox').classList.toggle('hidden')" style="cursor: pointer; font-size: 13px; display: inline-flex; align-items: center; gap: 4px;">
        📘 Cách tính điểm
      </button>
    </div>

    <!-- Khung Quy định Cộng & Trừ điểm (Mặc định Ẩn) -->
    <div id="rulesBox" class="rules-container hidden">
      <div class="rules-card plus">
        <h3>➕ Danh Mục Cộng Điểm</h3>
        <ul>
          <li><strong>• Tham gia HSGQG:</strong> Đạt giải / Tham gia đội tuyển thi Học sinh giỏi Quốc gia.</li>
          <li><strong>• HSGKV:</strong> Đạt giải các kỳ thi Học sinh giỏi Khu vực (Duyên hải, 30/4,...).</li>
          <li><strong>• HD CLB:</strong> Ban chủ nhiệm, thành viên đóng góp tích cực cho CLB.</li>
          <li><strong>• Các cuộc thi khác:</strong> Cuộc thi KHKT, Tin học trẻ, Thể thao, Văn nghệ...</li>
        </ul>
      </div>

      <div class="rules-card minus">
        <h3>➖ Danh Mục Trừ Điểm</h3>
        <ul>
          <li><strong>• Vi phạm tác phong:</strong> Đồng phục không đúng, thiếu thẻ học sinh, tóc tai vi phạm quy định.</li>
          <li><strong>• Luật:</strong> Đi trễ, mất trật tự, dùng điện thoại trong giờ học, vi phạm quy định nhà trường.</li>
        </ul>
      </div>
    </div>
  `;

  // Bảng Xếp Hạng hiển thị chi tiết Điểm Cộng - Điểm Trừ - Tổng Điểm theo Hình 2
  const tableHTML = `
    <div class="card table-card" style="padding: 0; overflow: hidden; border-radius: 16px;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background: #0d624d; color: #fff;">
            <th style="padding: 14px 16px; font-weight: 700;">Hạng</th>
            <th style="padding: 14px 16px; font-weight: 700;">Họ và Tên <small style="font-weight: 400; opacity: 0.8;">(Nhấp vào tên để xem lý do)</small></th>
            <th style="padding: 14px 16px; font-weight: 700; text-align: center;">Điểm Cộng</th>
            <th style="padding: 14px 16px; font-weight: 700; text-align: center;">Điểm Trừ</th>
            <th style="padding: 14px 16px; font-weight: 700; text-align: right;">Tổng Điểm</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map((m, i) => `
            <tr style="border-bottom: 1px solid #f0f0f5; background: ${i % 2 === 0 ? '#ffffff' : '#fcfcfd'};">
              <td style="padding: 14px 16px; font-weight: 700; color: #555;">${i + 1}</td>
              <td style="padding: 14px 16px; font-weight: 800; color: #2563eb;">${m[0]}</td>
              <td style="padding: 14px 16px; text-align: center; color: #2ecc71; font-weight: 700;">+${m[4] || 0}</td>
              <td style="padding: 14px 16px; text-align: center; color: #e74c3c; font-weight: 700;">${m[5] || 0}</td>
              <td style="padding: 14px 16px; text-align: right; font-weight: 900; color: #17182d; font-size: 15px;">${m[2]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  return layout(
    "Bảng xếp hạng",
    "",
    rulesHTML +
    "<div class='podium'>" +
      sorted.slice(0, 3).map((m, i) => `
        <div class="podium-item p${i}">
          <div class="avatar xl">${initials(m[0])}</div>
          <b>#${i + 1}</b>
          <h3>${m[0]}</h3>
          <strong>${m[2]} điểm</strong>
        </div>
      `).join("") +
    "</div>" + 
    tableHTML
  );
}
// Dữ liệu mẫu thông báo chuẩn theo hình ảnh của bạn
// Dữ liệu gộp chung cả Thông báo và Sự kiện
// Biến lưu trạng thái Tab hiện tại ('thong-bao' hoặc 'su-kien')
let currentMainTab = 'thong-bao';
let currentCategoryFilter = 'Tất cả';

// Dữ liệu Thông báo
const listAnnouncements = [
  { id: 1, title: "Lịch kiểm tra giữa kỳ tháng 9", desc: "Kiểm tra giữa kỳ sẽ diễn ra vào ngày 15/09/2026. Các bạn cần ôn tập chương 1 và chương 2 môn Toán.", date: "28/08/2026", type: "Quan trọng", typeClass: "quan-trong" },
  { id: 2, title: "Họp lớp thứ 6 tuần này lúc 17h", desc: "Họp lớp tại phòng 201, thảo luận về kế hoạch dã ngoại tháng 10.", date: "28/08/2026", type: "Họp lớp", typeClass: "hop-lop" },
  { id: 3, title: "Nộp bài tập toán chương 1 trước 30/8", desc: "Các bạn nhớ nộp bài tập chương 1 trước ngày 30/08/2026 cho thầy Hùng.", date: "28/08/2026", type: "Bài tập", typeClass: "bai-tap" },
  { id: 4, title: "Chào mừng năm học mới 2026-2027!", desc: "Chúc mừng các bạn lớp 10 Toán 1 bước vào năm học mới. Hãy cùng nhau cố gắng!", date: "28/08/2026", type: "Thông báo", typeClass: "thong-bao" }
];

// Dữ liệu Sự kiện riêng biệt
const listEvents = [
  { id: 101, title: "Giải Bóng Đá Khối 10", desc: "Trận chung kết giữa 10 Toán 1 và 10 Lý 1 tại sân bóng trường.", date: "15/09/2026", time: "15:30", location: "Sân bóng đá trường" },
  { id: 102, title: "Cắm Trại 26/3", desc: "Hoạt động cắm trại chào mừng ngày thành lập Đoàn.", date: "26/03/2027", time: "07:30", location: "Khuôn viên trường" }
];

function announcementsPage() {
  return layout("", "", `
    <!-- Thanh Điều Hướng chuẩn theo Ảnh mẫu -->
    <div class="page-toolbar">
      <div class="left-toolbar-group">
        <!-- 2 Nút viên thuốc Chuyển Tab -->
        <div class="main-toggle-group">
          <button id="btnTabAnn" class="main-toggle-btn ${currentMainTab === 'thong-bao' ? 'active' : ''}" onclick="switchMainTab('thong-bao')">
            🔔 Thông báo
          </button>
          <button id="btnTabEvt" class="main-toggle-btn ${currentMainTab === 'su-kien' ? 'active' : ''}" onclick="switchMainTab('su-kien')">
            🗓️ Sự kiện
          </button>
        </div>

        <!-- Các nút Filter danh mục -->
        <div id="filterPillsGroup" class="filter-pills ${currentMainTab === 'su-kien' ? 'hidden' : ''}">
          <button class="pill-btn ${currentCategoryFilter === 'Tất cả' ? 'active' : ''}" onclick="filterCategory('Tất cả', this)">Tất cả</button>
          <button class="pill-btn ${currentCategoryFilter === 'Quan trọng' ? 'active' : ''}" onclick="filterCategory('Quan trọng', this)">Quan trọng</button>
          <button class="pill-btn ${currentCategoryFilter === 'Họp lớp' ? 'active' : ''}" onclick="filterCategory('Họp lớp', this)">Họp lớp</button>
          <button class="pill-btn ${currentCategoryFilter === 'Bài tập' ? 'active' : ''}" onclick="filterCategory('Bài tập', this)">Bài tập</button>
          <button class="pill-btn ${currentCategoryFilter === 'Thông báo' ? 'active' : ''}" onclick="filterCategory('Thông báo', this)">Thông báo</button>
        </div>
      </div>

      <!-- Nút tạo mới tự thay đổi tương ứng -->
      <div id="createBtnArea">
        ${renderCreateButton()}
      </div>
    </div>

    <!-- Khu vực chứa Danh sách Thẻ -->
    <div id="contentListArea" class="announcement-list">
      ${renderMainContent()}
    </div>

    <!-- Modal Form Tạo Thông Báo -->
    <div id="modalAnn" class="modal-overlay hidden">
      <div class="modal-content">
        <h3>📢 Tạo Thông Báo Mới</h3>
        <form onsubmit="submitNewAnn(event)">
          <div class="form-group">
            <label>Tiêu đề:</label>
            <input type="text" id="annTitle" required placeholder="Nhập tiêu đề thông báo...">
          </div>
          <div class="form-group">
            <label>Phân loại:</label>
            <select id="annType">
              <option value="Thông báo">Thông báo</option>
              <option value="Quan trọng">Quan trọng</option>
              <option value="Họp lớp">Họp lớp</option>
              <option value="Bài tập">Bài tập</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nội dung chi tiết:</label>
            <textarea id="annDesc" rows="4" required placeholder="Nhập nội dung..."></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" onclick="closeModal('modalAnn')">Hủy</button>
            <button type="submit" class="btn-submit">Đăng thông báo</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Form Tạo Sự Kiện -->
    <div id="modalEvt" class="modal-overlay hidden">
      <div class="modal-content">
        <h3>📅 Tạo Sự Kiện Mới</h3>
        <form onsubmit="submitNewEvt(event)">
          <div class="form-group">
            <label>Tên sự kiện:</label>
            <input type="text" id="evtTitle" required placeholder="Nhập tên sự kiện...">
          </div>
          <div class="form-group">
            <label>Ngày diễn ra (ngày/tháng/năm):</label>
            <input type="text" id="evtDate" required placeholder="VD: 15/09/2026">
          </div>
          <div class="form-group">
            <label>Thời gian & Địa điểm:</label>
            <div style="display:flex; gap:10px;">
              <input type="text" id="evtTime" placeholder="VD: 15:30" style="flex:1;">
              <input type="text" id="evtLoc" placeholder="VD: Sân bóng" style="flex:1;">
            </div>
          </div>
          <div class="form-group">
            <label>Mô tả sự kiện:</label>
            <textarea id="evtDesc" rows="3" required placeholder="Nhập chi tiết sự kiện..."></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" onclick="closeModal('modalEvt')">Hủy</button>
            <button type="submit" class="btn-submit" style="background:#3b82f6;">Tạo sự kiện</button>
          </div>
        </form>
      </div>
    </div>
  `);
}

// Chuyển đổi giữa 2 Tab lớn khi click vào hình tròn/viên thuốc
function switchMainTab(tabName) {
  currentMainTab = tabName;
  
  // Cập nhật giao diện 2 nút Tab
  document.getElementById('btnTabAnn').classList.toggle('active', tabName === 'thong-bao');
  document.getElementById('btnTabEvt').classList.toggle('active', tabName === 'su-kien');
  
  // Ẩn/hiện bộ lọc danh mục
  document.getElementById('filterPillsGroup').classList.toggle('hidden', tabName === 'su-kien');

  // Đổi nút Tạo Mới
  document.getElementById('createBtnArea').innerHTML = renderCreateButton();

  // Load lại danh sách
  document.getElementById('contentListArea').innerHTML = renderMainContent();
}

// Tạo HTML cho nút Đăng bài
function renderCreateButton() {
  if (currentMainTab === 'thong-bao') {
    return `<button class="btn-create-ann" onclick="openModal('modalAnn')">➕ Tạo thông báo mới</button>`;
  } else {
    return `<button class="btn-create-event" onclick="openModal('modalEvt')">📅 Tạo sự kiện mới</button>`;
  }
}

// Lọc theo loại Thông báo
function filterCategory(cat, btn) {
  currentCategoryFilter = cat;
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('contentListArea').innerHTML = renderMainContent();
}

// Render nội dung tùy thuộc Tab đang đứng
function renderMainContent() {
  if (currentMainTab === 'thong-bao') {
    const filtered = currentCategoryFilter === 'Tất cả' 
      ? listAnnouncements 
      : listAnnouncements.filter(item => item.type === currentCategoryFilter);

    if (filtered.length === 0) return `<p style="text-align:center; color:#888; padding: 40px 0;">Không có thông báo nào.</p>`;

    return filtered.map(item => `
      <div class="announcement-card">
        <span class="ann-badge ${item.typeClass}">${item.type}</span>
        <div class="announcement-title">${item.title}</div>
        <div class="announcement-desc">${item.desc}</div>
        <div class="announcement-date">🕒 ${item.date}</div>
      </div>
    `).join('');
  } else {
    // Hiển thị danh sách Sự kiện
    if (listEvents.length === 0) return `<p style="text-align:center; color:#888; padding: 40px 0;">Chưa có sự kiện nào sắp tới.</p>`;

    return listEvents.map(item => {
      const parts = item.date.split('/');
      const day = parts[0] || '15';
      const month = parts[1] ? `Thg ${parts[1]}` : 'THG 9';

      return `
        <div class="event-card">
          <div class="event-date-box">
            <div class="day">${day}</div>
            <div class="month">${month}</div>
          </div>
          <div style="flex:1;">
            <h4 style="font-size:16px; font-weight:800; color:#17182d; margin-bottom:6px;">${item.title}</h4>
            <p style="font-size:13px; color:#6b7280; margin-bottom:8px;">${item.desc}</p>
            <div style="font-size:12px; font-weight:600; color:#624cff; display:flex; gap:15px;">
              <span>⏰ ${item.time || 'Cả ngày'}</span>
              <span>📍 ${item.location || 'Trường học'}</span>
            </div>
          </div>
          <span class="ann-badge su-kien">Sự kiện</span>
        </div>
      `;
    }).join('');
  }
}

// Xử lý Form
function submitNewAnn(e) {
  e.preventDefault();
  const title = document.getElementById('annTitle').value;
  const type = document.getElementById('annType').value;
  const desc = document.getElementById('annDesc').value;
  const mapClass = { 'Quan trọng': 'quan-trong', 'Họp lớp': 'hop-lop', 'Bài tập': 'bai-tap', 'Thông báo': 'thong-bao' };

  listAnnouncements.unshift({
    id: Date.now(), title, desc, date: "28/08/2026", type, typeClass: mapClass[type] || 'thong-bao'
  });

  closeModal('modalAnn');
  document.getElementById('contentListArea').innerHTML = renderMainContent();
  e.target.reset();
}

function submitNewEvt(e) {
  e.preventDefault();
  const title = document.getElementById('evtTitle').value;
  const date = document.getElementById('evtDate').value;
  const time = document.getElementById('evtTime').value;
  const location = document.getElementById('evtLoc').value;
  const desc = document.getElementById('evtDesc').value;

  listEvents.unshift({ id: Date.now(), title, date, time, location, desc });

  closeModal('modalEvt');
  document.getElementById('contentListArea').innerHTML = renderMainContent();
  e.target.reset();
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
// Render danh sách (Tự động chuyển định dạng giữa Thẻ Thông báo và Thẻ Sự kiện)
function renderAnnouncements(list) {
  const filtered = currentAnnFilter === 'Tất cả' 
    ? list 
    : list.filter(item => item.type === currentAnnFilter);

  if (filtered.length === 0) {
    return `<p style="text-align:center; color:#888; padding: 40px 0;">Không có nội dung nào thuộc mục này.</p>`;
  }

  return filtered.map(item => {
    // Nếu loại là "Sự kiện", hiển thị theo dạng Thẻ Sự kiện có lịch
    if (item.type === 'Sự kiện') {
      const parts = item.date.split('/');
      const day = parts[0] || '15';
      const month = parts[1] ? `Thg ${parts[1]}` : 'THG 9';

      return `
        <div class="event-card">
          <div class="event-date-box">
            <div class="day">${day}</div>
            <div class="month">${month}</div>
          </div>
          <div class="event-info">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <div class="event-meta">
              <span>⏰ ${item.time || '15:30'}</span>
              <span>📍 ${item.location || 'Trường THPT'}</span>
            </div>
          </div>
          <span class="ann-badge su-kien">Sự kiện</span>
        </div>
      `;
    }

    // Mặc định hiển thị dạng Thẻ Thông báo
    return `
      <div class="announcement-card">
        <span class="ann-badge ${item.typeClass}">${item.type}</span>
        <div class="announcement-title">${item.title}</div>
        <div class="announcement-desc">${item.desc}</div>
        <div class="announcement-date">🕒 ${item.date}</div>
      </div>
    `;
  }).join('');
}

function filterAnnouncements(category, btn) {
  currentAnnFilter = category;
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('announcementList').innerHTML = renderAnnouncements(announcementsData);
}

function addNewAnnouncement(e) {
  e.preventDefault();
  const title = document.getElementById('annTitle').value;
  const type = document.getElementById('annType').value;
  const desc = document.getElementById('annDesc').value;

  const typeClassMap = {
    'Quan trọng': 'quan-trong',
    'Họp lớp': 'hop-lop',
    'Bài tập': 'bai-tap',
    'Thông báo': 'thong-bao',
    'Sự kiện': 'su-kien'
  };

  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  announcementsData.unshift({
    id: Date.now(),
    title,
    desc,
    date: dateStr,
    type,
    typeClass: typeClassMap[type] || 'thong-bao'
  });

  document.getElementById('announcementList').innerHTML = renderAnnouncements(announcementsData);
  closeAnnouncementModal();
  e.target.reset();
}

function openAnnouncementModal() {
  document.getElementById('annModal').classList.remove('hidden');
}

function closeAnnouncementModal() {
  document.getElementById('annModal').classList.add('hidden');
}

// Xử lý Thêm Thông Báo Mới
function addNewAnnouncement(e) {
  e.preventDefault();
  
  const title = document.getElementById('annTitle').value;
  const type = document.getElementById('annType').value;
  const desc = document.getElementById('annDesc').value;

  // Tự động chuyển đổi class màu sắc theo danh mục
  const typeClassMap = {
    'Quan trọng': 'quan-trong',
    'Họp lớp': 'hop-lop',
    'Bài tập': 'bai-tap',
    'Thông báo': 'thong-bao'
  };

  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  const newAnn = {
    id: Date.now(),
    title: title,
    desc: desc,
    date: dateStr,
    type: type,
    typeClass: typeClassMap[type] || 'thong-bao'
  };

  // Thêm vào đầu danh sách
  announcementsData.unshift(newAnn);

  // Render lại danh sách & đóng Modal
  document.getElementById('announcementList').innerHTML = renderAnnouncements(announcementsData);
  closeAnnouncementModal();
  e.target.reset();
}

function openAnnouncementModal() {
  document.getElementById('annModal').classList.remove('hidden');
}

function closeAnnouncementModal() {
  document.getElementById('annModal').classList.add('hidden');
}

// Hàm render thẻ thông báo
function renderAnnouncements(list) {
  const filtered = currentAnnFilter === 'Tất cả' 
    ? list 
    : list.filter(item => item.type === currentAnnFilter);

  if (filtered.length === 0) {
    return `<p style="text-align:center; color:#888; padding: 40px 0;">Không có thông báo nào thuộc mục này.</p>`;
  }

  return filtered.map(item => `
    <div class="announcement-card">
      <span class="ann-badge ${item.typeClass}">${item.type}</span>
      <div class="announcement-title">${item.title}</div>
      <div class="announcement-desc">${item.desc}</div>
      <div class="announcement-date">🕒 ${item.date}</div>
    </div>
  `).join('');
}

// Xử lý khi nhấn vào các nút lọc danh mục
function filterAnnouncements(category, btn) {
  currentAnnFilter = category;
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('announcementList').innerHTML = renderAnnouncements(announcementsData);
}
function eventsPage(){
 return layout("Sự kiện","Đừng để lịch lớp chạy nhanh hơn bạn 😎","<div class='event-grid'>"+events.map(e=>`<article class='event card'><div class='date-box'><b>${new Date(e.date+'T00:00:00').getDate()}</b><small>${new Date(e.date+'T00:00:00').toLocaleDateString('vi-VN',{month:'short'}).toUpperCase()}</small></div><div><span class='tag'>SẮP TỚI</span><h2>${e.title}</h2><p>🕐 ${e.time} · 📍 ${e.place}</p></div></article>`).join("")+"</div>");
}
function schedulePage(){
 return layout("Thời khóa biểu","Lịch học mẫu của lớp 10 Toán 1.","<div class='card schedule-wrap'><table><thead><tr><th>Ngày</th><th>Tiết 1</th><th>Tiết 2</th><th>Tiết 3</th><th>Tiết 4</th><th>Tiết 5</th></tr></thead><tbody>"+schedule.map(r=>`<tr>${r.map((x,i)=>`<td class="${i===0?'day':''}">${x}</td>`).join("")}</tr>`).join("")+"</tbody></table></div>");
}
function aboutPage(){
 return layout("Về lớp","10 Toán 1 — học tập nghiêm túc, tinh thần thì không nghiêm lắm.","<div class='about-grid'><div class='card'><h2>🎯 Mục tiêu</h2><p>Xây dựng một tập thể đoàn kết, chủ động học tập và luôn hỗ trợ nhau tiến bộ.</p><p>Điểm số quan trọng, nhưng thái độ và tinh thần đồng đội cũng quan trọng không kém.</p></div><div class='card'><h2>📜 Nội quy vui vẻ</h2><ul><li>Tôn trọng giáo viên và bạn bè.</li><li>Không spam nhóm lớp.</li><li>Đi học đúng giờ.</li><li>Giúp bạn khi bạn cần.</li><li>Thi đua văn minh, không “combat” bảng xếp hạng.</li></ul></div></div>");
}

function render(){
 const page=location.hash.replace("#","")||"home";
 const pages={home,members:membersPage,ranking:rankingPage,announcements:announcementsPage,events:eventsPage,schedule:schedulePage,about:aboutPage};
 app.innerHTML=pages[page]?pages[page]():home();
 document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
 if(page==="members"){
   const input=document.getElementById("memberSearch");
   input.oninput=()=>document.getElementById("memberGrid").innerHTML=members.filter(m=>m[0].toLowerCase().includes(input.value.toLowerCase())).map(memberCard).join("");
 }
 window.scrollTo({top:0,behavior:"smooth"}); nav.classList.remove("open");
}
window.addEventListener("hashchange",render); render();

document.getElementById("menuBtn").onclick=()=>nav.classList.toggle("open");

const modal=document.getElementById("authModal"), title=document.getElementById("authTitle"), desc=document.getElementById("authDesc");
const nameWrap=document.getElementById("registerNameWrap"), submit=document.getElementById("submitAuth"), switchBtn=document.getElementById("switchAuth");
let register=false;
function auth(){register=!register; title.textContent=register?"Đăng ký":"Đăng nhập"; desc.textContent=register?"Tạo tài khoản demo cho website lớp.":"Chào mừng bạn quay lại lớp!"; nameWrap.classList.toggle("hidden",!register); submit.textContent=register?"Tạo tài khoản":"Đăng nhập"; switchBtn.textContent=register?"Đã có tài khoản? Đăng nhập":"Chưa có tài khoản? Đăng ký"; }
document.getElementById("loginBtn").onclick=()=>{modal.classList.add("show");};
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
switchBtn.onclick=auth;
submit.onclick=()=>{
 const user=document.getElementById("authUser").value.trim();
 const pass=document.getElementById("authPass").value;
 if(!user||!pass||(register&&!document.getElementById("registerName").value.trim())) return showToast("Vui lòng nhập đủ thông tin!");
 if(register){localStorage.setItem("demoUser",JSON.stringify({user,pass,name:document.getElementById("registerName").value.trim()}));showToast("Đăng ký thành công 🎉");}
 else {const saved=JSON.parse(localStorage.getItem("demoUser")||"null"); if(!saved||saved.user!==user||saved.pass!==pass)return showToast("Sai tài khoản hoặc mật khẩu!"); showToast("Đăng nhập thành công 👋");}
 modal.classList.remove("show");
};
