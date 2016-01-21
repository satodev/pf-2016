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
}
