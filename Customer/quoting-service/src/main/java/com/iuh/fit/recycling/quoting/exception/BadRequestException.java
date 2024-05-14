package com.iuh.fit.recycling.quoting.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadRequestException extends RuntimeException{
    private int errorCode = 400;
//    private Map<String, String> infoMessage;

//    public BadRequestException(int errorCode, String message, Map<String, String> infoMessage) {
//        super(message);
//        this.infoMessage = infoMessage;
//        this.errorCode = errorCode;
//    }

    public BadRequestException(String message) {
        super(message);
    }

//    public BadRequestException(String message, Map<String, String> infoMessage) {
//        super(message);
//        this.infoMessage = infoMessage;
//    }

}
