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
let currentFilter = 'all';

function membersPage() {
  return layout("", "", `
    <!-- Header Banner -->
    <div class="member-header">
      <div class="member-icon-badge">👥</div>
      <h1>Thành viên lớp</h1>
      <p>Gặp gỡ ${members.length} thành viên tuyệt vời của lớp 10 Toán 1</p>
    </div>

    <!-- Toolbar: Tìm kiếm & Nút Filter -->
    <div class="member-toolbar">
      <div class="search-box">
        <input id="memberSearch" placeholder="🔍 Tìm kiếm thành viên..." oninput="filterMembers()">
      </div>
      <div class="filter-tabs">
        <button class="tab-btn active" onclick="setFilter('all', this)">Tất cả</button>
        <button class="tab-btn" onclick="setFilter('bcs', this)">Ban cán sự</button>
        <button class="tab-btn" onclick="setFilter('member', this)">Thành viên</button>
      </div>
    </div>

    <!-- Khu vực danh sách thành viên -->
    <div id="memberContent">
      ${renderMemberGroups(members)}
    </div>
  `);
}

// Tạo thẻ thành viên dạng đứng
function memberCard(m) {
  // Tự động phân màu Avatar cho khác biệt
  const colors = ['#2563eb', '#624cff', '#e74c3c', '#2ecc71', '#f39c12'];
  const charCode = m[0].charCodeAt(0) % colors.length;
  const bgColor = colors[charCode];

  return `
    <div class="member-card-v2">
      <div class="member-avatar-v2" style="background: ${bgColor}">${initials(m[0])}</div>
      <h3>${m[0]}</h3>
      <span class="member-badge">${m[3]}</span>
      <div class="member-score-v2">${m[2]} điểm</div>
    </div>
  `;
}

// Phân chia nhóm Ban cán sự và Thành viên
function renderMemberGroups(list) {
  const bcsList = list.filter(m => m[3] !== "Thành viên");
  const memberList = list.filter(m => m[3] === "Thành viên");

  let html = '';

  if ((currentFilter === 'all' || currentFilter === 'bcs') && bcsList.length > 0) {
    html += `
      <div class="group-title">Ban cán sự</div>
      <div class="member-grid-v2">${bcsList.map(memberCard).join('')}</div>
    `;
  }

  if ((currentFilter === 'all' || currentFilter === 'member') && memberList.length > 0) {
    html += `
      <div class="group-title">Thành viên</div>
      <div class="member-grid-v2">${memberList.map(memberCard).join('')}</div>
    `;
  }

  return html || '<p style="text-align:center; color:#888; margin:40px 0;">Không tìm thấy thành viên phù hợp.</p>';
}

// Xử lý bộ lọc nút (All / Ban cán sự / Thành viên)
function setFilter(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterMembers();
}

// Xử lý tìm kiếm
function filterMembers() {
  const query = document.getElementById('memberSearch').value.toLowerCase();
  const filtered = members.filter(m => m[0].toLowerCase().includes(query));
  document.getElementById('memberContent').innerHTML = renderMemberGroups(filtered);
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
const announcementsData = [
  {
    id: 1,
    title: "Lịch kiểm tra giữa kỳ tháng 9",
    desc: "Kiểm tra giữa kỳ sẽ diễn ra vào ngày 15/09/2026. Các bạn cần ôn tập chương 1 và chương 2 môn Toán.",
    date: "28/08/2026",
    type: "Quan trọng",
    typeClass: "quan-trong"
  },
  {
    id: 2,
    title: "Họp lớp thứ 6 tuần này lúc 17h",
    desc: "Họp lớp tại phòng 201, thảo luận về kế hoạch dã ngoại tháng 10.",
    date: "28/08/2026",
    type: "Họp lớp",
    typeClass: "hop-lop"
  },
  {
    id: 3,
    title: "Nộp bài tập toán chương 1 trước 30/8",
    desc: "Các bạn nhớ nộp bài tập chương 1 trước ngày 30/08/2026 cho thầy Hùng.",
    date: "28/08/2026",
    type: "Bài tập",
    typeClass: "bai-tap"
  },
  {
    id: 4,
    title: "Chào mừng năm học mới 2026-2027!",
    desc: "Chúc mừng các bạn lớp 10 Toán 1 bước vào năm học mới. Hãy cùng nhau cố gắng!",
    date: "28/08/2026",
    type: "Thông báo",
    typeClass: "thong-bao"
  }
];

let currentAnnFilter = 'Tất cả';

// Trạng thái giả lập Admin (Sau này khi làm tính năng Đăng nhập sẽ đổi thành true/false dựa vào tài khoản)
let isAdmin = true; 

function announcementsPage() {
  return layout("", "", `
    <!-- Thanh điều hướng và Filter -->
    <div class="announcement-toolbar">
      <div class="sub-tab-group">
        <button class="sub-tab-btn active">🔔 Thông báo</button>
        <button class="sub-tab-btn" onclick="location.hash='#events'">📅 Sự kiện</button>
      </div>

      <div class="filter-pills">
        <button class="pill-btn ${currentAnnFilter === 'Tất cả' ? 'active' : ''}" onclick="filterAnnouncements('Tất cả', this)">Tất cả</button>
        <button class="pill-btn ${currentAnnFilter === 'Quan trọng' ? 'active' : ''}" onclick="filterAnnouncements('Quan trọng', this)">Quan trọng</button>
        <button class="pill-btn ${currentAnnFilter === 'Họp lớp' ? 'active' : ''}" onclick="filterAnnouncements('Họp lớp', this)">Họp lớp</button>
        <button class="pill-btn ${currentAnnFilter === 'Bài tập' ? 'active' : ''}" onclick="filterAnnouncements('Bài tập', this)">Bài tập</button>
        <button class="pill-btn ${currentAnnFilter === 'Thông báo' ? 'active' : ''}" onclick="filterAnnouncements('Thông báo', this)">Thông báo</button>
      </div>

      <!-- Nút tạo thông báo dành cho Ban cán sự / Giáo viên -->
      ${isAdmin ? `
        <button class="sub-tab-btn active" style="background: #2ecc71; margin-left: auto;" onclick="openAnnouncementModal()">
          ➕ Tạo thông báo mới
        </button>
      ` : ''}
    </div>

    <!-- Modal Form Đăng Thông Báo -->
    <div id="annModal" class="modal-overlay hidden">
      <div class="modal-content">
        <h3>📢 Đăng Thông Báo Mới</h3>
        <form onsubmit="addNewAnnouncement(event)">
          <div class="form-group">
            <label>Tiêu đề thông báo:</label>
            <input type="text" id="annTitle" required placeholder="Nhập tiêu đề...">
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
            <textarea id="annDesc" rows="4" required placeholder="Nhập nội dung thông báo..."></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" onclick="closeAnnouncementModal()">Hủy</button>
            <button type="submit" class="btn-submit">Đăng ngay</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Danh sách Thông báo -->
    <div id="announcementList" class="announcement-list">
      ${renderAnnouncements(announcementsData)}
    </div>
  `);
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
