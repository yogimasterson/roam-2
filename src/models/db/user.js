const db = require('./db')
const bcrypt = require('bcrypt')
const saltRounds = 10

// create user

const create = (username, password) => {
    bcrypt.hash(password, saltRounds).then((hash) => {
        return db.query(`
        INSERT INTO users
        (username, encrypted_password)
        VALUES
        (lower($1::text), $2::text)
        RETURNING
        *
        `,
        [
            username,
            hash
        ])
        .catch(error => {
            console.error({
                message: 'Error occurred while executing users.create',
                arguments: arguments
            })
            throw error
        })
    })
}

// find user by id

const findUserById = (id) => {
    return db.query(`
    SELECT *
    FROM users
    `)
}

// const findUserById = (username, password) => {
//     return db.query(`
//     SELECT
//     `)
// }

// get user name

// update username 

// update user image 

// update user city

// delete user