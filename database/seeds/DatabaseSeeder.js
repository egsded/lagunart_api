'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const ArtCategorySeeder = use('./ArtCategorySeeder')
const ArtSubCategorySeeder = use('./ArtSubCategorySeeder')
class DatabaseSeeder {
  async run() {
    await ArtCategorySeeder.run();
    await ArtSubCategorySeeder.run();
  }
}

module.exports = DatabaseSeeder
