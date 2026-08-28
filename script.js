// Variable lưu bộ lọc vai trò hiện tại
let currentRoleFilter = 'all';

// Hàm xử lý khi gõ tìm kiếm
function searchMembers(keyword) {
  const term = keyword.trim().toLowerCase();
  
  // Lọc theo tên từ danh sách `members`
  const filtered = members.filter(m => {
    const nameMatch = m[0].toLowerCase().includes(term);
    const isBCS = m[3] && m[3] !== 'Thành viên';

    if (currentRoleFilter === 'bcs') return nameMatch && isBCS;
    if (currentRoleFilter === 'member') return nameMatch && !isBCS;
    return nameMatch;
  });

  // Render lại nội dung danh sách
  const container = document.getElementById('membersContainer');
  if (container) {
    container.innerHTML = renderMembersList(filtered);
  }
}

// Hàm lọc theo vai trò (Tất cả / Ban cán sự / Thành viên)
function filterMembers(role, btn) {
  currentRoleFilter = role;
  
  // Active nút bấm
  document.querySelectorAll('.members-filter-bar .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Lấy giá trị ô tìm kiếm hiện tại để lọc kết hợp
  const input = document.getElementById('memberSearchInput');
  searchMembers(input ? input.value : '');
}

// Hàm trả về HTML danh sách thành viên
function renderMembersList(list) {
  if (!list || list.length === 0) {
    return `<p style="text-align:center; color:#888; padding: 40px 0; width: 100%;">Không tìm thấy thành viên nào phù hợp.</p>`;
  }

  const bcsList = list.filter(m => m[3] && m[3] !== 'Thành viên');
  const memberList = list.filter(m => !m[3] || m[3] === 'Thành viên');

  let html = '';

  if (bcsList.length > 0 && currentRoleFilter !== 'member') {
    html += `
      <div class="group-title">Ban cán sự</div>
      <div class="grid-3" style="margin-bottom: 24px;">
        ${bcsList.map(m => renderMemberCardHTML(m)).join('')}
      </div>
    `;
  }

  if (memberList.length > 0 && currentRoleFilter !== 'bcs') {
    html += `
      <div class="group-title">Thành viên</div>
      <div class="grid-3">
        ${memberList.map(m => renderMemberCardHTML(m)).join('')}
      </div>
    `;
  }

  return html;
}

// Hàm render từng thẻ thành viên
function renderMemberCardHTML(m) {
  const index = members.indexOf(m);
  return `
    <div class="card member-card" onclick="location.hash='member-${index}'">
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="avatar">${initials(m[0])}</div>
        <div>
          <b>${m[0]}</b>
          <div style="font-size:12px; color:#6b7280; margin-top:2px;">${m[3] || 'Thành viên'}</div>
        </div>
      </div>
      <div style="margin-top:12px; font-weight:800; color:#624cff; font-size:13px;">
        ${m[2]} điểm
      </div>
    </div>
  `;
}
