package com.crudApplication.crudApplication.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

//class ConnectionObject{
//	private Connection con;
//	private Statement stmt;
//	public ConnectionObject(Connection con, Statement stmt) {
//		this.con = con;
//		this.stmt = stmt;
//	}
//	public Connection getCon() {
//		return con;
//	}
//	
//	public Statement getStmt() {
//		return stmt;
//	}
//	
//}
public class MyConnection {
	Connection con;
	Statement stmt;
	public  MyConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con=DriverManager.getConnection("jdbc:mysql://localhost:3306/StudentDB","root","root");
			stmt=con.createStatement();
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}

	}

}
