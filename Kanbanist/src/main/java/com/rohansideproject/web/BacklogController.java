package com.rohansideproject.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.rohansideproject.domain.ProductBacklogTask;
import com.rohansideproject.services.MapValidationErrorService;
import com.rohansideproject.services.ProductBacklogTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
	
	@Autowired
	private ProductBacklogTaskService productBacklogTaskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProductBacklogTask productBacklogTask,
											BindingResult result, @PathVariable String backlog_id)  {
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		
		if(errorMap != null) return errorMap;
		
		ProductBacklogTask productBacklogTask1 = productBacklogTaskService.addProductTask(backlog_id, productBacklogTask);
		
		return new ResponseEntity<ProductBacklogTask>(productBacklogTask1, HttpStatus.CREATED);
	}
}
