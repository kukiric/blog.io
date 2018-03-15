"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use("Route");

// Rotas de autenticação
Route.post("/login", "UserController.login");
Route.post("/logout", "UserController.logout");

// Rotas dos posts
Route.get("/", "PostController.home");
Route.get("/posts", "PostController.list");
Route.get("/posts/:id", "PostController.get");
Route.post("/posts", "PostController.post");
Route.post("/posts/:id/update", "PostController.update");
Route.post("/posts/:id/delete", "PostController.delete");
