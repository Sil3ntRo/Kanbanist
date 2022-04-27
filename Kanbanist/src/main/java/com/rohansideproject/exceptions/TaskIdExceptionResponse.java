package com.rohansideproject.exceptions;

public class TaskIdExceptionResponse {
	
	private String taskIdentifier;
	
	public TaskIdExceptionResponse(String taskIdentifier) {
		this.taskIdentifier = taskIdentifier;
	}

	public String getTaskIdentifier() {
		return taskIdentifier;
	}

	public void setTaskIdentifier(String taskIdentifier) {
		this.taskIdentifier = taskIdentifier;
	}
	
	
}
