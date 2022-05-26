package com.rohansideproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rohansideproject.domain.Backlog;
import com.rohansideproject.domain.Task;
import com.rohansideproject.domain.User;
import com.rohansideproject.exceptions.TaskIdException;
import com.rohansideproject.exceptions.TaskNotFoundException;
import com.rohansideproject.repositories.BacklogRepository;
import com.rohansideproject.repositories.TaskRepository;
import com.rohansideproject.repositories.UserRepository;

@Service
public class TaskService {

		@Autowired
		private TaskRepository taskRepository;
		
		@Autowired
		private BacklogRepository backlogRepository;
		
		@Autowired
		private UserRepository userRepository;
		
		public Task saveOrUpdateTask(Task task, String username) {
			
			try {
				User user = userRepository.findByUsername(username);
				task.setUser(user);
				task.setTaskLeader(user.getUsername());
				task.setTaskIdentifier(task.getTaskIdentifier().toUpperCase());
				
				if(task.getId() == null) {
					Backlog backlog = new Backlog();
					task.setBacklog(backlog);
					backlog.setTask(task);
					backlog.setTaskIdentifier(task.getTaskIdentifier().toUpperCase());
				}
				
				if(task.getId() != null) {
					task.setBacklog(backlogRepository.findByTaskIdentifier(task.getTaskIdentifier().toUpperCase()));
				}
				
				return taskRepository.save(task);
			} catch (Exception e) {
				throw new TaskIdException("Task ID '" + task.getTaskIdentifier().toUpperCase() + "' already exists");
			}
			
		}
		
		public Task findTaskByIdentifier(String taskId, String username) {
			
			Task task = taskRepository.findByTaskIdentifier(taskId.toUpperCase());
			
			if(task == null) {
				throw new TaskIdException("Task ID '" + taskId + "' does not exists");

			}
			
			if(!task.getTaskLeader().equals(username)) {
	            throw new TaskNotFoundException("Task not found in your account");

			}
			
			return task;
		}
		
		public Iterable<Task> findAllTasks(String username) {
			return taskRepository.findByAllTaskLeader(username);
		}
		
		public void deleteTaskByIdentifier(String taskId, String username) {
			taskRepository.delete(findTaskByIdentifier(taskId, username));
		}
}
