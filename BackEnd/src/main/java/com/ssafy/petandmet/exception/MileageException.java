package com.ssafy.petandmet.exception;

public class MileageException extends RuntimeException {
    public MileageException(String string){
        super(string);
    }
   
    public MileageException(String message, Throwable cause){
        super(message, cause);
    }
}