
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('RentalStatus', table => {
            table.increments('RentalStatusID').primary();
            table.string('Status')
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('RentalStatus')
    ])
};
