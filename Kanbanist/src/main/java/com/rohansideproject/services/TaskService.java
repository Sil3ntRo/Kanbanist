package com.rohansideproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rohansideproject.domain.Task;
import com.rohansideproject.exceptions.TaskIdException;
import com.rohansideproject.repositories.TaskRepository;

@Service
public class TaskService {

		@Autowired
		private TaskRepository taskRepository;
		
		public Task saveOrUpdateTask(Task task) {
			
			try {
				task.setTaskIdentifier(task.getTaskIdentifier().toUpperCase());
				return taskRepository.save(task);
			} catch (Exception e) {
				throw new TaskIdException("Task ID '" + task.getTaskIdentifier().toUpperCase() + "' already exists");
			}
			
		}
		
		public Task findTaskByIdentifier(String taskId) {
			
			Task task = taskRepository.findByTaskIdentifier(taskId.toUpperCase());
			
			if(task == null) {
				throw new TaskIdException("Task ID '" + taskId + "' does not exists");

			}
			
			return task;
		}
		
		public Iterable<Task> findAllTasks() {
			return taskRepository.findAll();
		}
		
		public void deleteTaskByIdentifier(String taskId) {
			Task task = taskRepository.findByTaskIdentifier(taskId);
			
			if(task == null) {
				throw new TaskIdException("Cannot delete Task with ID '" + taskId + "'. This task does not exist");
			}
			
			taskRepository.delete(task);
		}
}
