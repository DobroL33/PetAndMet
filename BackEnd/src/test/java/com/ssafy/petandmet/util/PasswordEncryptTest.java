package com.ssafy.petandmet.util;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PasswordEncryptTest {
    @Test
    void 임의_salt_생성_테스트() {
        String salt = PasswordEncryptUtil.generateSalt();
        System.out.println("salt = " + salt);
    }

    @Test
    void 비밀번호_암호화_테스트() {
        String salt = PasswordEncryptUtil.generateSalt();
        String password = "qwe123";
        String encryptedPassword = PasswordEncryptUtil.getEncrypt(password, salt);
        System.out.println("encryptedPassword = " + encryptedPassword);
        String inputPassword = "qwe123";
        String encryptedInputPassword = PasswordEncryptUtil.getEncrypt(inputPassword, salt);
        assertThat(encryptedInputPassword).isEqualTo(encryptedPassword);
    }
}
