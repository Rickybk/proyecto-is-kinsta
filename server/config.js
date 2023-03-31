const { config } = require("dotenv");
config()

module.exports = {
    db: {
        user: 'dbuser',
        password: 'dbpassword',
        host: 'dbstore-gf2ir-postgresql.external.kinsta.app',
        port: 30825,
        database: 'dbstore',
    }
}