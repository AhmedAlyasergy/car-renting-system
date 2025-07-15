<?php
class User {
    private $id;
    private $username;
    private $password;
    private $email;
    private $created_at;

    public function __construct($username, $password, $email) {
        $this->username = $username;
        $this->password = password_hash($password, PASSWORD_DEFAULT);
        $this->email = $email;
        $this->created_at = date("Y-m-d H:i:s");
    }

    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getCreatedAt() {
        return $this->created_at;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function verifyPassword($password) {
        return password_verify($password, $this->password);
    }

    public function save() {
        // Code to save the user to the database
    }

    public static function findById($id) {
        // Code to find a user by ID
    }

    public static function findByUsername($username) {
        // Code to find a user by username
    }

    public static function findByEmail($email) {
        // Code to find a user by email
    }
}
?>