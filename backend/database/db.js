const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "community_guard",
  password: "Walalawasala1!",
  port: 3306, // Default MySQL port
  waitForConnections: true, // Wait for available connection if the pool is full
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // No limit on the connection queue
});

const getClient = () => {
  return connection;
};

module.exports = { getClient };
