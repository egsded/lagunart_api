'use strict';
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
| Documentation: http://adonisjs.com/docs/4.1/routing
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

var Route = use('Route');
Route.get('', function () {
  return "I'm a practice :)";
}); // Auth

Route.post('join', 'AuthController.join');
Route.post('login', 'AuthController.login');
Route.get('logout', 'AuthController.logout').middleware('auth');
Route.post('password/reset/mail', 'AuthController.sendResetMail');
Route.post('password/reset', 'AuthController.resetPassword');
Route.post('home', 'UserController.home');
Route.get('usuarios', 'UserController.getusers');
Route.post('cambiar/imagen', 'UserController.cambiar_imagen').middleware('auth');
Route.post('artworks', 'ArtworkController.index');
Route.post('artwork/create', 'ArtworkController.store').middleware('auth');
Route.post('artwork/chapter/create/', 'ArtworkController.chapter').middleware('auth');
Route.patch('artwork/update', 'ArtworkController.update').middleware('auth');
Route["delete"]('artwork/delete/:id', 'ArtworkController.destroy').middleware('auth');
Route.post('artworks/show', 'ArtworkController.show');
Route.get('artwork/information', 'ArtworkController.showInfoToEdit').middleware('auth');
Route.patch('artwork/chapter/update/', 'ArtworkController.update_chapter').middleware('auth');
Route.post('artwork/chapters', 'ArtworkController.getChapters').middleware('auth');
Route.post('artwork/chapter', 'ArtworkController.artwork_id').middleware('auth');
Route.post('artwork/image', 'ArtworkController.getImage').middleware('auth');
Route.patch('artwork/image/edit', 'ArtworkController.update_image').middleware('auth'); //EVENTS

Route.post('event/create', 'EventController.store').middleware('auth');
Route.patch('event/update', 'EventController.update').middleware('auth');
Route["delete"]('event/delete/:id', 'EventController.destroy').middleware('auth'); //COMMENTS

Route.post('comment/artwork', 'ArtworkController.comment').middleware('auth'); //Route.get('comment/artwork','ArtworkController.showcomment')
//LIKES

Route.post('artwork/like', 'ArtworkController.congratulate').middleware('auth'); // Route.post('/pruebon', 'ArtworkController.tags')

Route.post('/tags', 'ArtworkController.tags').middleware('auth');
Route.get('search/home/:params', 'SearchController.home');
Route.get('search/artworks/user/:params/:id', 'SearchController.user');
Route.get('categories', 'CategoryController.categories');
Route.get('subcategories', 'CategoryController.subcategories');
Route.get('categories/subcategories/:id', 'CategoryController.getSubcategories');
Route.get('notifications/:id', 'NotificationController.index');
Route.post('notifications/modify', 'NotificationController.update'); //TAGS

Route.get('tags/:params', 'TagController.index');
Route.post('tags/create/', 'ArtworkController.tags');
Route.post('user/artworks/tags', 'TagController.getAllTagsOfArtwork'); //Route.get('tags')
// PAGE

Route.post('user', 'UserController.show');
Route.post('user/artworks', 'UserController.artworks');
Route.post('user/favorites', 'UserController.favorites');
Route.post('user/favorites/toggle', 'UserController.toggleFavorite');
Route.post('user/follow', 'UserController.follow');
Route.post('user/followers', 'UserController.followers');
Route.post('user/following', 'UserController.following');
Route.get('user/notific/:params', 'UserController.notificaciones');
Route.post('user/delete', 'UserController.rmvnot');