/* =================================================
   KHỞI TẠO WEBSITE
================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadClassInfo();

    loadMembers();

    loadSchedule();

    loadAnnouncements();

    setupNavigation();

});


/* =================================================
   THÔNG TIN LỚP
================================================= */

function loadClassInfo() {

    document.title = classInfo.name;

    document.getElementById("className").textContent =
        classInfo.name;

    document.getElementById("homeClassName").textContent =
        classInfo.name;

    document.getElementById("homeDescription").textContent =
        classInfo.description;

    document.getElementById("aboutClassName").textContent =
        classInfo.name;

    document.getElementById("goal").textContent =
        classInfo.goal;

    document.getElementById("unity").textContent =
        classInfo.unity;

    document.getElementById("memory").textContent =
        classInfo.memory;
}


/* =================================================
   THÀNH VIÊN
================================================= */

function loadMembers() {

    const container =
        document.getElementById("membersList");

    container.innerHTML = "";

    members.forEach(member => {

        const element =
            document.createElement("div");

        element.className = "member";

        element.innerHTML = `

            <div class="avatar">
                ${member.avatar}
            </div>

            <h3>
                ${member.name}
            </h3>

            <p>
                ${member.role}
            </p>

        `;

        container.appendChild(element);

    });
}


/* =================================================
   THỜI KHÓA BIỂU
================================================= */

function loadSchedule() {

    const table =
        document.getElementById("scheduleBody");

    table.innerHTML = "";

    schedule.forEach(row => {

        const tr =
            document.createElement("tr");

        let html = `
            <td>
                <strong>
                    ${row.day}
                </strong>
            </td>
        `;

        row.subjects.forEach(subject => {

            html += `
                <td>
                    ${subject}
                </td>
            `;

        });

        tr.innerHTML = html;

        table.appendChild(tr);

    });
}


/* =================================================
   THÔNG BÁO
================================================= */

function loadAnnouncements() {

    const container =
        document.getElementById("announcementList");

    container.innerHTML = "";

    announcements.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "announcement";

        element.innerHTML = `

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.content}
            </p>

        `;

        container.appendChild(element);

    });
}


/* =================================================
   CHUYỂN TRANG
================================================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /* Cập nhật menu */

    const buttons =
        document.querySelectorAll(".nav-button");

    buttons.forEach(button => {

        button.classList.remove("active");

        if (
            button.dataset.page === pageId
        ) {

            button.classList.add("active");

        }

    });

}


/* =================================================
   CÀI ĐẶT NÚT ĐIỀU HƯỚNG
================================================= */

function setupNavigation() {

    /* Menu */

    const buttons =
        document.querySelectorAll(".nav-button");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.page
                );

            }
        );

    });


    /* Nút "Khám phá lớp" */

    const startButton =
        document.querySelector(".start-button");

    startButton.addEventListener(
        "click",
        () => {

            showPage(
                startButton.dataset.go
            );

        }
    );

}
