package com.rohansideproject.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleTaskIdException(TaskIdException ex, WebRequest request) {
		TaskIdExceptionResponse exceptionResponse = new TaskIdExceptionResponse(ex.getMessage());
		
		return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleTaskNotFoundException(TaskNotFoundException ex, WebRequest request) {
		TaskNotFoundExceptionResponse exceptionResponse = new TaskNotFoundExceptionResponse(ex.getMessage());
		
		return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
}
