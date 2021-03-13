package com.crudApplication.crudApplication.ControllerPackage;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crudApplication.crudApplication.services.Student;
import com.crudApplication.crudApplication.services.StudentRepository;

@RestController
public class Controller {
	StudentRepository stdrepo;
	private String a;
	public Controller()
	{
		a = "Shaurya";
	}
	@GetMapping("/getlist")
	public List<Student> getAll()
	{
		return new StudentRepository().getAll();
	}
	@DeleteMapping("/delete/{id}")
	public boolean delete(@PathVariable int id)
	{
		return new StudentRepository().deleteStudent(id);
		
	}
	@PostMapping("/create")
	public int create(@RequestBody Student std) {
		return new StudentRepository().createStudent(std);
	}
	@PutMapping("/put")
	public boolean update(@RequestBody Student std) {
		return new StudentRepository().updateStudent(std);
	}
	

}
