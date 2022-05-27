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
	
	@Autowired
	private TaskService taskService;
	
	public ProductBacklogTask addProductTask(String productIdentifier, ProductBacklogTask productTask, String username) {
		
		
		// PT to be added to specified task, task != null, exists in backlog
		Backlog backlog = taskService.findTaskByIdentifier(productIdentifier, username).getBacklog();
		
		System.out.println(backlog);
		
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
		
		
	}

	public Iterable<ProductBacklogTask> findBacklogById(String id, String username) {
		
		taskService.findTaskByIdentifier(id, username);
		
		return productBacklogTaskRepository.findByTaskIdentifierOrderByPriority(id);
	}
	
	public ProductBacklogTask findPTByProductSequence(String backlog_id, String pt_id, String username) {
		
		taskService.findTaskByIdentifier(backlog_id, username);
		
		// Make sure task already exists in the backlog
				ProductBacklogTask productBacklogTask = productBacklogTaskRepository.findByTaskSequence(pt_id);
		
		if(productBacklogTask == null) {
			throw new TaskNotFoundException("Product Task '" + pt_id + "' not found");
		}
		
		
		// Ensure backlog/product id in the path corresponds to right task
		if(!productBacklogTask.getTaskIdentifier().equals(backlog_id)) {
			throw new TaskNotFoundException("Prouct Task '" + pt_id + "' does not exist in task: '" + backlog_id);
		}
		
		return productBacklogTask;
	}
	
	public ProductBacklogTask updateByProductSequence(ProductBacklogTask updatedTask, String backlog_id, String pt_id, String username) {
		ProductBacklogTask productBacklogTask = findPTByProductSequence(backlog_id, pt_id, username);
		
		productBacklogTask = updatedTask;
		
		return productBacklogTaskRepository.save(productBacklogTask);
	}
	
	public void deletePTByProductSequence(String backlog_id, String pt_id, String username) {
		ProductBacklogTask productBacklogTask = findPTByProductSequence(backlog_id, pt_id, username);
		
		productBacklogTaskRepository.delete(productBacklogTask);
	}
}
