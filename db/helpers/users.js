const db = require('../db.js');

module.exports = {
    createUser,
    getUserInfo,
    updateUserDetails
}

function createUser(newUser) {
    return db('users')
        .insert(newUser)
        .returning('id')
        .then(ids => ids[0]);
}

function getUserInfo(uid) {
    const query = db
        .select([
            'users.first_name',
            'users.last_name',
            'users.email',
            'users.full_address',
            'users.image_id',
            'images.url as image_url'
        ])
        .from('users')
        .innerJoin('images', 'users.image_id', 'images.id')
        .where('users.uid', uid);

        return query
            .then(users => {
                return users[0];
            });
}

function updateUserDetails(uid, user) {
    return db('users')
            .where('uid', uid)
            .update(user);
}