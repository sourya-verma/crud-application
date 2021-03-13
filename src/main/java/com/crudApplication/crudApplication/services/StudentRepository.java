package com.crudApplication.crudApplication.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class StudentRepository {
	
	MyConnection obj = new MyConnection();
	int id;
	String name;
	String email;
	String universityName;
    public int createStudent(Student student) {
    	int id = 0;
        //return newly created id
        try{
        	String sql = "INSERT INTO Student (name,email,university)" + "VALUES (?,?,?)";
        	PreparedStatement preparedStatement = obj.con.prepareStatement(sql);
			preparedStatement.setString(1, student.getName());
			preparedStatement.setString(2, student.getEmail());
			preparedStatement.setString(3, student.getUniversityName());
			preparedStatement.executeUpdate();
			// preparedStatement = con.prepareStatement(sql);
			sql = "select max(id) as id from student";
			preparedStatement = obj.con.prepareStatement(sql);
			System.out.println("Record inserted sucessfully");
        	ResultSet rs = preparedStatement.executeQuery(sql);
				while(rs.next())
				id = rs.getInt(1);
        }
        catch(Exception e){
        	System.out.println(e);
        }
        return id;
    }
    public boolean updateStudent(Student student) {
    	boolean ans = false;
        //return true if updated otherwise false
        try{
        	
        	String sql = "select * from student where id ='"+student.getId()+"'";
        	ResultSet rs = obj.stmt.executeQuery(sql);
        	if(rs.next()) {
				
	        	sql = "update student set name = ?, email = ?, university = ? where id = ?";
	        	PreparedStatement preparedStatement = obj.con.prepareStatement(sql);
	        	
				preparedStatement.setString(1, student.getName());
				preparedStatement.setString(2, student.getEmail());
				preparedStatement.setString(3, student.getUniversityName());
				preparedStatement.setInt(4, student.getId());
				preparedStatement.executeUpdate();
				ans = true;
//				System.out.println("okay");
        	}
        	else {
//        		System.out.println("okay2");
        	}
        	
        }
        catch(Exception e){
        	System.out.println(e);
        }
        return ans;
    }

    public List<Student> getAll() {
        // return all student list
        List<Student> list = new  ArrayList<>();
        try{

        	ResultSet rs=obj.stmt.executeQuery("select * from Student");

				while(rs.next())
				{

					id = rs.getInt(1);
					name = rs.getString(2);
					email = rs.getString(3);
					universityName = rs.getString(4);
					Student s = new Student(id,name,email, universityName);
					list.add(s);
        		}
        }catch(Exception e){
        	System.out.println(e);
        }
        return list;
    }
    public boolean deleteStudent(int id) {
        //return true if delete otherwise false
    	boolean ans = false;
        try{
        	String sql = "select id from student where id ='"+id+"'";
        	ResultSet rs = obj.stmt.executeQuery(sql);
        	if(rs.next()) {
				ans = true;
				sql = "delete from Student where id = '"+ id+"'";
            	obj.stmt.executeUpdate(sql);
			}
        			
        }
        catch(Exception e){
        	System.out.println(e);
        }
        return ans;
    }

}
