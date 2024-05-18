package com.iuh.fit.recycling.receiving.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    public static String getDateTimeString(LocalDateTime dateTime){
        return dateTime.format(formatter);
    }
}
