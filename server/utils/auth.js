export const authenticate = (credentials, strategy) => {
    switch (strategy) {
        case 'password':
            let { user, password } = credentials;
            return ((typeof user !== 'undefined') && (password === user.password));
        default:
    }
};
