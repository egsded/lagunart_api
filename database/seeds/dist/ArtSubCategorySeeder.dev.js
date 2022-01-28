'use strict';
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Factory = use('Factory');
var db = use('Database');

var ArtSubCategorySeeder =
/*#__PURE__*/
function () {
  function ArtSubCategorySeeder() {
    _classCallCheck(this, ArtSubCategorySeeder);
  }

  _createClass(ArtSubCategorySeeder, null, [{
    key: "run",
    value: function run() {
      return regeneratorRuntime.async(function run$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(db.table('art_subcategories').insert([{
                'subcategory': 'Dibujo',
                'art_categories_id': 1
              }, {
                'subcategory': 'Fotografía',
                'art_categories_id': 1
              }, {
                'subcategory': 'Escultura',
                'art_categories_id': 1
              }, {
                'subcategory': 'Grabado',
                'art_categories_id': 1
              }, {
                'subcategory': 'Pintura',
                'art_categories_id': 1
              }, {
                'subcategory': 'Diseño Gráfico',
                'art_categories_id': 1
              }, {
                'subcategory': 'Cuentos',
                'art_categories_id': 2
              }, {
                'subcategory': 'Historias',
                'art_categories_id': 2
              }, {
                'subcategory': 'Letras musicales',
                'art_categories_id': 2
              }, {
                'subcategory': 'Poesía',
                'art_categories_id': 2
              }, {
                'subcategory': 'Versos',
                'art_categories_id': 2
              }]));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return ArtSubCategorySeeder;
}();

module.exports = ArtSubCategorySeeder;