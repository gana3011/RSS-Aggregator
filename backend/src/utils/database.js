import pg from 'pg';
const {Pool} = pg;

export const pool = new Pool({
    user: 'postgres',
    password: 'imntr8ay',
    host: 'localhost',
    port: 5432,
    database: 'yt_rss_agg'
});

