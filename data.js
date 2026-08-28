/* =================================================
   THÔNG TIN LỚP
   ⭐ CHỈNH THÔNG TIN WEBSITE Ở FILE NÀY
================================================= */


const classInfo = {

    // Tên lớp
    name: "10 TOÁN 1",

    // Mô tả trang chủ
    description:
        "Nơi chúng ta cùng học tập, chia sẻ và lưu giữ những kỷ niệm.",

    // Thông tin phần "Về lớp"
    goal:
        "Cùng nhau học tập, phát triển và đạt được những mục tiêu của lớp.",

    unity:
        "Mỗi thành viên đều góp phần tạo nên một tập thể đoàn kết và vững mạnh.",

    memory:
        "Cùng nhau lưu giữ những khoảnh khắc đáng nhớ của tuổi học trò."
};


/* =================================================
   DANH SÁCH THÀNH VIÊN
================================================= */

const members = [

    {
        name: "Lê Ngọc Xuân Ngà",
        role: "Học sinh",
        avatar: "👩‍🎓"
    },

    {
        name: "Nguyễn Duy Khoa",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Minh Duy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Hồ Ngọc Hải",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Chương Thiết Minh",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Trần Hoàng Bảo Duy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Phạm Lê Duy Hưng",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Văn Đức Huy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Hữu Phúc",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Trần Minh Huy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Quốc Bảo Nam",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Nam Anh",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Phạm Lê Hải Bằng",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Vũ Lê Anh Đức",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Trần Bảo Huy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Phan Huy Khánh",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Vũ Tuấn Minh",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Lê Minh Nhật",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Phạm Gia Phúc",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Đoàn Minh Quân",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Lê Trần Khánh Hưng",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Phạm Nhật Huy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Bùi Minh Phú",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Phi Bình",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Tấn Minh",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Võ Gia Bảo",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Phan Thị Minh Hằng",
        role: "Học sinh",
        avatar: "👩‍🎓"
    },

    {
        name: "Phạm Bá Nhật Khánh",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Hoàng Lan",
        role: "Học sinh",
        avatar: "👩‍🎓"
    },

    {
        name: "Nguyễn Huy Minh Quân",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Trần Thục Linh",
        role: "Học sinh",
        avatar: "👩‍🎓"
    },

    {
        name: "Đỗ Đăng Khoa",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Minh Tuấn",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Mạnh Tùng",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Bạch Ngọc Bảo Duy",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Bùi Quang Dũng",
        role: "Học sinh",
        avatar: "👨‍🎓"
    },

    {
        name: "Nguyễn Trà Giang",
        role: "Học sinh",
        avatar: "👩‍🎓"
    }

];


/* =================================================
   THỜI KHÓA BIỂU
================================================= */

const schedule = [

    {
        day: "Thứ 2",

        subjects: [
            "Toán",
            "Văn",
            "Anh",
            "Lý",
            "Hóa"
        ]
    },

    {
        day: "Thứ 3",

        subjects: [
            "Anh",
            "Toán",
            "Hóa",
            "Văn",
            "Sinh"
        ]
    },

    {
        day: "Thứ 4",

        subjects: [
            "Lý",
            "Toán",
            "Anh",
            "Văn",
            "Tin"
        ]
    },

    {
        day: "Thứ 5",

        subjects: [
            "Toán",
            "Hóa",
            "Văn",
            "Anh",
            "Sinh"
        ]
    },

    {
        day: "Thứ 6",

        subjects: [
            "Văn",
            "Toán",
            "Lý",
            "Anh",
            "Hóa"
        ]
    }

];


/* =================================================
   THÔNG BÁO
================================================= */

const announcements = [

    {
        title: "🎉 Chào mừng đến với website lớp",

        content:
            "Website chính thức của 10 Toán 1 đã được xây dựng."
    },

    {
        title: "📚 Thông báo học tập",

        content:
            "Những thông báo mới về học tập sẽ được cập nhật tại đây."
    }

];
