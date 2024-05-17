package com.iuh.fit.recycling.receiving.utils;

import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

public class CheckFileUtil {

    @Value("${acceptViewPattern}")
    private static String acceptViewPattern;

    public static boolean checkFile(List<MultipartFile> files){
        Pattern pattern = Pattern.compile("^.+\\.("+acceptViewPattern+")$");
        int totalImage = 0;
        int totalVideo = 0;
        for (MultipartFile multipartFile : files) {
            String originalFileName = Objects.requireNonNull(multipartFile.getOriginalFilename())
                    .replaceAll("\\s+", "_");
//            if (!pattern.matcher(Objects.requireNonNull(originalFileName)).matches())
//                throw new BadRequestException("Only upload image and video");

            if (originalFileName.endsWith(".mp4") || originalFileName.endsWith(".mov"))
                totalVideo++;
            else
                totalImage++;
        }

        return totalVideo == 1 && totalImage == 3;
    }
}
