'use strict'

/*
|--------------------------------------------------------------------------
| ArtSubCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const db = use('Database')
class ArtSubCategorySeeder {
  static async run() {
    await db.table('art_subcategories').insert([{
        'subcategory': 'Dibujo',
        'art_categories_id': 1
      },
      {
        'subcategory': 'Fotografía',
        'art_categories_id': 1
      },
      {
        'subcategory': 'Escultura',
        'art_categories_id': 1
      },
      {
        'subcategory': 'Grabado',
        'art_categories_id': 1
      },
      {
        'subcategory': 'Pintura',
        'art_categories_id': 1
      },
      {
        'subcategory': 'Diseño Gráfico',
        'art_categories_id': 1
      },
      {
        'subcategory': 'Cuentos',
        'art_categories_id': 2
      },
      {
        'subcategory': 'Historias',
        'art_categories_id': 2
      },
      {
        'subcategory': 'Letras musicales',
        'art_categories_id': 2
      },
      {
        'subcategory': 'Poesía',
        'art_categories_id': 2
      },
      {
        'subcategory': 'Versos',
        'art_categories_id': 2
      }
    ])
  }
}

module.exports = ArtSubCategorySeeder
