<?php
class Rental {
    private $conn;
    private $table_name = "rentals";

    public $id;
    public $user_id;
    public $car_id;
    public $rental_start_date;
    public $rental_end_date;
    public $total_price;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, car_id=:car_id, rental_start_date=:rental_start_date, 
                      rental_end_date=:rental_end_date, total_price=:total_price, status=:status";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":car_id", $this->car_id);
        $stmt->bindParam(":rental_start_date", $this->rental_start_date);
        $stmt->bindParam(":rental_end_date", $this->rental_end_date);
        $stmt->bindParam(":total_price", $this->total_price);
        $stmt->bindParam(":status", $this->status);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET rental_start_date = :rental_start_date, rental_end_date = :rental_end_date, 
                      total_price = :total_price, status = :status 
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":rental_start_date", $this->rental_start_date);
        $stmt->bindParam(":rental_end_date", $this->rental_end_date);
        $stmt->bindParam(":total_price", $this->total_price);
        $stmt->bindParam(":status", $this->status);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>