package com.example.demo.controller;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Service.StudentService;
import com.example.demo.model.Student;
import com.example.demo.repositories.StudentRepository;



@RestController
@RequestMapping("/api")
@CrossOrigin
public class StudentController {

	@Autowired
	StudentRepository studentRepository;
	
	@Autowired
	StudentService studentService;
	
	
	
	@PostMapping("/create")
	public void createStudent(@RequestBody Student student) {
		
		 studentRepository.insert(student);
		
	}
	
	@GetMapping("/list")
	public List<Student> listStudents(){
		return studentRepository.findAll();
		
	}
	
	
	
	@PutMapping("/update")
	public Student update(@RequestBody Student student) {
		return studentRepository.save(student);
	}
	
	@PostMapping("/delete/{id}")
	public String deleteStudent(@PathVariable String id) {
//		Optional<Student> studentObj = studentRepository.findById(id);
//		if(studentObj.isPresent()) {
//			studentRepository.delete(studentObj.get());
//			return "student deleted with id "+id;
//		}else {
//			throw new RuntimeException("student not found for id "+id);
//		}
		
	boolean studentexists=studentRepository.existsById(id);
	if(studentexists)
	{
		studentRepository.deleteById(id);
		return "student with id "+id;
	}
	return "student doesn't exists with id";
	}
	
}
