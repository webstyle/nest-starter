import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('bio');
            table.string('salt').notNullable();
            table.timestamps();
        }),
        knex.schema.createTable('tokens', function (table) {
            table.integer('user_id').unsigned().notNullable();
            table.string('access_token').notNullable();
            table.string('refresh_token');
            table.datetime('expire_time').notNullable()
            table.timestamps();
            table.foreign('user_id').references('id').inTable('users');
        }),
        knex.schema.createTable('posts', function (table) {
            table.integer('author').unsigned().notNullable();
            table.string('title', 300);
            table.text('content');
            table.timestamps();
            table.foreign('author').references('id').inTable('users');
        })
    ]) 
}


export async function down(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('tokens'),
        knex.schema.dropTable('posts'),
    ])
}
