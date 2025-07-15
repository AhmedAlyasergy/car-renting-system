<?php
require_once '../config/db.php';
require_once '../routes/auth.php';
require_once '../routes/cars.php';
require_once '../routes/rentals.php';

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Simple routing mechanism
if (strpos($requestUri, '/api/auth') === 0) {
    handleAuthRoutes($requestMethod, $requestUri);
} elseif (strpos($requestUri, '/api/cars') === 0) {
    handleCarRoutes($requestMethod, $requestUri);
} elseif (strpos($requestUri, '/api/rentals') === 0) {
    handleRentalRoutes($requestMethod, $requestUri);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found']);
}
?>