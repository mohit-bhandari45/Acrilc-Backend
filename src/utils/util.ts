export const ENV = {
    get jwt_secret() {
        return process.env["JWT_SECRET"]! || "jwt_secret";
    },
};
