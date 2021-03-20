package com.raasalgul.exception;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@ControllerAdvice
public class ExceptionAdvice {
	@ExceptionHandler(TopicNotFound.class)
	public ResponseEntity<String> handleTopicNotFound(TopicNotFound nfe) {
		JSONObject errorJson = new JSONObject();
		errorJson.put("Error",nfe.getError());
		errorJson.put("ErrorMessage",nfe.getErrorMsg());
		errorJson.put("StatusCode", HttpStatus.NOT_FOUND);
		return new ResponseEntity<String>(errorJson.toString(), HttpStatus.NOT_FOUND);
	}
}
