package com.crudApplication.crudApplication.services;

public class Student {
	
	private final int id;
    private final String name;
    private final String email;
    private final String universityName;

    public Student(int id, String name, String email, String universityName) {
        this.name = name;
        this.email = email;
        this.universityName = universityName;
        this.id = id;
    }
    public int getId() {
        return id;
    }
    public String getUniversityName() {
        return universityName;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }

}
