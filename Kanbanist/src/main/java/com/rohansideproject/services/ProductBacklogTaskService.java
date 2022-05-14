package com.rohansideproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rohansideproject.domain.Backlog;
import com.rohansideproject.domain.ProductBacklogTask;
import com.rohansideproject.repositories.BacklogRepository;
import com.rohansideproject.repositories.ProductBacklogTaskRepository;

@Service
public class ProductBacklogTaskService {
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProductBacklogTaskRepository productBacklogTaskRepository;
	
	public ProductBacklogTask addProductTask(String productIdentifier, ProductBacklogTask productTask) {
		
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
	}
}
