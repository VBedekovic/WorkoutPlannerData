import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'workoutPlanner',
    password: 'bazepodataka',
    port: 5432
})

export = pool
