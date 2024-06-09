export const isTiepThi = (role: string | undefined | null) => {
    return role === "tiepthi" || isAdmin(role);
};

export const isQuanLy = (role: string | undefined | null) => {
    return role === "quanly" || isAdmin(role);
};

export const isBanHang = (role: string | undefined | null) => {
    return role === "banhang" || isAdmin(role);
};

export const isKyThuat = (role: string | undefined | null) => {
    return role === "kythuat" || isAdmin(role);
};

export const isAdmin = (role: string | undefined | null) => {
    return role === "admin";
};
