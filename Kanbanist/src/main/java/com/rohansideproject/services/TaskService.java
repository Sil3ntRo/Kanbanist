package com.rohansideproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rohansideproject.domain.Task;
import com.rohansideproject.repositories.TaskRepository;

@Service
public class TaskService {

		@Autowired
		private TaskRepository taskRepository;
		
		public Task saveOrUpdateTask(Task task) {
			
			// Add code
			
			return taskRepository.save(task);
		}
}
