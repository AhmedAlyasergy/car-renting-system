<?php
class RentalController {
    private $rentalModel;

    public function __construct() {
        require_once '../models/Rental.php';
        $this->rentalModel = new Rental();
    }

    public function createRental($data) {
        // Validate and create a new rental record
        if ($this->rentalModel->create($data)) {
            return json_encode(['status' => 'success', 'message' => 'Rental created successfully.']);
        } else {
            return json_encode(['status' => 'error', 'message' => 'Failed to create rental.']);
        }
    }

    public function updateRental($id, $data) {
        // Validate and update an existing rental record
        if ($this->rentalModel->update($id, $data)) {
            return json_encode(['status' => 'success', 'message' => 'Rental updated successfully.']);
        } else {
            return json_encode(['status' => 'error', 'message' => 'Failed to update rental.']);
        }
    }

    public function getRental($id) {
        // Retrieve a rental record by ID
        $rental = $this->rentalModel->getById($id);
        if ($rental) {
            return json_encode(['status' => 'success', 'data' => $rental]);
        } else {
            return json_encode(['status' => 'error', 'message' => 'Rental not found.']);
        }
    }

    public function getAllRentals() {
        // Retrieve all rental records
        $rentals = $this->rentalModel->getAll();
        return json_encode(['status' => 'success', 'data' => $rentals]);
    }
}
?>