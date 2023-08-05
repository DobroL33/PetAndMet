package com.ssafy.petandmet.service;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.io.InputStream;

@Service
public class S3Service {
    private final S3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public boolean uploadFile(MultipartFile file, String fileName) throws FileUploadException {
        try (InputStream inputStream = file.getInputStream()) {
            // 파일 데이터를 바이트 배열로 변환
            byte[] fileBytes = inputStream.readAllBytes();

            // S3에 파일 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build(), RequestBody.fromBytes(fileBytes));

            return true;

        } catch (IOException | S3Exception e) {
            throw new FileUploadException("파일 처리 중 오류 발생: " + e.getMessage());
        }
    }
}
