// Đường dẫn Backend Server trên Render
const API_URL = "https://my-class-backend.onrender.com";
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
function rankRow(m,i){return `<div class="rank-row"><strong class="rank-no">${i}</strong><div class="avatar">${initials(m[0])}</div><div class="grow"><b>${m[0]}</b><small>${m[3]}</small></div><strong class="score">${m[2]}đ</strong></div>`}

// Variable toàn cục lưu từ khóa tìm kiếm và bộ lọc hiện tại
let memberSearchKeyword = '';
let currentMemberRoleFilter = 'all';

// 1. Hàm khởi tạo giao diện trang Thành viên
function membersPage() {
  return layout("Thành viên lớp", "Gặp gỡ 37 thành viên tuyệt vời của lớp 10 Toán 1", `
    <div class="members-filter-bar">
      <!-- Ô tìm kiếm -->
      <div class="search-box">
        <input 
          type="text" 
          id="memberSearchInput" 
          placeholder="Tìm kiếm thành viên..." 
          value="${memberSearchKeyword}"
          oninput="handleSearchMembers(this.value)"
        >
      </div>

      <!-- Nút lọc vai trò -->
      <div class="filter-pills">
        <button class="pill-btn ${currentMemberRoleFilter === 'all' ? 'active' : ''}" onclick="filterMemberRole('all', this)">Tất cả</button>
        <button class="pill-btn ${currentMemberRoleFilter === 'bcs' ? 'active' : ''}" onclick="filterMemberRole('bcs', this)">Ban cán sự</button>
        <button class="pill-btn ${currentMemberRoleFilter === 'member' ? 'active' : ''}" onclick="filterMemberRole('member', this)">Thành viên</button>
      </div>
    </div>

    <!-- Khung chứa danh sách thẻ thành viên -->
    <div id="membersListContainer">
      ${renderMembersList()}
    </div>
  `);
}

// 2. Xử lý sự kiện gõ ô tìm kiếm
function handleSearchMembers(keyword) {
  memberSearchKeyword = keyword.trim().toLowerCase();
  const container = document.getElementById('membersListContainer');
  if (container) {
    container.innerHTML = renderMembersList();
  }
}

// 3. Xử lý bấm các nút lọc
function filterMemberRole(role, btn) {
  currentMemberRoleFilter = role;
  document.querySelectorAll('.members-filter-bar .pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const container = document.getElementById('membersListContainer');
  if (container) {
    container.innerHTML = renderMembersList();
  }
}

// 4. Lọc dữ liệu từ mảng members gốc và trả về HTML
function renderMembersList() {
  const filtered = members.filter(m => {
    const matchesSearch = m[0].toLowerCase().includes(memberSearchKeyword);
    const isBCS = m[3] && m[3] !== 'Thành viên';
    
    if (currentMemberRoleFilter === 'bcs') return matchesSearch && isBCS;
    if (currentMemberRoleFilter === 'member') return matchesSearch && !isBCS;
    return matchesSearch;
  });

  if (filtered.length === 0) {
    return `<p style="text-align:center; color:#888; padding: 40px 0; width:100%;">Không tìm thấy thành viên nào phù hợp.</p>`;
  }

  const bcsList = filtered.filter(m => m[3] && m[3] !== 'Thành viên');
  const memberList = filtered.filter(m => !m[3] || m[3] === 'Thành viên');

  let html = '';

  if (bcsList.length > 0 && currentMemberRoleFilter !== 'member') {
    html += `
      <div class="group-title-label">Ban cán sự</div>
      <div class="members-grid-6">
        ${bcsList.map(m => renderMemberCard(m)).join('')}
      </div>
    `;
  }

  if (memberList.length > 0 && currentMemberRoleFilter !== 'bcs') {
    html += `
      <div class="group-title-label">Thành viên</div>
      <div class="members-grid-6">
        ${memberList.map(m => renderMemberCard(m)).join('')}
      </div>
    `;
  }

  return html;
}

// 5. Render từng thẻ thành viên dạng căn giữa
function renderMemberCard(m) {
  const index = members.indexOf(m);
  const bgColors = ['#624cff', '#10b981', '#ef4444', '#f59e0b', '#3b82f6'];
  const bgColor = bgColors[index % bgColors.length];

  return `
    <div class="member-card-centered" onclick="location.hash='member-${index}'">
      <div class="avatar-box" style="background-color: ${bgColor};">
        ${initials(m[0])}
      </div>
      <div class="member-name">${m[0]}</div>
      <div class="role-tag">${m[3] || 'Thành viên'}</div>
      <div class="points-text">${m[2]} điểm</div>
    </div>
  `;
}

// Biến toàn cục quản lý trạng thái hiển thị khung cách tính điểm
let showPointRules = false;

function rankingPage() {
  const sorted = [...members].sort((a, b) => b[2] - a[2]);
  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  return layout("Bảng xếp hạng", "Theo dõi điểm thi đua và thứ hạng các thành viên", `
    <!-- Thanh điều hướng trên cùng của Bảng xếp hạng -->
    <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
      <button 
        onclick="togglePointRules()" 
        style="background: none; border: none; color: #624cff; font-weight: 700; font-size: 13.5px; cursor: pointer; display: flex; align-items: center; gap: 6px;"
      >
        <span style="display: inline-block; width: 10px; height: 10px; background-color: #624cff; border-radius: 2px;"></span>
        Cách tính điểm
      </button>
    </div>

    <!-- Khung Hướng dẫn cách tính điểm (Ẩn/Hiện theo nút click) -->
    <div id="pointRulesSection" style="display: ${showPointRules ? 'grid' : 'none'}; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;">
      <!-- Khung Cộng Điểm -->
      <div style="background: #ffffff; border-radius: 16px; padding: 24px; border-top: 4px solid #10b981; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
        <h4 style="color: #10b981; font-size: 16px; font-weight: 800; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">+</span> Danh Mục Cộng Điểm
        </h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px; color: #4a4e69; line-height: 1.8;">
          <li style="margin-bottom: 8px;"><b>• Tham gia HSGQG:</b> Đạt giải / Tham gia đội tuyển thi Học sinh giỏi Quốc gia.</li>
          <li style="margin-bottom: 8px;"><b>• HSGKV:</b> Đạt giải các kỳ thi Học sinh giỏi Khu vực (Duyên hải, 30/4,...).</li>
          <li style="margin-bottom: 8px;"><b>• HD CLB:</b> Ban chủ nhiệm, thành viên đóng góp tích cực cho CLB.</li>
          <li><b>• Các cuộc thi khác:</b> Cuộc thi KHKT, Tin học trẻ, Thể thao, Văn nghệ...</li>
        </ul>
      </div>

      <!-- Khung Trừ Điểm -->
      <div style="background: #ffffff; border-radius: 16px; padding: 24px; border-top: 4px solid #ef4444; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
        <h4 style="color: #ef4444; font-size: 16px; font-weight: 800; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">—</span> Danh Mục Trừ Điểm
        </h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px; color: #4a4e69; line-height: 1.8;">
          <li style="margin-bottom: 8px;"><b>• Vi phạm tác phong:</b> Đồng phục không đúng, thiếu thẻ học sinh, tóc tai vi phạm quy định.</li>
          <li><b>• Luật:</b> Đi trễ, mất trật tự, dùng điện thoại trong giờ học, vi phạm quy định nhà trường.</li>
        </ul>
      </div>
    </div>

    <!-- Top 3 Bục Vinh Quang -->
    <div style="display: grid; grid-template-columns: 1fr 1.1fr 1fr; gap: 20px; align-items: flex-end; margin-bottom: 36px; padding: 0 20px;">
      <!-- Hạng 2 -->
      <div style="background: #ffffff; border-radius: 20px; padding: 28px 16px; text-align: center; border: 1px solid #f0ebff; box-shadow: 0 4px 16px rgba(0,0,0,0.02);">
        <div style="width: 64px; height: 64px; border-radius: 18px; background: linear-gradient(135deg, #3b82f6, #60a5fa); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; margin: 0 auto 16px;">
          ${initials(top2[0])}
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #624cff; margin-bottom: 6px;">#2</div>
        <div style="font-weight: 800; font-size: 15px; color: #17182d; margin-bottom: 4px;">${top2[0]}</div>
        <div style="font-size: 13px; font-weight: 700; color: #624cff;">${top2[2]} điểm</div>
      </div>

      <!-- Hạng 1 (Nhỉnh hơn chút) -->
      <div style="background: #f6f5ff; border-radius: 20px; padding: 36px 16px; text-align: center; border: 2px solid #e2d9ff; box-shadow: 0 8px 24px rgba(98, 76, 255, 0.08); transform: translateY(-10px);">
        <div style="width: 72px; height: 72px; border-radius: 20px; background: linear-gradient(135deg, #624cff, #818cf8); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 22px; margin: 0 auto 16px;">
          ${initials(top1[0])}
        </div>
        <div style="font-size: 14px; font-weight: 800; color: #624cff; margin-bottom: 6px;">#1</div>
        <div style="font-weight: 800; font-size: 16px; color: #17182d; margin-bottom: 4px;">${top1[0]}</div>
        <div style="font-size: 13.5px; font-weight: 800; color: #624cff;">${top1[2]} điểm</div>
      </div>

      <!-- Hạng 3 -->
      <div style="background: #ffffff; border-radius: 20px; padding: 28px 16px; text-align: center; border: 1px solid #f0ebff; box-shadow: 0 4px 16px rgba(0,0,0,0.02);">
        <div style="width: 64px; height: 64px; border-radius: 18px; background: linear-gradient(135deg, #3b82f6, #60a5fa); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; margin: 0 auto 16px;">
          ${initials(top3[0])}
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #624cff; margin-bottom: 6px;">#3</div>
        <div style="font-weight: 800; font-size: 15px; color: #17182d; margin-bottom: 4px;">${top3[0]}</div>
        <div style="font-size: 13px; font-weight: 700; color: #624cff;">${top3[2]} điểm</div>
      </div>
    </div>

    <!-- Bảng danh sách thành viên -->
    <div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); border: 1px solid #f0ebff;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: #046347; color: #ffffff; font-size: 13.5px; font-weight: 700;">
            <th style="padding: 16px 20px; width: 80px;">Hạng</th>
            <th style="padding: 16px 20px;">Họ và Tên <span style="font-weight: 400; font-size: 12px; opacity: 0.85;">(Nhấp vào tên để xem lý do)</span></th>
            <th style="padding: 16px 20px; text-align: center; width: 120px;">Điểm Cộng</th>
            <th style="padding: 16px 20px; text-align: center; width: 120px;">Điểm Trừ</th>
            <th style="padding: 16px 20px; text-align: right; width: 120px;">Tổng Điểm</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map((m, idx) => `
            <tr style="border-bottom: 1px solid #f4f3ff; font-size: 13.5px; transition: background 0.2s;" onmouseover="this.style.background='#fbfaff'" onmouseout="this.style.background='transparent'">
              <td style="padding: 14px 20px; font-weight: 700; color: #4a4e69;">${idx + 1}</td>
              <td style="padding: 14px 20px;">
                <a href="#member-${members.indexOf(m)}" style="color: #2563eb; font-weight: 700; text-decoration: none;">${m[0]}</a>
              </td>
              <td style="padding: 14px 20px; text-align: center; color: #10b981; font-weight: 700;">+0</td>
              <td style="padding: 14px 20px; text-align: center; color: #ef4444; font-weight: 700;">0</td>
              <td style="padding: 14px 20px; text-align: right; font-weight: 800; color: #17182d;">${m[2]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `);
}

// Hàm bổ sung để bật/tắt khung Cách tính điểm
function togglePointRules() {
  showPointRules = !showPointRules;
  const section = document.getElementById('pointRulesSection');
  if (section) {
    section.style.display = showPointRules ? 'grid' : 'none';
  }
}
// Biến lưu trạng thái tab hiện tại ('announcements' hoặc 'events') và bộ lọc thông báo
let currentTab = 'announcements';
let currentNoticeFilter = 'all';

function announcementsPage() {
  return layout("Thông báo & Sự kiện", "Cập nhật những thông tin và sự kiện mới nhất của lớp", `
    <!-- Thanh chuyển tab & Nút tạo mới -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      
      <!-- Cụm bên trái: Tab chuyển đổi & Nút Tạo mới động -->
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <!-- Nút chuyển Tab chính -->
        <div style="display: flex; gap: 6px; background: #eae7ff; padding: 4px; border-radius: 20px;">
          <button 
            id="btnTabAnnounce" 
            onclick="switchMainTab('announcements')" 
            style="padding: 8px 18px; border-radius: 16px; border: none; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; ${currentTab === 'announcements' ? 'background: #624cff; color: #fff; box-shadow: 0 2px 8px rgba(98, 76, 255, 0.25);' : 'background: transparent; color: #624cff;'}"
          >
            🔔 Thông báo
          </button>
          <button 
            id="btnTabEvents" 
            onclick="switchMainTab('events')" 
            style="padding: 8px 18px; border-radius: 16px; border: none; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; ${currentTab === 'events' ? 'background: #624cff; color: #fff; box-shadow: 0 2px 8px rgba(98, 76, 255, 0.25);' : 'background: transparent; color: #624cff;'}"
          >
            📅 Sự kiện
          </button>
        </div>

        <!-- Nút Tạo Mới (Tự động đổi tên và chức năng theo Tab đang chọn) -->
        <button 
          id="btnCreateAction" 
          onclick="handleCreateAction()" 
          style="padding: 8px 16px; border-radius: 16px; border: none; background: #10b981; color: #ffffff; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25); transition: all 0.2s;"
        >
          <span style="font-size: 15px;">+</span> ${currentTab === 'announcements' ? 'Tạo thông báo' : 'Tạo sự kiện'}
        </button>
      </div>

      <!-- Bộ lọc nhỏ (Chỉ hiển thị khi ở tab Thông báo) -->
     <!-- ✅ ĐOẠN MỚI NỐI TRỰC TIẾP VỚI HÀM LỌC -->
<div id="noticeFilterContainer" style="display: flex; gap: 8px; flex-wrap: wrap;">
  ${renderNoticeFilters()}
</div>
    </div>

    <!-- Khung chứa nội dung chính -->
    <div id="mainTabContentContainer">
      ${renderMainTabContent()}
    </div>

    <!-- Modal Form Popup -->
    <div id="createModalContainer" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4); z-index: 9999; justify-content: center; align-items: center;">
      <div id="createModalBody" style="background: #ffffff; width: 90%; max-width: 480px; border-radius: 20px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);"></div>
    </div>
   
    `);
}

// Chuyển đổi qua lại giữa Tab Thông báo & Tab Sự kiện
function switchMainTab(tab) {
  currentTab = tab;
  
  const btnA = document.getElementById('btnTabAnnounce');
  const btnE = document.getElementById('btnTabEvents');
  const btnCreate = document.getElementById('btnCreateAction');
  const subFilter = document.getElementById('noticeSubFilter');

  if (tab === 'announcements') {
    btnA.style.cssText = "padding: 8px 18px; border-radius: 16px; border: none; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; background: #624cff; color: #fff; box-shadow: 0 2px 8px rgba(98, 76, 255, 0.25);";
    btnE.style.cssText = "padding: 8px 18px; border-radius: 16px; border: none; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; background: transparent; color: #624cff;";
    if (btnCreate) btnCreate.innerHTML = '<span style="font-size: 15px;">+</span> Tạo thông báo';
    if (subFilter) subFilter.style.display = 'flex';
  } else {
    btnE.style.cssText = "padding: 8px 18px; border-radius: 16px; border: none; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; background: #624cff; color: #fff; box-shadow: 0 2px 8px rgba(98, 76, 255, 0.25);";
    btnA.style.cssText = "padding: 8px 18px; border-radius: 16px; border: none; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; background: transparent; color: #624cff;";
    if (btnCreate) btnCreate.innerHTML = '<span style="font-size: 15px;">+</span> Tạo sự kiện';
    if (subFilter) subFilter.style.display = 'none';
  }

  const container = document.getElementById('mainTabContentContainer');
  if (container) {
    container.innerHTML = renderMainTabContent();
  }
}

// 1. Xử lý mở Modal Popup Form
function handleCreateAction() {
  const modal = document.getElementById('createModalContainer');
  const modalBody = document.getElementById('createModalBody');
  
  if (!modal || !modalBody) return;

  if (currentTab === 'announcements') {
    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; font-size: 18px; color: #17182d; font-weight: 800;">🔔 Tạo Thông Báo Mới</h3>
        <button onclick="closeModal()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #888;">&times;</button>
      </div>
      <form onsubmit="submitNotice(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Tiêu đề thông báo</label>
          <input type="text" id="noticeTitle" placeholder="Nhập tiêu đề..." required style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 13.5px; box-sizing: border-box;">
        </div>
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Nội dung thông báo</label>
          <textarea id="noticeContent" rows="4" placeholder="Nhập nội dung chi tiết..." required style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 13.5px; box-sizing: border-box; resize: vertical;"></textarea>
        </div>
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Phân loại</label>
          <select id="noticeTag" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 13.5px; background: #fff;">
            <option value="Thông báo">Thông báo</option>
            <option value="Quan trọng">Quan trọng</option>
            <option value="Họp lớp">Họp lớp</option>
            <option value="Bài tập">Bài tập</option>
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
          <button type="button" onclick="closeModal()" style="padding: 10px 18px; border-radius: 10px; border: none; background: #f0efff; color: #624cff; font-weight: 700; cursor: pointer;">Hủy</button>
          <button type="submit" style="padding: 10px 20px; border-radius: 10px; border: none; background: #624cff; color: #fff; font-weight: 700; cursor: pointer;">Đăng thông báo</button>
        </div>
      </form>
    `;
  } else {
    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; font-size: 18px; color: #17182d; font-weight: 800;">📅 Tạo Sự Kiện Mới</h3>
        <button onclick="closeModal()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #888;">&times;</button>
      </div>
      <form onsubmit="submitEvent(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: grid; grid-template-columns: 70px 1fr; gap: 10px;">
          <div>
            <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Icon</label>
            <input type="text" id="eventIcon" value="📝" required style="width: 100%; text-align: center; padding: 10px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 16px; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Tên sự kiện</label>
            <input type="text" id="eventTitle" placeholder="Nhập tên sự kiện..." required style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 13.5px; box-sizing: border-box;">
          </div>
        </div>
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Thời gian tổ chức</label>
          <input type="text" id="eventDate" placeholder="vd: 15/09/2026" required style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 13.5px; box-sizing: border-box;">
        </div>
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 700; color: #4a4e69; margin-bottom: 6px;">Mô tả sự kiện</label>
          <textarea id="eventDesc" rows="3" placeholder="Nhập mô tả..." required style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #dcd7ff; font-size: 13.5px; box-sizing: border-box; resize: vertical;"></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
          <button type="button" onclick="closeModal()" style="padding: 10px 18px; border-radius: 10px; border: none; background: #f0efff; color: #624cff; font-weight: 700; cursor: pointer;">Hủy</button>
          <button type="submit" style="padding: 10px 20px; border-radius: 10px; border: none; background: #624cff; color: #fff; font-weight: 700; cursor: pointer;">Tạo sự kiện</button>
        </div>
      </form>
    `;
  }
  
  modal.style.display = 'flex';
}

// 2. Đóng Modal
function closeModal() {
  const modal = document.getElementById('createModalContainer');
  if (modal) modal.style.display = 'none';
}

// 3. Xử lý nộp Form Thông báo
function submitNotice(e) {
  e.preventDefault();
  const title = document.getElementById('noticeTitle').value;
  const content = document.getElementById('noticeContent').value;
  const tag = document.getElementById('noticeTag').value;

  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  announcements.unshift({ title, content, tag, date: dateStr });
  closeModal();

  const container = document.getElementById('mainTabContentContainer');
  if (container) container.innerHTML = renderMainTabContent();
}

// 4. Xử lý nộp Form Sự kiện
function submitEvent(e) {
  e.preventDefault();
  const icon = document.getElementById('eventIcon').value;
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const desc = document.getElementById('eventDesc').value;

  events.unshift({ icon, title, date, desc, daysLeft: 'Sắp diễn ra' });
  closeModal();

  const container = document.getElementById('mainTabContentContainer');
  if (container) container.innerHTML = renderMainTabContent();
}

// 5. Xóa Thông báo
function deleteAnnouncement(index) {
  if (confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
    announcements.splice(index, 1);
    const container = document.getElementById('mainTabContentContainer');
    if (container) container.innerHTML = renderMainTabContent();
  }
}

// 6. Xóa Sự kiện
function deleteEvent(index) {
  if (confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
    events.splice(index, 1);
    const container = document.getElementById('mainTabContentContainer');
    if (container) container.innerHTML = renderMainTabContent();
  }
}

// 7. Hàm Render chính duy nhất (Dùng chung cho cả Tab Thông báo và Sự kiện)
function renderMainTabContent() {
  if (currentTab === 'events') {
    if (!events || events.length === 0) {
      return `<p style="text-align:center; color:#888; padding: 40px 0;">Chưa có sự kiện nào.</p>`;
    }

    return `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        ${events.map((ev, index) => `
          <div style="background: #ffffff; border-radius: 16px; padding: 20px; border: 1px solid #e5e0ff; box-shadow: 0 4px 16px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 24px;">${ev.icon || '📝'}</span>
                  <div>
                    <h4 style="font-weight: 800; font-size: 15px; color: #17182d; margin: 0;">${ev.title}</h4>
                    <small style="color: #624cff; font-weight: 700;">${ev.date}</small>
                  </div>
                </div>
                <button onclick="deleteEvent(${index})" style="background: #fee2e2; color: #ef4444; border: none; padding: 4px 8px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">🗑️ Xóa</button>
              </div>
              <p style="font-size: 13px; color: #555770; margin: 6px 0 0 0; line-height: 1.5;">${ev.desc}</p>
            </div>
            <div>
              <span style="display: inline-flex; align-items: center; gap: 4px; background: #fff5e6; color: #d97706; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 12px;">
                📅 ${ev.daysLeft || 'Sắp diễn ra'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Danh sách Thông báo
  const filteredNotices = announcements.filter(a => {
    if (currentNoticeFilter === 'all') return true;
    return a.tag === currentNoticeFilter;
  });

  if (!filteredNotices || filteredNotices.length === 0) {
    return `<p style="text-align:center; color:#888; padding: 40px 0;">Không có thông báo nào thuộc danh mục này.</p>`;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${filteredNotices.map((a, index) => `
        <div style="background: #ffffff; border-radius: 16px; padding: 20px 24px; border: 1px solid #e5e0ff; box-shadow: 0 4px 16px rgba(0,0,0,0.02); display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
          <div style="flex: 1;">
            <h4 style="font-weight: 800; font-size: 15px; color: #17182d; margin: 0 0 8px 0;">${a.title}</h4>
            <p style="font-size: 13.5px; color: #555770; margin: 0 0 12px 0; line-height: 1.5;">${a.content}</p>
            <small style="color: #624cff; font-weight: 700;">🕒 ${a.date}</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
            <span style="background: #f0efff; color: #624cff; font-weight: 700; font-size: 11.5px; padding: 4px 12px; border-radius: 12px; white-space: nowrap;">
              ${a.tag}
            </span>
            <button onclick="deleteAnnouncement(${index})" style="background: #fee2e2; color: #ef4444; border: none; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">🗑️ Xóa</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
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
  const input = document.getElementById("memberSearch");
  if (input) {
    input.oninput = () => document.getElementById("memberGrid").innerHTML = members.filter(m => m[0].toLowerCase().includes(input.value.toLowerCase())).map(memberCard).join("");
  }
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
}
  // Hàm chuyển đổi bộ lọc và vẽ lại danh sách thông báo
function setNoticeFilter(filter) {
  currentNoticeFilter = filter;
  
  // 1. Cập nhật lại màu sắc của các nút lọc
  const filterContainer = document.getElementById('noticeFilterContainer');
  if (filterContainer) {
    filterContainer.innerHTML = renderNoticeFilters();
  }

  // 2. Cập nhật lại danh sách thông báo tương ứng
  const contentContainer = document.getElementById('mainTabContentContainer');
  if (contentContainer) {
    contentContainer.innerHTML = renderMainTabContent();
  }
}

// Hàm sinh mã HTML cho thanh danh sách nút bộ lọc
function renderNoticeFilters() {
  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Quan trọng', label: 'Quan trọng' },
    { id: 'Họp lớp', label: 'Họp lớp' },
    { id: 'Bài tập', label: 'Bài tập' },
    { id: 'Thông báo', label: 'Thông báo' }
  ];

  return filters.map(f => {
    const isActive = currentNoticeFilter === f.id;
    const style = isActive 
      ? 'background: #624cff; color: #ffffff;' 
      : 'background: #f0efff; color: #624cff;';

    return `<button onclick="setNoticeFilter('${f.id}')" style="${style} border: none; padding: 6px 14px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s;">${f.label}</button>`;
  }).join('');
};
