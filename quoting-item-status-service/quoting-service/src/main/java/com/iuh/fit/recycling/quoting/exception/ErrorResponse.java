package com.iuh.fit.recycling.quoting.exception;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
//@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private Integer errorCode;
    private String message;
//    private Map<String, String> infoMessage;

    public ErrorResponse(Integer errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
