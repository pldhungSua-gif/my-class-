/* =================================================
   KHỞI TẠO WEBSITE
================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadClassInfo();

    loadMembers();

    loadRanking();

    loadSchedule();

    loadAnnouncements();

    setupNavigation();

    setupButtons();

    setupAuthentication();

    checkLogin();

});


/* =================================================
   LOCAL STORAGE
================================================= */

const STORAGE_USERS = "toan1_users";

const STORAGE_CURRENT_USER = "toan1_current_user";


/* =================================================
   HÀM LẤY USER
================================================= */

function getUsers() {

    const data = localStorage.getItem(STORAGE_USERS);

    if (!data) {
        return [];
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error("Lỗi đọc users:", error);

        return [];

    }

}


/* =================================================
   LƯU USER
================================================= */

function saveUsers(users) {

    localStorage.setItem(
        STORAGE_USERS,
        JSON.stringify(users)
    );

}


/* =================================================
   THÔNG TIN LỚP
================================================= */

function loadClassInfo() {

    const className =
        document.getElementById("className");

    const homeClassName =
        document.getElementById("homeClassName");

    const aboutClassName =
        document.getElementById("aboutClassName");

    const description =
        document.getElementById("homeDescription");

    const goal =
        document.getElementById("goal");

    const unity =
        document.getElementById("unity");

    const memory =
        document.getElementById("memory");


    if (className) {
        className.textContent = classInfo.name;
    }

    if (homeClassName) {
        homeClassName.textContent = classInfo.name;
    }

    if (aboutClassName) {
        aboutClassName.textContent = classInfo.name;
    }

    if (description) {
        description.textContent =
            classInfo.description;
    }

    if (goal) {
        goal.textContent =
            classInfo.goal;
    }

    if (unity) {
        unity.textContent =
            classInfo.unity;
    }

    if (memory) {
        memory.textContent =
            classInfo.memory;
    }

}


/* =================================================
   THÀNH VIÊN
================================================= */

function loadMembers() {

    const container =
        document.getElementById("membersList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const users =
        getUsers();

    /*
       Kết hợp thành viên mặc định
       với những học sinh đăng ký.
    */

    const allMembers = [...members];

    users.forEach(function (user) {

        const exists =
            allMembers.some(function (member) {

                return member.username === user.username;

            });

        if (!exists) {

            allMembers.push({

                id:
                    "user_" + user.username,

                name:
                    user.fullname,

                username:
                    user.username,

                role:
                    "Học sinh",

                score:
                    user.score || 0

            });

        }

    });


    allMembers.forEach(function (member) {

        const card =
            document.createElement("div");

        card.className = "member";

        const firstLetter =
            member.name
                .trim()
                .charAt(0)
                .toUpperCase();


        card.innerHTML = `

            <div class="avatar">
                ${escapeHTML(firstLetter)}
            </div>

            <h3>
                ${escapeHTML(member.name)}
            </h3>

            <p>
                ${escapeHTML(member.role)}
            </p>

            <div class="member-score">
                ⭐ ${Number(member.score) || 0} điểm
            </div>

        `;

        container.appendChild(card);

    });

}


/* =================================================
   XẾP HẠNG
================================================= */

function loadRanking() {

    const container =
        document.getElementById("rankingList");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    const users =
        getUsers();


    const rankingData = [];


    /*
       Thành viên mặc định
    */

    members.forEach(function (member) {

        rankingData.push({

            name:
                member.name,

            score:
                Number(member.score) || 0

        });

    });


    /*
       Người dùng đăng ký
    */

    users.forEach(function (user) {

        rankingData.push({

            name:
                user.fullname,

            score:
                Number(user.score) || 0

        });

    });


    /*
       Sắp xếp điểm giảm dần
    */

    rankingData.sort(function (a, b) {

        return b.score - a.score;

    });


    rankingData.forEach(function (student, index) {

        const rank =
            index + 1;


        const item =
            document.createElement("div");

        item.className =
            "ranking-item";


        let medal = "";

        if (rank === 1) {
            medal = "🥇";
        } else if (rank === 2) {
            medal = "🥈";
        } else if (rank === 3) {
            medal = "🥉";
        } else {
            medal = rank;
        }


        item.innerHTML = `

            <div class="rank-number">
                ${medal}
            </div>

            <div class="rank-avatar">
                ${escapeHTML(
                    student.name
                        .trim()
                        .charAt(0)
                        .toUpperCase()
                )}
            </div>

            <div class="rank-name">

                <strong>
                    ${escapeHTML(student.name)}
                </strong>

                <span>
                    Học sinh
                </span>

            </div>

            <div class="rank-score">
                ${student.score} điểm
            </div>

        `;


        container.appendChild(item);

    });

}


/* =================================================
   THỜI KHÓA BIỂU
================================================= */

function loadSchedule() {

    const tbody =
        document.getElementById("scheduleBody");

    if (!tbody) {
        return;
    }

    tbody.innerHTML = "";


    schedule.forEach(function (day) {

        const row =
            document.createElement("tr");


        let html = `

            <td>
                <strong>
                    ${escapeHTML(day.day)}
                </strong>
            </td>

        `;


        day.lessons.forEach(function (lesson) {

            html += `

                <td>
                    ${escapeHTML(lesson)}
                </td>

            `;

        });


        row.innerHTML = html;

        tbody.appendChild(row);

    });

}


/* =================================================
   THÔNG BÁO
================================================= */

function loadAnnouncements() {

    const container =
        document.getElementById(
            "announcementList"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    announcements.forEach(function (announcement) {

        const item =
            document.createElement("div");

        item.className =
            "announcement";


        item.innerHTML = `

            <div class="announcement-date">
                ${escapeHTML(announcement.date)}
            </div>

            <h3>
                ${escapeHTML(announcement.title)}
            </h3>

            <p>
                ${escapeHTML(announcement.content)}
            </p>

        `;


        container.appendChild(item);

    });

}


/* =================================================
   CHUYỂN TRANG
================================================= */

function setupNavigation() {

    const navButtons =
        document.querySelectorAll(".nav-button");


    navButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const page =
                    button.dataset.page;

                showPage(page);

            }
        );

    });

}


/* =================================================
   HIỂN THỊ TRANG
================================================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    const buttons =
        document.querySelectorAll(".nav-button");


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    buttons.forEach(function (button) {

        button.classList.remove("active");

    });


    const target =
        document.getElementById(pageId);


    const activeButton =
        document.querySelector(
            `.nav-button[data-page="${pageId}"]`
        );


    if (target) {

        target.classList.add("active");

    }


    if (activeButton) {

        activeButton.classList.add("active");

    }

}


/* =================================================
   CÁC BUTTON
================================================= */

function setupButtons() {

    const startButton =
        document.querySelector(".start-button");


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                showPage(
                    startButton.dataset.go
                );

            }
        );

    }


    const homeLoginButton =
        document.getElementById(
            "homeLoginButton"
        );


    if (homeLoginButton) {

        homeLoginButton.addEventListener(
            "click",
            function () {

                openLoginModal();

            }
        );

    }


    const loginHeaderButton =
        document.getElementById(
            "loginHeaderButton"
        );


    if (loginHeaderButton) {

        loginHeaderButton.addEventListener(
            "click",
            function () {

                openLoginModal();

            }
        );

    }


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }

}


/* =================================================
   AUTHENTICATION
================================================= */

function setupAuthentication() {

    const loginForm =
        document.getElementById("loginForm");


    const registerForm =
        document.getElementById(
            "registerForm"
        );


    const openRegister =
        document.getElementById(
            "openRegister"
        );


    const openLogin =
        document.getElementById(
            "openLogin"
        );


    const closeLogin =
        document.getElementById(
            "closeLoginModal"
        );


    const closeRegister =
        document.getElementById(
            "closeRegisterModal"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            handleRegister
        );

    }


    if (openRegister) {

        openRegister.addEventListener(
            "click",
            function () {

                closeLoginModal();

                openRegisterModal();

            }
        );

    }


    if (openLogin) {

        openLogin.addEventListener(
            "click",
            function () {

                closeRegisterModal();

                openLoginModal();

            }
        );

    }


    if (closeLogin) {

        closeLogin.addEventListener(
            "click",
            closeLoginModal
        );

    }


    if (closeRegister) {

        closeRegister.addEventListener(
            "click",
            closeRegisterModal
        );

    }


    /*
       Click ra ngoài modal
    */

    const loginModal =
        document.getElementById(
            "loginModal"
        );


    const registerModal =
        document.getElementById(
            "registerModal"
        );


    if (loginModal) {

        loginModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    loginModal
                ) {

                    closeLoginModal();

                }

            }
        );

    }


    if (registerModal) {

        registerModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    registerModal
                ) {

                    closeRegisterModal();

                }

            }
        );

    }

}


/* =================================================
   ĐĂNG KÝ
================================================= */

function handleRegister(event) {

    event.preventDefault();


    const fullname =
        document.getElementById(
            "registerFullname"
        ).value.trim();


    const username =
        document.getElementById(
            "registerUsername"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const password2 =
        document.getElementById(
            "registerPassword2"
        ).value;


    const message =
        document.getElementById(
            "registerMessage"
        );


    if (fullname.length < 2) {

        showMessage(
            message,
            "Vui lòng nhập họ và tên.",
            "error"
        );

        return;

    }


    if (username.length < 3) {

        showMessage(
            message,
            "Tên đăng nhập phải có ít nhất 3 ký tự.",
            "error"
        );

        return;

    }


    if (password.length < 4) {

        showMessage(
            message,
            "Mật khẩu phải có ít nhất 4 ký tự.",
            "error"
        );

        return;

    }


    if (password !== password2) {

        showMessage(
            message,
            "Mật khẩu nhập lại không khớp.",
            "error"
        );

        return;

    }


    const users =
        getUsers();


    const exists =
        users.some(function (user) {

            return user.username === username;

        });


    if (exists) {

        showMessage(
            message,
            "Tên đăng nhập này đã tồn tại.",
            "error"
        );

        return;

    }


    const newUser = {

        id:
            Date.now(),

        fullname:
            fullname,

        username:
            username,

        password:
            password,

        score:
            0,

        createdAt:
            new Date().toISOString()

    };


    users.push(newUser);

    saveUsers(users);


    showMessage(
        message,
        "Đăng ký thành công! Bạn có thể đăng nhập.",
        "success"
    );


    document.getElementById(
        "registerForm"
    ).reset();


    setTimeout(function () {

        closeRegisterModal();

        openLoginModal();

    }, 1000);


    /*
       Cập nhật danh sách
       và bảng xếp hạng.
    */

    loadMembers();

    loadRanking();

}


/* =================================================
   ĐĂNG NHẬP
================================================= */

function handleLogin(event) {

    event.preventDefault();


    const username =
        document.getElementById(
            "loginUsername"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    /*
       Tài khoản mặc định
       trong data.js
    */

    const defaultMember =
        members.find(function (member) {

            return member.username === username;

        });


    if (
        defaultMember &&
        password === "123456"
    ) {

        const currentUser = {

            fullname:
                defaultMember.name,

            username:
                defaultMember.username,

            score:
                defaultMember.score

        };


        localStorage.setItem(
            STORAGE_CURRENT_USER,
            JSON.stringify(currentUser)
        );


        showMessage(
            message,
            "Đăng nhập thành công!",
            "success"
        );


        setTimeout(function () {

            closeLoginModal();

            checkLogin();

        }, 700);


        return;

    }


    /*
       Kiểm tra tài khoản
       đã đăng ký.
    */

    const users =
        getUsers();


    const user =
        users.find(function (item) {

            return (
                item.username === username &&
                item.password === password
            );

        });


    if (!user) {

        showMessage(
            message,
            "Tên đăng nhập hoặc mật khẩu không đúng.",
            "error"
        );

        return;

    }


    const currentUser = {

        fullname:
            user.fullname,

        username:
            user.username,

        score:
            user.score || 0

    };


    localStorage.setItem(
        STORAGE_CURRENT_USER,
        JSON.stringify(currentUser)
    );


    showMessage(
        message,
        "Đăng nhập thành công!",
        "success"
    );


    setTimeout(function () {

        closeLoginModal();

        checkLogin();

    }, 700);

}


/* =================================================
   KIỂM TRA ĐĂNG NHẬP
================================================= */

function checkLogin() {

    const data =
        localStorage.getItem(
            STORAGE_CURRENT_USER
        );


    const loginButton =
        document.getElementById(
            "loginHeaderButton"
        );


    const userHeader =
        document.getElementById(
            "userHeader"
        );


    const headerUsername =
        document.getElementById(
            "headerUsername"
        );


    if (!data) {

        if (loginButton) {
            loginButton.style.display =
                "block";
        }

        if (userHeader) {
            userHeader.style.display =
                "none";
        }

        return;

    }


    let user;


    try {

        user = JSON.parse(data);

    } catch (error) {

        localStorage.removeItem(
            STORAGE_CURRENT_USER
        );

        return;

    }


    if (loginButton) {

        loginButton.style.display =
            "none";

    }


    if (userHeader) {

        userHeader.style.display =
            "flex";

    }


    if (headerUsername) {

        headerUsername.textContent =
            "👤 " + user.fullname;

    }

}


/* =================================================
   ĐĂNG XUẤT
================================================= */

function logout() {

    localStorage.removeItem(
        STORAGE_CURRENT_USER
    );


    checkLogin();

    alert("Bạn đã đăng xuất.");

}


/* =================================================
   MODAL
================================================= */

function openLoginModal() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


function closeLoginModal() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

}


function openRegisterModal() {

    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


function closeRegisterModal() {

    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

}


/* =================================================
   MESSAGE
================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.className =
        "form-message " + type;

}


/* =================================================
   CHỐNG HTML INJECTION
================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
