package com.rohansideproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rohansideproject.domain.Backlog;
import com.rohansideproject.domain.ProductBacklogTask;
import com.rohansideproject.domain.Task;
import com.rohansideproject.exceptions.TaskNotFoundException;
import com.rohansideproject.repositories.BacklogRepository;
import com.rohansideproject.repositories.ProductBacklogTaskRepository;
import com.rohansideproject.repositories.TaskRepository;

@Service
public class ProductBacklogTaskService {
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProductBacklogTaskRepository productBacklogTaskRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	public ProductBacklogTask addProductTask(String productIdentifier, ProductBacklogTask productTask) {
		
		try {
			// PT to be added to specified task, task != null, exists in backlog
			Backlog backlog = backlogRepository.findByTaskIdentifier(productIdentifier);
			
			productTask.setBacklog(backlog);
			
			// Set the backlog to PT to be similar: IDPT-1 IDPT-2...100 101
			Integer BacklogSequence = backlog.getPTSequence();
			
			// Update backlog seq
			BacklogSequence++;
			
			backlog.setPTSequence(BacklogSequence);
			
			// Add seq to product task
			productTask.setProductSequence(backlog.getTaskIdentifier() + "-" + BacklogSequence);
			productTask.setTaskIdentifier(productIdentifier);
			
			// Initial priority will be null
			if(productTask.getPriority() == null) {
				productTask.setPriority(3);
			}
			
			// Initial status when status 
			if(productTask.getStatus() == "" || productTask.getStatus() == null) {
				productTask.setStatus("TO_DO");
			}
			
			return productBacklogTaskRepository.save(productTask);
		} catch (Exception e) {
			throw new TaskNotFoundException("Task not Found");
		}
		
		
	}

	public Iterable<ProductBacklogTask> findBacklogById(String id) {
		
		Task task = taskRepository.findByTaskIdentifier(id);
		
		if(task == null) {
			throw new TaskNotFoundException("Task with ID: '" + id + "' does not exist");
		}
		
		return productBacklogTaskRepository.findByTaskIdentifierOrderByPriority(id);
	}
}
