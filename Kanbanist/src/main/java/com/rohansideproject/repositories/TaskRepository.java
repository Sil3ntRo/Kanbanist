package com.rohansideproject.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rohansideproject.domain.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
	
	Task findByTaskIdentifier(String taskId);
	
	@Override
	Iterable<Task> findAll();
}
