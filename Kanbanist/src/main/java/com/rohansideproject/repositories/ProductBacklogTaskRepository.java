package com.rohansideproject.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rohansideproject.domain.ProductBacklogTask;

@Repository
public interface ProductBacklogTaskRepository extends CrudRepository<ProductBacklogTask, Long> {
	
}
