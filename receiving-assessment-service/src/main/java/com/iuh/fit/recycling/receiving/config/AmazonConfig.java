package com.iuh.fit.recycling.receiving.config;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class AmazonConfig {
//
//    @Value("${aws.accessKey}")
//    private String aki;
//
//    @Value("${aws.secretKey}")
//    private String ski;
//
//    @Value("${aws.region}")
//    private String region;
//
//    @Bean
//    public AmazonS3 s3() {
//        AWSCredentials awsCredentials =
//                new BasicAWSCredentials(aki, ski);
//        return AmazonS3ClientBuilder
//                .standard()
//                .withRegion(region)
//                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
//                .build();
//    }

}
