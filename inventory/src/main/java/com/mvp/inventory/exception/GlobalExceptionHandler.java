package com.mvp.inventory.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ProblemDetail> handleSomeSpecificException(RuntimeException ex) {
        ProblemDetail errorResponse = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        errorResponse.setTitle("Bad Request");
        errorResponse.setDetail(ex.getMessage());
        errorResponse.setProperty("timestamp", System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}
