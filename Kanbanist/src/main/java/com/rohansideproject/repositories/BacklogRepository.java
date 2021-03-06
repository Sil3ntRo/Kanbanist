package com.rohansideproject.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rohansideproject.domain.Backlog;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
	
	Backlog findByTaskIdentifier(String identifier);
}
