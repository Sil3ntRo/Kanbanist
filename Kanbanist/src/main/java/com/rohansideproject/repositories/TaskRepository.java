package com.rohansideproject.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rohansideproject.domain.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
	
	@Override
	Iterable<Task> findAllById(Iterable<Long> iterable);
}
