package com.rohansideproject.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rohansideproject.domain.Task;
import com.rohansideproject.services.MapValidationErrorService;
import com.rohansideproject.services.TaskService;

@RestController
@RequestMapping("/api/task")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewTask(@Valid @RequestBody Task task, BindingResult result) {
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Task task1 = taskService.saveOrUpdateTask(task);
		return new ResponseEntity<Task>(task1, HttpStatus.CREATED);
	}
	
	@GetMapping("/{taskId}")
	public ResponseEntity<?> getTaskById(@PathVariable String taskId) {
		
		Task task = taskService.findTaskByIdentifier(taskId);
		
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Task> getAllTasks() {
		
		return taskService.findAllTasks();
	}
	
	@DeleteMapping("/{taskId}")
	public ResponseEntity<?> deleteProject(@PathVariable String taskId) {
		taskService.deleteTaskByIdentifier(taskId);
		
		return new ResponseEntity<String>("Task with ID: '" + taskId + "' was deleted", HttpStatus.OK); 
	}
}
