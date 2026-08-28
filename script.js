/* =================================================
KHỞI TẠO
================================================= */

document.addEventListener("DOMContentLoaded", () => {

```
loadClassInfo();

renderMembers();

renderSchedule();

renderAnnouncements();

renderRanking();

setupNavigation();

setupAuth();

updateAuthUI();
```

});

/* =================================================
LOCAL STORAGE
================================================= */

const USERS_KEY = "toan1_users";

const CURRENT_USER_KEY = "toan1_current_user";

/* =================================================
LẤY USER
================================================= */

function getUsers() {

```
try {

    const data =
        localStorage.getItem(USERS_KEY);

    return data
        ? JSON.parse(data)
        : [];

} catch (error) {

    console.error(
        "Không thể đọc dữ liệu tài khoản.",
        error
    );

    return [];

}
```

}

/* =================================================
LƯU USER
================================================= */

function saveUsers(users) {

```
localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
);
```

}

/* =================================================
USER HIỆN TẠI
================================================= */

function getCurrentUser() {

```
const username =
    localStorage.getItem(
        CURRENT_USER_KEY
    );

if (!username) {
    return null;
}

const users = getUsers();

return users.find(
    user =>
        user.username === username
) || null;
```

}

/* =================================================
THÔNG TIN LỚP
================================================= */

function loadClassInfo() {

```
const elements = {

    className:
        document.getElementById("className"),

    homeClassName:
        document.getElementById("homeClassName"),

    aboutClassName:
        document.getElementById("aboutClassName"),

    description:
        document.getElementById("homeDescription"),

    goal:
        document.getElementById("goal"),

    unity:
        document.getElementById("unity"),

    memory:
        document.getElementById("memory")

};


if (elements.className)
    elements.className.textContent =
        classInfo.name;

if (elements.homeClassName)
    elements.homeClassName.textContent =
        classInfo.name;

if (elements.aboutClassName)
    elements.aboutClassName.textContent =
        classInfo.name;

if (elements.description)
    elements.description.textContent =
        classInfo.description;

if (elements.goal)
    elements.goal.textContent =
        classInfo.goal;

if (elements.unity)
    elements.unity.textContent =
        classInfo.unity;

if (elements.memory)
    elements.memory.textContent =
        classInfo.memory;
```

}

/* =================================================
NAVIGATION
================================================= */

function setupNavigation() {

```
const buttons =
    document.querySelectorAll(
        ".nav-button"
    );


const pages =
    document.querySelectorAll(
        ".page"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const pageId =
                button.dataset.page;

            pages.forEach(page => {

                page.classList.remove(
                    "active"
                );

            });


            buttons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            const target =
                document.getElementById(
                    pageId
                );


            if (target) {

                target.classList.add(
                    "active"
                );

            }


            button.classList.add(
                "active"
            );

        }
    );

});


document
    .querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const pageId =
                    button.dataset.go;

                showPage(pageId);

            }
        );

    });
```

}

/* =================================================
HIỂN THỊ TRANG
================================================= */

function showPage(pageId) {

```
const target =
    document.getElementById(pageId);

const button =
    document.querySelector(
        `.nav-button[data-page="${pageId}"]`
    );


document
    .querySelectorAll(".page")
    .forEach(page => {

        page.classList.remove("active");

    });


document
    .querySelectorAll(".nav-button")
    .forEach(btn => {

        btn.classList.remove("active");

    });


if (target) {

    target.classList.add("active");

}


if (button) {

    button.classList.add("active");

}
```

}

/* =================================================
THÀNH VIÊN
================================================= */

function renderMembers() {

```
const container =
    document.getElementById(
        "membersList"
    );


if (!container) return;


container.innerHTML = "";


members.forEach((member, index) => {

    const card =
        document.createElement("div");


    card.className = "member";


    card.innerHTML = `

        <div class="avatar">
            👤
        </div>

        <h3>
            ${escapeHTML(member.name)}
        </h3>

        <p>
            ${escapeHTML(member.role)}
        </p>

    `;


    container.appendChild(card);

});
```

}

/* =================================================
THỜI KHÓA BIỂU
================================================= */

function renderSchedule() {

```
const body =
    document.getElementById(
        "scheduleBody"
    );


if (!body) return;


body.innerHTML = "";


schedule.forEach(day => {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            <strong>
                ${escapeHTML(day.day)}
            </strong>
        </td>

        <td>${escapeHTML(day.lessons[0])}</td>
        <td>${escapeHTML(day.lessons[1])}</td>
        <td>${escapeHTML(day.lessons[2])}</td>
        <td>${escapeHTML(day.lessons[3])}</td>
        <td>${escapeHTML(day.lessons[4])}</td>

    `;


    body.appendChild(row);

});
```

}

/* =================================================
THÔNG BÁO
================================================= */

function renderAnnouncements() {

```
const container =
    document.getElementById(
        "announcementList"
    );


if (!container) return;


container.innerHTML = "";


announcements.forEach(item => {

    const announcement =
        document.createElement("div");


    announcement.className =
        "announcement";


    announcement.innerHTML = `

        <small>
            ${escapeHTML(item.date)}
        </small>

        <h3>
            ${escapeHTML(item.title)}
        </h3>

        <p>
            ${escapeHTML(item.content)}
        </p>

    `;


    container.appendChild(
        announcement
    );

});
```

}

/* =================================================
DỮ LIỆU XẾP HẠNG
================================================= */

function getRankingData() {

```
const users = getUsers();


const students = [];


/*
    Thành viên có sẵn
*/

members.forEach(member => {

    students.push({

        name: member.name,

        username: "",

        score:
            Number(member.score) || 0

    });

});


/*
    Tài khoản đăng ký
*/

users.forEach(user => {

    students.push({

        name: user.name,

        username: user.username,

        score:
            Number(user.score) || 0

    });

});


/*
    Xóa học sinh trùng tên
*/

const unique = [];


students.forEach(student => {

    const existing =
        unique.find(
            item =>
                item.name.toLowerCase() ===
                student.name.toLowerCase()
        );


    if (!existing) {

        unique.push(student);

    } else if (student.username) {

        existing.username =
            student.username;

        existing.score =
            student.score;

    }

});


/*
    Sắp xếp điểm giảm dần
*/

unique.sort(
    (a, b) =>
        b.score - a.score
);


return unique;
```

}

/* =================================================
BẢNG XẾP HẠNG
================================================= */

function renderRanking() {

```
const topThree =
    document.getElementById(
        "topThree"
    );


const rankingList =
    document.getElementById(
        "rankingList"
    );


if (!topThree || !rankingList)
    return;


const ranking =
    getRankingData();


topThree.innerHTML = "";

rankingList.innerHTML = "";


/*
    TOP 3
*/

ranking
    .slice(0, 3)
    .forEach((student, index) => {

        const item =
            document.createElement("div");


        item.className =
            `top-student top-${index + 1}`;


        const medals = [
            "🥇",
            "🥈",
            "🥉"
        ];


        item.innerHTML = `

            <div class="rank-medal">
                ${medals[index]}
            </div>

            <div class="rank-avatar">
                👤
            </div>

            <h3>
                ${escapeHTML(student.name)}
            </h3>

            <strong>
                ${student.score} điểm
            </strong>

        `;


        topThree.appendChild(item);

    });


/*
    HẠNG 4 TRỞ ĐI
*/

ranking
    .slice(3)
    .forEach((student, index) => {

        const rank =
            index + 4;


        const row =
            document.createElement("div");


        row.className =
            "ranking-row";


        row.innerHTML = `

            <div class="ranking-number">
                ${rank}
            </div>

            <div class="ranking-avatar">
                👤
            </div>

            <div class="ranking-name">

                <strong>
                    ${escapeHTML(student.name)}
                </strong>

                ${
                    student.username
                    ?
                    `<small>
                        @${escapeHTML(student.username)}
                    </small>`
                    :
                    ""
                }

            </div>

            <div class="ranking-score">
                ${student.score}
            </div>

        `;


        rankingList.appendChild(row);

    });


if (ranking.length === 0) {

    rankingList.innerHTML = `

        <div class="empty-ranking">
            Chưa có dữ liệu xếp hạng.
        </div>

    `;

}
```

}

/* =================================================
AUTH
================================================= */

function setupAuth() {

```
const loginButton =
    document.getElementById(
        "loginButton"
    );


const registerButton =
    document.getElementById(
        "registerButton"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const profileButton =
    document.getElementById(
        "profileButton"
    );


if (loginButton) {

    loginButton.addEventListener(
        "click",
        () => openModal("loginModal")
    );

}


if (registerButton) {

    registerButton.addEventListener(
        "click",
        () => openModal("registerModal")
    );

}


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );

}


if (profileButton) {

    profileButton.addEventListener(
        "click",
        () => {

            updateProfile();

            showPage("profile");

        }
    );

}


/*
    Chuyển đăng nhập -> đăng ký
*/

document
    .getElementById("switchToRegister")
    ?.addEventListener(
        "click",
        () => {

            closeModal("loginModal");

            clearMessages();

            openModal("registerModal");

        }
    );


/*
    Chuyển đăng ký -> đăng nhập
*/

document
    .getElementById("switchToLogin")
    ?.addEventListener(
        "click",
        () => {

            closeModal("registerModal");

            clearMessages();

            openModal("loginModal");

        }
    );


/*
    Đóng modal
*/

document
    .querySelectorAll(".close-modal")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    button.dataset.close
                );

            }
        );

    });


/*
    Click ra ngoài modal
*/

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


/*
    Form đăng ký
*/

document
    .getElementById("registerForm")
    ?.addEventListener(
        "submit",
        handleRegister
    );


/*
    Form đăng nhập
*/

document
    .getElementById("loginForm")
    ?.addEventListener(
        "submit",
        handleLogin
    );
```

}

/* =================================================
ĐĂNG KÝ
================================================= */

function handleRegister(event) {

```
event.preventDefault();


const name =
    document
        .getElementById(
            "registerName"
        )
        .value
        .trim();


const username =
    document
        .getElementById(
            "registerUsername"
        )
        .value
        .trim()
        .toLowerCase();


const password =
    document
        .getElementById(
            "registerPassword"
        )
        .value;


const confirmPassword =
    document
        .getElementById(
            "registerPasswordConfirm"
        )
        .value;


const message =
    document.getElementById(
        "registerMessage"
    );


/*
    Kiểm tra tên
*/

if (name.length < 2) {

    showMessage(
        message,
        "Vui lòng nhập họ và tên.",
        "error"
    );

    return;

}


/*
    Kiểm tra username
*/

if (
    username.length < 3 ||
    !/^[a-zA-Z0-9_]+$/.test(username)
) {

    showMessage(
        message,
        "Tên đăng nhập phải có ít nhất 3 ký tự và chỉ gồm chữ, số hoặc dấu gạch dưới.",
        "error"
    );

    return;

}


/*
    Kiểm tra password
*/

if (password.length < 4) {

    showMessage(
        message,
        "Mật khẩu phải có ít nhất 4 ký tự.",
        "error"
    );

    return;

}


/*
    Kiểm tra password lần 2
*/

if (password !== confirmPassword) {

    showMessage(
        message,
        "Mật khẩu nhập lại không khớp.",
        "error"
    );

    return;

}


const users =
    getUsers();


/*
    Kiểm tra username tồn tại
*/

const exists =
    users.some(
        user =>
            user.username === username
    );


if (exists) {

    showMessage(
        message,
        "Tên đăng nhập này đã tồn tại.",
        "error"
    );

    return;

}


/*
    Tạo tài khoản
*/

const newUser = {

    id: Date.now(),

    name: name,

    username: username,

    password: password,

    score: 0,

    createdAt:
        new Date().toISOString()

};


users.push(newUser);


saveUsers(users);


/*
    Thông báo thành công
*/

showMessage(
    message,
    "🎉 Đăng ký thành công!",
    "success"
);


document
    .getElementById("registerForm")
    .reset();


setTimeout(() => {

    closeModal("registerModal");

    openModal("loginModal");

}, 900);
```

}

/* =================================================
ĐĂNG NHẬP
================================================= */

function handleLogin(event) {

```
event.preventDefault();


const username =
    document
        .getElementById(
            "loginUsername"
        )
        .value
        .trim()
        .toLowerCase();


const password =
    document
        .getElementById(
            "loginPassword"
        )
        .value;


const message =
    document.getElementById(
        "loginMessage"
    );


const users =
    getUsers();


const user =
    users.find(
        item =>
            item.username === username &&
            item.password === password
    );


if (!user) {

    showMessage(
        message,
        "❌ Tên đăng nhập hoặc mật khẩu không đúng.",
        "error"
    );

    return;

}


/*
    Lưu người đang đăng nhập
*/

localStorage.setItem(
    CURRENT_USER_KEY,
    user.username
);


showMessage(
    message,
    "✅ Đăng nhập thành công!",
    "success"
);


document
    .getElementById("loginForm")
    .reset();


setTimeout(() => {

    closeModal("loginModal");

    updateAuthUI();

    renderRanking();

    updateProfile();

    showPage("profile");

}, 700);
```

}

/* =================================================
ĐĂNG XUẤT
================================================= */

function logout() {

```
localStorage.removeItem(
    CURRENT_USER_KEY
);


updateAuthUI();

showPage("home");
```

}

/* =================================================
CẬP NHẬT GIAO DIỆN USER
================================================= */

function updateAuthUI() {

```
const guestArea =
    document.getElementById(
        "guestArea"
    );


const userArea =
    document.getElementById(
        "userArea"
    );


const userNameDisplay =
    document.getElementById(
        "userNameDisplay"
    );


const user =
    getCurrentUser();


if (user) {

    if (guestArea)
        guestArea.style.display =
            "none";


    if (userArea)
        userArea.style.display =
            "flex";


    if (userNameDisplay)
        userNameDisplay.textContent =
            user.name;


    updateProfile();

} else {

    if (guestArea)
        guestArea.style.display =
            "flex";


    if (userArea)
        userArea.style.display =
            "none";

}
```

}

/* =================================================
HỒ SƠ
================================================= */

function updateProfile() {

```
const user =
    getCurrentUser();


if (!user) return;


const profileName =
    document.getElementById(
        "profileName"
    );


const profileUsername =
    document.getElementById(
        "profileUsername"
    );


const profileScore =
    document.getElementById(
        "profileScore"
    );


const profileRank =
    document.getElementById(
        "profileRank"
    );


if (profileName)
    profileName.textContent =
        user.name;


if (profileUsername)
    profileUsername.textContent =
        `@${user.username}`;


if (profileScore)
    profileScore.textContent =
        user.score;


const ranking =
    getRankingData();


const rank =
    ranking.findIndex(
        student =>
            student.username ===
            user.username
    );


if (profileRank) {

    profileRank.textContent =
        rank >= 0
        ? `#${rank + 1}`
        : "-";

}
```

}

/* =================================================
MODAL
================================================= */

function openModal(id) {

```
const modal =
    document.getElementById(id);


if (!modal) return;


modal.classList.add("show");
```

}

function closeModal(id) {

```
const modal =
    document.getElementById(id);


if (!modal) return;


modal.classList.remove("show");
```

}

/* =================================================
MESSAGE
================================================= */

function showMessage(
element,
text,
type
) {

```
if (!element) return;


element.textContent =
    text;


element.className =
    `form-message ${type}`;
```

}

function clearMessages() {

```
document
    .querySelectorAll(".form-message")
    .forEach(element => {

        element.textContent = "";

        element.className =
            "form-message";

    });
```

}

/* =================================================
ESCAPE HTML
================================================= */

function escapeHTML(value) {

```
return String(value)

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );
```

}
