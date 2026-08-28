/* =================================================
   DỮ LIỆU WEBSITE 10 TOÁN 1
================================================= */


/* ================= THÔNG TIN LỚP ================= */

const classInfo = {

    name: "10 TOÁN 1",

    description:
        "Nơi chúng ta cùng học tập, chia sẻ và lưu giữ những kỷ niệm.",

    goal:
        "Cùng nhau học tập, tiến bộ và đạt được những mục tiêu đã đề ra.",

    unity:
        "Cùng nhau xây dựng một tập thể đoàn kết, vui vẻ và vững mạnh.",

    memory:
        "Lưu giữ những khoảnh khắc đáng nhớ của tuổi học trò."

};


/* ================= THÀNH VIÊN ================= */

const members = [

    {
        id: 1,
        name: "Lê Ngọc Xuân Ngà",
        username: "lengocxuanna",
        role: "Học sinh",
        score: 95
    },

    {
        id: 2,
        name: "Nguyễn Duy Khoa",
        username: "nguyenduykhoa",
        role: "Học sinh",
        score: 92
    },

    {
        id: 3,
        name: "Nguyễn Minh Duy",
        username: "nguyenminhduy",
        role: "Học sinh",
        score: 89
    },

    {
        id: 4,
        name: "Hồ Ngọc Hải",
        username: "hongochai",
        role: "Học sinh",
        score: 87
    },

    {
        id: 5,
        name: "Chương Thiết Minh",
        username: "chuongthietminh",
        role: "Học sinh",
        score: 84
    },

    {
        id: 6,
        name: "Trần Hoàng Bảo Duy",
        username: "tranhoangbaoduy",
        role: "Học sinh",
        score: 81
    },

    {
        id: 7,
        name: "Phạm Lê Duy Hưng",
        username: "phamleduyhung",
        role: "Học sinh",
        score: 96
    },

    {
        id: 8,
        name: "Nguyễn Văn Đức Huy",
        username: "nguyenvanduchuy",
        role: "Học sinh",
        score: 90
    },

    {
        id: 9,
        name: "Nguyễn Hữu Phúc",
        username: "nguyenhuuphuc",
        role: "Học sinh",
        score: 88
    },

    {
        id: 10,
        name: "Trần Minh Huy",
        username: "tranminhhuy",
        role: "Học sinh",
        score: 93
    },

    {
        id: 11,
        name: "Nguyễn Quốc Bảo Nam",
        username: "nguyenquocbaonam",
        role: "Học sinh",
        score: 85
    },

    {
        id: 12,
        name: "Nguyễn Nam Anh",
        username: "nguyenamanh",
        role: "Học sinh",
        score: 91
    },

    {
        id: 13,
        name: "Phạm Lê Hải Bằng",
        username: "phamlehaibang",
        role: "Học sinh",
        score: 86
    },

    {
        id: 14,
        name: "Vũ Lê Anh Đức",
        username: "vuleanhduc",
        role: "Học sinh",
        score: 94
    },

    {
        id: 15,
        name: "Trần Bảo Huy",
        username: "tranbaohuy",
        role: "Học sinh",
        score: 82
    },

    {
        id: 16,
        name: "Phan Huy Khánh",
        username: "phanhuykhanh",
        role: "Học sinh",
        score: 89
    },

    {
        id: 17,
        name: "Vũ Tuấn Minh",
        username: "vutuanminh",
        role: "Học sinh",
        score: 97
    },

    {
        id: 18,
        name: "Nguyễn Lê Minh Nhật",
        username: "nguyenleminhnhat",
        role: "Học sinh",
        score: 90
    },

    {
        id: 19,
        name: "Phạm Gia Phúc",
        username: "phamgiaphuc",
        role: "Học sinh",
        score: 83
    },

    {
        id: 20,
        name: "Đoàn Minh Quân",
        username: "doanminhquan",
        role: "Học sinh",
        score: 92
    },

    {
        id: 21,
        name: "Lê Trần Khánh Hưng",
        username: "letrankhanhhung",
        role: "Học sinh",
        score: 88
    },

    {
        id: 22,
        name: "Phạm Nhật Huy",
        username: "phamnhathuy",
        role: "Học sinh",
        score: 95
    },

    {
        id: 23,
        name: "Bùi Minh Phú",
        username: "buiminhphu",
        role: "Học sinh",
        score: 80
    },

    {
        id: 24,
        name: "Nguyễn Phi Bình",
        username: "nguyenphibinh",
        role: "Học sinh",
        score: 87
    },

    {
        id: 25,
        name: "Nguyễn Tấn Minh",
        username: "nguyentanminh",
        role: "Học sinh",
        score: 91
    },

    {
        id: 26,
        name: "Võ Gia Bảo",
        username: "vogiabao",
        role: "Học sinh",
        score: 84
    },

    {
        id: 27,
        name: "Phan Thị Minh Hằng",
        username: "phanthiminhhang",
        role: "Học sinh",
        score: 96
    },

    {
        id: 28,
        name: "Phạm Bá Nhật Khánh",
        username: "phambanhatkhanh",
        role: "Học sinh",
        score: 86
    },

    {
        id: 29,
        name: "Nguyễn Hoàng Lan",
        username: "nguyenhoanglan",
        role: "Học sinh",
        score: 93
    },

    {
        id: 30,
        name: "Nguyễn Huy Minh Quân",
        username: "nguyenhuyminhquan",
        role: "Học sinh",
        score: 89
    },

    {
        id: 31,
        name: "Trần Thục Linh",
        username: "tranthuclinh",
        role: "Học sinh",
        score: 97
    },

    {
        id: 32,
        name: "Đỗ Đăng Khoa",
        username: "dodangkhoa",
        role: "Học sinh",
        score: 82
    },

    {
        id: 33,
        name: "Nguyễn Minh Tuấn",
        username: "nguyenminhtuan",
        role: "Học sinh",
        score: 90
    },

    {
        id: 34,
        name: "Nguyễn Mạnh Tùng",
        username: "nguyenmanhtung",
        role: "Học sinh",
        score: 85
    },

    {
        id: 35,
        name: "Bạch Ngọc Bảo Duy",
        username: "bachngocbaoduy",
        role: "Học sinh",
        score: 94
    },

    {
        id: 36,
        name: "Bùi Quang Dũng",
        username: "buiquangdung",
        role: "Học sinh",
        score: 88
    },

    {
        id: 37,
        name: "Nguyễn Trà Giang",
        username: "nguyentragiang",
        role: "Học sinh",
        score: 91
    }

];


/* ================= THỜI KHÓA BIỂU ================= */

const schedule = [

    {
        day: "Thứ 2",
        lessons: [
            "Toán",
            "Ngữ văn",
            "Tiếng Anh",
            "Vật lý",
            "Sinh học"
        ]
    },

    {
        day: "Thứ 3",
        lessons: [
            "Ngữ văn",
            "Toán",
            "Hóa học",
            "Tiếng Anh",
            "Tin học"
        ]
    },

    {
        day: "Thứ 4",
        lessons: [
            "Toán",
            "Vật lý",
            "Ngữ văn",
            "Lịch sử",
            "Địa lý"
        ]
    },

    {
        day: "Thứ 5",
        lessons: [
            "Tiếng Anh",
            "Toán",
            "Tin học",
            "Hóa học",
            "GDCD"
        ]
    },

    {
        day: "Thứ 6",
        lessons: [
            "Toán",
            "Ngữ văn",
            "Tiếng Anh",
            "Thể dục",
            "Sinh hoạt"
        ]
    }

];


/* ================= THÔNG BÁO ================= */

const announcements = [

    {
        title: "Chào mừng đến với website lớp",
        content:
            "Website lớp 10 TOÁN 1 đã được xây dựng để hỗ trợ việc học tập và lưu giữ những hoạt động của lớp.",
        date: "28/08/2026"
    },

    {
        title: "Đăng ký tài khoản học sinh",
        content:
            "Các thành viên có thể đăng ký tài khoản để sử dụng các tính năng dành cho học sinh.",
        date: "28/08/2026"
    },

    {
        title: "Bảng xếp hạng",
        content:
            "Thành tích của các thành viên sẽ được hiển thị trên bảng xếp hạng.",
        date: "28/08/2026"
    }

];
