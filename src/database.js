const mysql = require('mysql');
const {promisify} = require('util'); //Para poder usar promesas

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has to many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection){
        connection.release();
        console.log('DB is connect');
        return;
    }
});
//Convirtiendo en promesas lo que eran callbacks
pool.query = promisify(pool.query)

module.exports = pool;