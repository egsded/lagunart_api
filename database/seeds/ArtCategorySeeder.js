'use strict'

/*
|--------------------------------------------------------------------------
| ArtCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const db = use('Database')

class ArtCategorySeeder {
  static async run() {
    await db.table('art_categories').insert([{
        'category': 'Artes Visuales'
      },
      {
        'category': 'Literatura'
      }
    ])
  }
}

module.exports = ArtCategorySeeder
