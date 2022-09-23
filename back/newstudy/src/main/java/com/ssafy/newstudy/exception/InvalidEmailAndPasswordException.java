package com.ssafy.newstudy.exception;

public class InvalidEmailAndPasswordException extends RuntimeException{
    public InvalidEmailAndPasswordException() {
    }

    public InvalidEmailAndPasswordException(String message) {
        super(message);
    }

    public InvalidEmailAndPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidEmailAndPasswordException(Throwable cause) {
        super(cause);
    }

    public InvalidEmailAndPasswordException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
