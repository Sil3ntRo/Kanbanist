package com.rohansideproject.exceptions;

public class TaskNotFoundExceptionResponse {
	private String TaskNotFound;
	
	public TaskNotFoundExceptionResponse(String taskNotFound) {
		TaskNotFound = taskNotFound;
	}
	
	public String getTaskNotFound() {
		return TaskNotFound;
	}

	public void setTaskNotFound(String taskNotFound) {
		TaskNotFound = taskNotFound;
	}
	
	
}
