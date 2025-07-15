<?php
require_once '../controllers/CarController.php';

$carController = new CarController();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $carController->getCar($_GET['id']);
        } else {
            $carController->getAllCars();
        }
        break;

    case 'POST':
        $carController->addCar();
        break;

    case 'PUT':
        $carController->updateCar();
        break;

    case 'DELETE':
        $carController->deleteCar();
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}
?>