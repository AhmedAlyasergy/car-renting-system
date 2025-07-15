<?php
require_once '../controllers/AuthController.php';

$authController = new AuthController();

$router = new Router();

$router->post('/register', [$authController, 'register']);
$router->post('/login', [$authController, 'login']);
$router->post('/logout', [$authController, 'logout']);

$router->run();
?>