export default () => ({
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    }
});
