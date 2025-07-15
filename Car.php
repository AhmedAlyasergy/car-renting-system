<?php
class Car {
    private $conn;
    private $table_name = "cars";

    public $id;
    public $make;
    public $model;
    public $year;
    public $price_per_day;
    public $availability;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (make, model, year, price_per_day, availability) VALUES (:make, :model, :year, :price_per_day, :availability)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':make', $this->make);
        $stmt->bindParam(':model', $this->model);
        $stmt->bindParam(':year', $this->year);
        $stmt->bindParam(':price_per_day', $this->price_per_day);
        $stmt->bindParam(':availability', $this->availability);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE availability = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET make = :make, model = :model, year = :year, price_per_day = :price_per_day, availability = :availability WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':make', $this->make);
        $stmt->bindParam(':model', $this->model);
        $stmt->bindParam(':year', $this->year);
        $stmt->bindParam(':price_per_day', $this->price_per_day);
        $stmt->bindParam(':availability', $this->availability);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>