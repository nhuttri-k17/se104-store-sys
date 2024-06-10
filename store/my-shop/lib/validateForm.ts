export const validateEmail = (email: string | undefined | null) => {
    if (!email || email === "") return "Không được để trống email";

    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!re.test(email)) {
        return "Email không hợp lệ";
    }
    return "";
};

export const validatePassword = (password: string | undefined | null) => {
    if (!password || password === "") return "Không được để trống mật khẩu";

    if (password.length < 6) {
        return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return "";
};

export const validateName = (name: string | undefined | null) => {
    if (!name || name === "") return "Không được để trống tên";

    if (name.length < 3) {
        return "Tên phải có ít nhất 3 ký tự";
    }

    return "";
};

export const validatePhoneNumber = (phone: string | undefined | null) => {
    if (!phone || phone === "") return "Không được để trống số điện thoại";

    if (phone.length !== 10) {
        return "Số điện thoại phải có 10 số";
    }

    const re = /^[0-9]{10}$/;

    if (!re.test(phone)) {
        return "Số điện thoại không hợp lệ";
    }
    return "";
};
