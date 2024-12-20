import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.proprietario, table => {
      table.bigIncrements('id').primary().index(); // BIGINT UNSIGNED AUTO_INCREMENT
      table.string('nomeCompleto').index().notNullable();
      table.string('cpf', 11).notNullable();  
      table.string('telefone', 15);           
      table.string('email', 50);
      table.string('cidade', 50);

      table
        .bigInteger('petId')
        .unsigned() // Adicionando UNSIGNED para compatibilidade
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.pet)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar os proprietarios no sistema.');
    }).then(() => {
      console.log(`# Created Table ${ETableNames.proprietario}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.proprietario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.proprietario}`);
    // eslint-disable-next-line linebreak-style
    });
}
