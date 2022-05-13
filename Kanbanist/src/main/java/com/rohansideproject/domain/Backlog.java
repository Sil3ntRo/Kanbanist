package com.rohansideproject.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Backlog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer PTSequence = 0;
	private String taskIdentifier;

	// One-to-One w/ task
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "task_id", nullable = false)
	@JsonIgnore
	private Task task;

	// One-to-Many productBacklogTasks
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "backlog")
	private List<ProductBacklogTask> productBacklogTasks = new ArrayList<>();

	public Backlog() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getPTSequence() {
		return PTSequence;
	}

	public void setPTSequence(Integer pTSequence) {
		PTSequence = pTSequence;
	}

	public String getTaskIdentifier() {
		return taskIdentifier;
	}

	public void setTaskIdentifier(String taskIdentifier) {
		this.taskIdentifier = taskIdentifier;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public List<ProductBacklogTask> getProductBacklogTasks() {
		return productBacklogTasks;
	}

	public void setProductBacklogTasks(List<ProductBacklogTask> productBacklogTasks) {
		this.productBacklogTasks = productBacklogTasks;
	}
	
	
}
