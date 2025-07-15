<?php
class CarController {
    private $db;

    public function __construct($database) {
        $this->db = $database;
    }

    public function addCar($carData) {
        $query = "INSERT INTO cars (make, model, year, price, availability) VALUES (:make, :model, :year, :price, :availability)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute($carData);
    }

    public function updateCar($carId, $carData) {
        $query = "UPDATE cars SET make = :make, model = :model, year = :year, price = :price, availability = :availability WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $carData['id'] = $carId;
        return $stmt->execute($carData);
    }

    public function deleteCar($carId) {
        $query = "DELETE FROM cars WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute(['id' => $carId]);
    }

    public function getCar($carId) {
        $query = "SELECT * FROM cars WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['id' => $carId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllCars() {
        $query = "SELECT * FROM cars";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>