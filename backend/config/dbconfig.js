export const host = 'localhost';
export const user = 'root';
export const password = 'localhost@123';
export const database = 'pbs_accounting_system';
export const dialect = 'mysql';
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};