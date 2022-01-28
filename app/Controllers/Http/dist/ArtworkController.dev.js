'use strict';

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Artwork = use('App/Models/Artwork');
var Category = use('App/Models/ArtCategory');
var Subcategory = use('App/Models/ArtSubcategory');
var User = use('App/Models/User');
var Comment = use('App/Models/Comment');
var Chapter = use('App/Models/Chapter');
var Tags = use('App/Models/Tag');
var Database = use('Database');
var Drive = use('Drive');
var Helpers = use('Helpers');

var _use = use('Validator'),
    validate = _use.validate;

var ArtworkController =
/*#__PURE__*/
function () {
  function ArtworkController() {
    _classCallCheck(this, ArtworkController);
  }

  _createClass(ArtworkController, [{
    key: "index",
    value: function index(_ref) {
      var request, _request$all, category_id, subcategory_id, notIn, query, artworks, index, art, imgPath, file, base64;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request;
              _request$all = request.all(), category_id = _request$all.category_id, subcategory_id = _request$all.subcategory_id, notIn = _request$all.notIn;
              query = Artwork.queryArt();

              if (category_id) {
                // filter by category
                query.where('art_categories.id', category_id);
              }

              if (subcategory_id) {
                // filter by sub-category
                query.where('art_subcategories.id', subcategory_id);
              }

              if (notIn && notIn.length > 0) {
                // Get more art
                query.whereNotIn('artworks.id', notIn);
              }

              _context.next = 8;
              return regeneratorRuntime.awrap(query.limit(10).fetch());

            case 8:
              artworks = _context.sent;
              artworks = artworks.rows;
              index = 0;

            case 11:
              if (!(index < artworks.length)) {
                _context.next = 22;
                break;
              }

              art = artworks[index];
              imgPath = art.path_img;
              _context.next = 16;
              return regeneratorRuntime.awrap(Drive.get(imgPath));

            case 16:
              file = _context.sent;
              base64 = Buffer.from(file).toString('base64');
              artworks[index].path_img = base64;

            case 19:
              index++;
              _context.next = 11;
              break;

            case 22:
              return _context.abrupt("return", artworks);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "store",
    value: function store(_ref2) {
      var auth, request, response, user, _request$all2, title, description, categories, art_subcategory_id, is_adult_content, is_private, artwork;

      return regeneratorRuntime.async(function store$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              auth = _ref2.auth, request = _ref2.request, response = _ref2.response;
              _context2.next = 3;
              return regeneratorRuntime.awrap(auth.getUser());

            case 3:
              user = _context2.sent;
              _request$all2 = request.all(), title = _request$all2.title, description = _request$all2.description, categories = _request$all2.categories, art_subcategory_id = _request$all2.art_subcategory_id, is_adult_content = _request$all2.is_adult_content, is_private = _request$all2.is_private;
              artwork = new Artwork();
              artwork.title = title;
              artwork.description = description;
              artwork.art_subcategory_id = art_subcategory_id;
              artwork.is_adult_content = is_adult_content;
              artwork.user_id = user.id;
              artwork.is_private = is_private;
              _context2.next = 14;
              return regeneratorRuntime.awrap(artwork.save());

            case 14:
              return _context2.abrupt("return", response.json(artwork));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "showInfoToEdit",
    value: function showInfoToEdit(_ref3) {
      var auth, user, findUser, artworks;
      return regeneratorRuntime.async(function showInfoToEdit$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              auth = _ref3.auth;
              _context3.next = 3;
              return regeneratorRuntime.awrap(auth.getUser());

            case 3:
              user = _context3.sent;
              _context3.next = 6;
              return regeneratorRuntime.awrap(User.find(user.id));

            case 6:
              findUser = _context3.sent;
              _context3.next = 9;
              return regeneratorRuntime.awrap(findUser.artworks().last());

            case 9:
              artworks = _context3.sent;
              return _context3.abrupt("return", {
                artworks: artworks
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update(_ref4) {
      var request, respuesta, artwork_id, artwork, _request$all3, title, description, art_subcategory_id, coverImg, name, path, _request$all4, title_chapter, content, name2, chapter_artwork, tags, tag_id, index, data, tag;

      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              request = _ref4.request;
              _context4.prev = 1;
              respuesta = request.body.form;
              artwork_id = respuesta.artwork_id;
              _context4.next = 6;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id));

            case 6:
              artwork = _context4.sent;
              _request$all3 = request.all(), title = _request$all3.title, description = _request$all3.description, art_subcategory_id = _request$all3.art_subcategory_id;
              coverImg = respuesta.path_img;
              name = 'artwork' + Math.random() + '.' + respuesta.extension;
              _context4.next = 12;
              return regeneratorRuntime.awrap(Drive.put('artwork/' + name, Buffer.from(coverImg, 'base64')));

            case 12:
              path = 'artwork/' + name;
              _context4.next = 15;
              return regeneratorRuntime.awrap(Drive.get(path));

            case 15:
              artwork.title = title;
              artwork.description = description;
              artwork.path_img = path;
              artwork.extension = respuesta.extension;
              _context4.next = 21;
              return regeneratorRuntime.awrap(artwork.save());

            case 21:
              //ADD CHAPTER TO ARTWORK
              _request$all4 = request.all(), title_chapter = _request$all4.title_chapter, content = _request$all4.content, name2 = _request$all4.name2;
              chapter_artwork = new Chapter();

              if (!(artwork.art_subcategory_id == 7 || artwork.art_subcategory_id == 8 || artwork.art_subcategory_id == 9 || artwork.art_subcategory_id == 10 || artwork.art_subcategory_id == 11)) {
                _context4.next = 29;
                break;
              }

              chapter_artwork.tittle = title_chapter;
              chapter_artwork.content = respuesta.content;
              chapter_artwork.artwork_id = artwork_id;
              _context4.next = 29;
              return regeneratorRuntime.awrap(chapter_artwork.save());

            case 29:
              //ADD TAGS TO ARTWORK
              tags = request.body.tags;
              tag_id = {};
              index = 0;

            case 32:
              if (!(index < tags.length)) {
                _context4.next = 49;
                break;
              }

              _context4.next = 35;
              return regeneratorRuntime.awrap(Tags.findBy('name', tags[index]));

            case 35:
              data = _context4.sent;

              if (data) {
                _context4.next = 41;
                break;
              }

              tag = new Tags();
              tag.name = tags[index];
              _context4.next = 41;
              return regeneratorRuntime.awrap(tag.save());

            case 41:
              _context4.next = 43;
              return regeneratorRuntime.awrap(Tags.findBy('name', tags[index]));

            case 43:
              tag_id = _context4.sent;
              _context4.next = 46;
              return regeneratorRuntime.awrap(artwork.tags().save(tag_id));

            case 46:
              index++;
              _context4.next = 32;
              break;

            case 49:
              return _context4.abrupt("return", {
                artwork: artwork,
                chapter_artwork: chapter_artwork
              });

            case 52:
              _context4.prev = 52;
              _context4.t0 = _context4["catch"](1);
              console.log(_context4.t0);

            case 55:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[1, 52]]);
    }
  }, {
    key: "chapter",
    value: function chapter(_ref5) {
      var request, response, artwork_id, artwork, chapter, _request$all5, title, content, chapter_artwork, number;

      return regeneratorRuntime.async(function chapter$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              request = _ref5.request, response = _ref5.response;
              artwork_id = request.input('artwork_id');
              _context5.next = 4;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id));

            case 4:
              artwork = _context5.sent;
              chapter = new Chapter();
              _request$all5 = request.all(), title = _request$all5.title, content = _request$all5.content;
              chapter.tittle = title;
              chapter.content = content;
              chapter.artwork_id = artwork.id;
              _context5.next = 12;
              return regeneratorRuntime.awrap(artwork.chapters().getCount());

            case 12:
              chapter_artwork = _context5.sent;
              number = chapter_artwork;
              chapter.order = number + 1;
              chapter.save();
              return _context5.abrupt("return", chapter);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "update_chapter",
    value: function update_chapter(_ref6) {
      var request, artwork_id, art, chapter, chapters, k, _request$all6, description, title, content, index;

      return regeneratorRuntime.async(function update_chapter$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              request = _ref6.request;
              artwork_id = request.input('artwork_id');
              _context6.next = 4;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id));

            case 4:
              art = _context6.sent;
              _context6.next = 7;
              return regeneratorRuntime.awrap(art.chapters().fetch());

            case 7:
              chapter = _context6.sent;
              chapters = chapter.rows;
              k = "";
              _request$all6 = request.all(), description = _request$all6.description, title = _request$all6.title, content = _request$all6.content;
              art.title = title;
              art.description = description; //art.path_img = path

              for (index = 0; index < chapters.length; index++) {
                k = chapters[index];
                k.tittle = title;
                k.content = content;
                k.save();
              }

              art.save();
              return _context6.abrupt("return", {
                k: k,
                art: art
              });

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "getChapters",
    value: function getChapters(_ref7) {
      var request, artwork_id, artwork, art, imgPath, file, base64;
      return regeneratorRuntime.async(function getChapters$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              request = _ref7.request;
              _context7.prev = 1;
              artwork_id = request.input('artwork_id');
              _context7.next = 5;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id.id));

            case 5:
              artwork = _context7.sent;
              _context7.next = 8;
              return regeneratorRuntime.awrap(artwork.chapters().fetch());

            case 8:
              artwork.chapter = _context7.sent;
              art = artwork;
              imgPath = art.path_img;
              _context7.next = 13;
              return regeneratorRuntime.awrap(Drive.get(imgPath));

            case 13:
              file = _context7.sent;
              base64 = Buffer.from(file).toString('base64');
              artwork.path_img = base64;
              return _context7.abrupt("return", artwork);

            case 19:
              _context7.prev = 19;
              _context7.t0 = _context7["catch"](1);
              console.log(_context7.t0);

            case 22:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[1, 19]]);
    }
  }, {
    key: "getImage",
    value: function getImage(_ref8) {
      var request, artwork_id, artwork, art, imgPath, file, base64;
      return regeneratorRuntime.async(function getImage$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              request = _ref8.request;
              _context8.prev = 1;
              artwork_id = request.input('artwork_id');
              _context8.next = 5;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id.id));

            case 5:
              artwork = _context8.sent;
              art = artwork;
              imgPath = art.path_img;
              _context8.next = 10;
              return regeneratorRuntime.awrap(Drive.get(imgPath));

            case 10:
              file = _context8.sent;
              base64 = Buffer.from(file).toString('base64');
              artwork.path_img = base64;
              return _context8.abrupt("return", artwork);

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](1);
              console.log(_context8.t0);

            case 19:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[1, 16]]);
    }
  }, {
    key: "update_image",
    value: function update_image(_ref9) {
      var request, artwork_id, art, _request$all7, description, title, path_img, extension, coverImg, name, path;

      return regeneratorRuntime.async(function update_image$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              request = _ref9.request;
              artwork_id = request.input('artwork_id');
              _context9.next = 4;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id));

            case 4:
              art = _context9.sent;
              _request$all7 = request.all(), description = _request$all7.description, title = _request$all7.title, path_img = _request$all7.path_img, extension = _request$all7.extension;
              coverImg = path_img;
              name = 'artwork' + Math.random() + '.' + extension;
              _context9.next = 10;
              return regeneratorRuntime.awrap(Drive.put('artwork/' + name, Buffer.from(coverImg, 'base64')));

            case 10:
              path = 'artwork/' + name;
              _context9.next = 13;
              return regeneratorRuntime.awrap(Drive.get(path));

            case 13:
              art.path_img = path;
              art.title = title;
              art.description = description;
              art.save();
              return _context9.abrupt("return", {
                art: art
              });

            case 18:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "artwork_id",
    value: function artwork_id(_ref10) {
      var request, artwork_id, artwork, chapter;
      return regeneratorRuntime.async(function artwork_id$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              request = _ref10.request;
              artwork_id = request.input('artwork_id');
              _context10.next = 4;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id.id));

            case 4:
              artwork = _context10.sent;
              _context10.next = 7;
              return regeneratorRuntime.awrap(artwork.chapters().fetch());

            case 7:
              chapter = _context10.sent;
              return _context10.abrupt("return", {
                artwork: artwork,
                chapter: chapter
              });

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "congratulate",
    value: function congratulate(_ref11) {
      var auth, response, request, user, artwork_id, artwork, check;
      return regeneratorRuntime.async(function congratulate$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              auth = _ref11.auth, response = _ref11.response, request = _ref11.request;
              _context11.next = 3;
              return regeneratorRuntime.awrap(auth.getUser());

            case 3:
              user = _context11.sent;
              artwork_id = request.input('artwork_id');
              _context11.next = 7;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id));

            case 7:
              artwork = _context11.sent;
              _context11.next = 10;
              return regeneratorRuntime.awrap(user.congratulations().where('artwork_id', artwork.id).first());

            case 10:
              check = _context11.sent;

              if (!check) {
                _context11.next = 17;
                break;
              }

              _context11.next = 14;
              return regeneratorRuntime.awrap(user.congratulations().detach(artwork.id));

            case 14:
              return _context11.abrupt("return", response.send('quitaste tus felicitaciones'));

            case 17:
              _context11.next = 19;
              return regeneratorRuntime.awrap(user.congratulations().save(artwork));

            case 19:
              return _context11.abrupt("return", response.send('felicidades'));

            case 20:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  }, {
    key: "showChapter",
    value: function showChapter() {
      return regeneratorRuntime.async(function showChapter$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
            case "end":
              return _context12.stop();
          }
        }
      });
    }
  }, {
    key: "show",
    value: function show(_ref12) {
      var request, _request$all8, artwork_id, user_id, artwork, imgPath, file, base64, user, artworkUser;

      return regeneratorRuntime.async(function show$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              request = _ref12.request;
              _request$all8 = request.all(), artwork_id = _request$all8.artwork_id, user_id = _request$all8.user_id;
              _context13.next = 4;
              return regeneratorRuntime.awrap(Artwork.queryArt().where('artworks.id', artwork_id).first());

            case 4:
              artwork = _context13.sent;
              _context13.next = 7;
              return regeneratorRuntime.awrap(artwork.comments()["with"]('user').fetch());

            case 7:
              artwork.commentsArray = _context13.sent;
              _context13.next = 10;
              return regeneratorRuntime.awrap(artwork.congratulations().fetch());

            case 10:
              artwork.congratulationsArray = _context13.sent;
              _context13.next = 13;
              return regeneratorRuntime.awrap(artwork.chapters().fetch());

            case 13:
              artwork.chapters = _context13.sent;
              // img base64 encoding
              imgPath = artwork.path_img;
              _context13.next = 17;
              return regeneratorRuntime.awrap(Drive.get(imgPath));

            case 17:
              file = _context13.sent;
              base64 = Buffer.from(file).toString('base64');
              artwork.path_img = base64;
              artwork.followedUser = false;
              artwork.congratulated = false;

              if (!user_id) {
                _context13.next = 38;
                break;
              }

              _context13.next = 25;
              return regeneratorRuntime.awrap(User.find(user_id));

            case 25:
              user = _context13.sent;
              _context13.next = 28;
              return regeneratorRuntime.awrap(User.find(artwork.user_id));

            case 28:
              artworkUser = _context13.sent;

              if (!user) {
                _context13.next = 34;
                break;
              }

              _context13.next = 32;
              return regeneratorRuntime.awrap(artworkUser.followers().where('follower', user.id).first());

            case 32:
              if (!_context13.sent) {
                _context13.next = 34;
                break;
              }

              artwork.followedUser = true;

            case 34:
              _context13.next = 36;
              return regeneratorRuntime.awrap(artwork.congratulations().where('id', user_id).first());

            case 36:
              if (!_context13.sent) {
                _context13.next = 38;
                break;
              }

              artwork.congratulated = true;

            case 38:
              return _context13.abrupt("return", artwork);

            case 39:
            case "end":
              return _context13.stop();
          }
        }
      });
    }
  }, {
    key: "comment",
    value: function comment(_ref13) {
      var auth, request, response, user, _request$all9, artwork_id, content, comment;

      return regeneratorRuntime.async(function comment$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              auth = _ref13.auth, request = _ref13.request, response = _ref13.response;
              _context14.next = 3;
              return regeneratorRuntime.awrap(auth.getUser());

            case 3:
              user = _context14.sent;
              _request$all9 = request.all(), artwork_id = _request$all9.artwork_id, content = _request$all9.content;
              comment = new Comment();
              comment.content = content;
              comment.user_id = user.id;
              comment.artwork_id = artwork_id;
              _context14.next = 11;
              return regeneratorRuntime.awrap(comment.save());

            case 11:
              comment.user = user;
              return _context14.abrupt("return", response.json(comment));

            case 13:
            case "end":
              return _context14.stop();
          }
        }
      });
    }
  }, {
    key: "stream",
    value: function stream(_ref14) {
      return regeneratorRuntime.async(function stream$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _objectDestructuringEmpty(_ref14);

            case 1:
            case "end":
              return _context15.stop();
          }
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy(_ref15) {
      var params, response, artwork;
      return regeneratorRuntime.async(function destroy$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              params = _ref15.params, response = _ref15.response;
              _context16.next = 3;
              return regeneratorRuntime.awrap(Artwork.find(params.id));

            case 3:
              artwork = _context16.sent;
              _context16.next = 6;
              return regeneratorRuntime.awrap(artwork.chapters()["delete"]());

            case 6:
              _context16.next = 8;
              return regeneratorRuntime.awrap(artwork.tags().detach());

            case 8:
              _context16.next = 10;
              return regeneratorRuntime.awrap(artwork.congratulations()["delete"]());

            case 10:
              _context16.next = 12;
              return regeneratorRuntime.awrap(artwork.comments()["delete"]());

            case 12:
              _context16.next = 14;
              return regeneratorRuntime.awrap(artwork["delete"]());

            case 14:
            case "end":
              return _context16.stop();
          }
        }
      });
    }
  }, {
    key: "tags",
    value: function tags(_ref16) {
      var request, response, artwork_id, artwork, name, tag, data, x, i;
      return regeneratorRuntime.async(function tags$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              request = _ref16.request, response = _ref16.response;
              artwork_id = request.input('artwork_id');
              _context17.next = 4;
              return regeneratorRuntime.awrap(Artwork.find(artwork_id));

            case 4:
              artwork = _context17.sent;
              name = request.input('name');
              tag = new Tags();
              tag.name = name;
              _context17.next = 10;
              return regeneratorRuntime.awrap(Tags.query().fetch());

            case 10:
              data = _context17.sent;
              x = data.rows;
              i = 0;

            case 13:
              if (!(i < x.length)) {
                _context17.next = 24;
                break;
              }

              if (!(tag.name == x[i].name)) {
                _context17.next = 20;
                break;
              }

              _context17.next = 17;
              return regeneratorRuntime.awrap(artwork.tags().save(tag));

            case 17:
              return _context17.abrupt("return", "Ya existe esa etiqueta");

            case 20:
              tag.name = name;

            case 21:
              i++;
              _context17.next = 13;
              break;

            case 24:
              _context17.next = 26;
              return regeneratorRuntime.awrap(artwork.tags().save(tag));

            case 26:
              return _context17.abrupt("return", response.json(artwork));

            case 27:
            case "end":
              return _context17.stop();
          }
        }
      });
    }
  }]);

  return ArtworkController;
}();

module.exports = ArtworkController;