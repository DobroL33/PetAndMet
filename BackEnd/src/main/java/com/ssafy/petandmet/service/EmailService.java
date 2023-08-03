package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.EmailType;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
    @Value("${spring.mail.username}")
    private String fromEmail;
    private final JavaMailSender javaMailSender;

    /**
     * 이메일 전송
     *
     * @param type     이메일 보내는 내용 타입
     * @param toEmail  이메일 보낼 곳
     * @param contents 이메일에 들어갈 내용
     */
    public void send(String type, String toEmail, Map<String, String> contents) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(toEmail);

            if (type.equals(EmailType.CODE.toString())) {
                mimeMessageHelper.setSubject("[petandmet] 인증 코드 안내");
                mimeMessageHelper.setText(contents.get(EmailType.CODE.toString()), true);
            } else if (type.equals(EmailType.ID.toString())) {
                mimeMessageHelper.setSubject("[petandmet] 아이디 안내");
                mimeMessageHelper.setText(contents.get(EmailType.ID.toString()), true);
            }

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
