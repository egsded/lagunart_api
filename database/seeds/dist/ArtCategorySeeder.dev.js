'use strict';
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Factory = use('Factory');
var db = use('Database');

var ArtCategorySeeder =
/*#__PURE__*/
function () {
  function ArtCategorySeeder() {
    _classCallCheck(this, ArtCategorySeeder);
  }

  _createClass(ArtCategorySeeder, null, [{
    key: "run",
    value: function run() {
      return regeneratorRuntime.async(function run$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(db.table('art_categories').insert([{
                'category': 'Artes Visuales'
              }, {
                'category': 'Literatura'
              }]));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return ArtCategorySeeder;
}();

module.exports = ArtCategorySeeder;