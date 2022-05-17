package com.rohansideproject.web;

import java.util.List;

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
	
	@GetMapping("/{backlog_id")
	public Iterable<ProductBacklogTask> getTaskBacklog(@PathVariable String backlog_id) {
		return productBacklogTaskService.findBacklogById(backlog_id);
	}
	
	@GetMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> getProductBacklogTask(@PathVariable String backlog_id, @PathVariable String pt_id) {
		ProductBacklogTask productBacklogTask = productBacklogTaskService.findPTByProductSequence(backlog_id, pt_id);
		return new ResponseEntity<ProductBacklogTask>(productBacklogTask, HttpStatus.OK);
	}
	
	@PatchMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> updateProductTask(@Valid @RequestBody ProductBacklogTask productBacklogTask, BindingResult result,
												@PathVariable String backlog_id, @PathVariable String pt_id) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		ProductBacklogTask updatedTask = productBacklogTaskService.updateByProductSequence(productBacklogTask, backlog_id, pt_id);
		
		return new ResponseEntity<ProductBacklogTask>(updatedTask, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> deleteProductTask(@PathVariable String backlog_id, @PathVariable String pt_id) {
		productBacklogTaskService.deletePTByProductSequence(backlog_id, pt_id);
		
		return new ResponseEntity<String>("Product Task " + pt_id + " was successfully deleted", HttpStatus.OK);
	}
}
