package com.rohansideproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rohansideproject.domain.ProductBacklogTask;

@Repository
public interface ProductBacklogTaskRepository extends CrudRepository<ProductBacklogTask, Long> {
	
	List<ProductBacklogTask> findByTaskIdentifierOrderByPriority(String id);
	
	ProductBacklogTask findByTaskSequence(String sequence);
}
