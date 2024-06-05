package com.iuh.fit.recycling.quoting.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnAuthorizedException extends RuntimeException{
    private int errorCode = 401;

    public UnAuthorizedException(String message){
        super(message);
    }

    public UnAuthorizedException(int errorCode, String message){
        super(message);
        this.errorCode = errorCode;
    }

}
