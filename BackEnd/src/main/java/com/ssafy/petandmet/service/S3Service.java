package com.ssafy.petandmet.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;

@Service
@Slf4j
public class S3Service {
    private final S3Client s3Client;
    private final S3Presigner presigner;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public S3Service(S3Client s3Client, S3Presigner presigner) {
        this.s3Client = s3Client;
        this.presigner = presigner;
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

    /**
     * 프로필 사진 불러오기
     *
     * @param photoUrl 사용자 db에 저장된 url
     * @return 만료시간 설정된 url
     */
    public String getProfileUrl(String photoUrl) {
        //객체 설정
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(photoUrl)
                .build();
        //객체 presigned
        GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(30))
                .getObjectRequest(getObjectRequest)
                .build();
        String presignedUrl = presigner.presignGetObject(getObjectPresignRequest).url().toString();
        log.debug(presignedUrl);

        return presignedUrl;
    }
}
