package com.iuh.fit.recycling.receiving.services.impl;

import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import com.iuh.fit.recycling.receiving.services.S3Service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import java.io.File;
import java.io.IOException;
import java.util.Objects;


//@Service
//@RequiredArgsConstructor
public class S3ServiceImpl  {

//    @Value("${aws.bucketName}")
//    private String bucketName;
//
//    private final AmazonS3 s3;
//
//
//    @Override
//    public String saveFile(MultipartFile file) throws IOException {
//        String originalFilename = Objects.requireNonNull(file.getOriginalFilename()).replaceAll("\\s+", "_");
//        String time = Long.toString(System.currentTimeMillis());
//        String fileName = time + "_" +originalFilename;
//        File file1 = multipartToFile(file);
//        PutObjectResult putObjectResult = s3.putObject(bucketName, fileName, file1);
//        return fileName;
//    }
//
//    @Override
//    public byte[] getfileByte(String filename) {
//        try {
//            S3Object object = s3.getObject(bucketName, filename);
//            S3ObjectInputStream objectContent = object.getObjectContent();
//            try {
//                return IOUtils.toByteArray(objectContent);
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        }catch (AmazonS3Exception e){
//            throw new BadRequestException("File not found");
//        }
//    }
//
//    @Override
//    public String deleteFile(String filename) {
//
//        s3.deleteObject(bucketName,filename);
//        return "File deleted";
//    }
//
//    private File multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException {
//        File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+multipart.getOriginalFilename());
//        multipart.transferTo(convFile);
//        return convFile;
//    }

}

