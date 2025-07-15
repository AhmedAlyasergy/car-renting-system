<?php
require_once '../controllers/RentalController.php';

$rentalController = new RentalController();

$requestMethod = $_SERVER['REQUEST_METHOD'];

switch ($requestMethod) {
    case 'GET':
        if (isset($_GET['id'])) {
            $rentalController->getRental($_GET['id']);
        } else {
            $rentalController->getAllRentals();
        }
        break;

    case 'POST':
        $rentalController->createRental();
        break;

    case 'PUT':
        $rentalController->updateRental();
        break;

    case 'DELETE':
        $rentalController->deleteRental();
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}
?>