package com.rohansideproject.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rohansideproject.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
