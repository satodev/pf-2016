<?php
class Model
{
	protected $pdo;
	public function __construct()
	{
		$this->connectDb();
	}
	public function connectDb()
	{
		$user = 'root'; 
		$password = 'sato@75';
		$pdo = new PDO('mysql:host=localhost;dbname=test', $user, $password);
		return $this->pdo = $pdo;
	}
	public function	createTable()
	{
		$pdo = $this->pdo;
		$sql = 'CREATE TABLE sato (id INT (250) PRIMARY_KEY, name VARCHAR (250))';
		$pdo->prepare($sql);
		$pdo->execute();
	}
	public function createMailTable()
	{
		$pdo = $this->pdo;
		var_dump($pdo);
		$sql = "CREATE TABLE smail(id int NOT NULL AUTO_INCREMENT, name varchar(255), email varchar(255), object varchar(255), message varchar(255), PRIMARY KEY(id))";
		$pdo->prepare($sql);
		$pdo->execute();
	}
	public function insertIntoMailTable($name, $email, $object, $message)
	{
		$pdo = $this->pdo;
		$sql = "INSERT INTO `test_mail`(`name`, `email`, `object`, `message`) VALUES (".$name.",".$email.",".$object.",".$message.")";
		$pdo->prepare($sql);
		$pdo->execute();
	}
}
