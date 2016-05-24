export default {
    waterline: {
        connections: {
            mongo: {
                database: 'development-db',
            },
        },
    },
    auth: {
        cookie: {
            domain: 'localhost',
        },
    },
};
