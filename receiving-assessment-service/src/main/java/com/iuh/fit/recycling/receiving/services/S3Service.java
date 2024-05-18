package com.iuh.fit.recycling.receiving.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Service {

    String saveFile(MultipartFile multipartFile) throws IOException;

    byte[] getfileByte(String filename);

    String deleteFile(String filename);

}
