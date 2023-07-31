package com.ssafy.petandmet.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class PasswordEncryptUtil {
    private static final String ENCRYPT_ALGORITHM = "SHA-256";

    /**
     * 사용자의 비밀번호를 salt와 같이 암호화
     *
     * @param password 사용자가 입력한 비밀번호
     * @param salt     비밀번호와 같이 암호화할 salt 값
     * @return 암호화된 비밀번호
     */
    public static String getEncrypt(String password, String salt) {
        return getEncrypt(password.getBytes(), salt.getBytes());
    }

    /**
     * 실제로 비밀번호 암호화
     *
     * @param password 바이트로 변환된 비밀번호
     * @param salt     바이트로 표현된 salt
     * @return 암호화된 비밀번호
     */
    public static String getEncrypt(byte[] password, byte[] salt) {
        byte[] combinedPassword = new byte[password.length + salt.length];

        System.arraycopy(password, 0, combinedPassword, 0, password.length);
        System.arraycopy(salt, 0, combinedPassword, password.length, salt.length);

        try {
            MessageDigest md = MessageDigest.getInstance(ENCRYPT_ALGORITHM);
            md.update(combinedPassword);

            byte[] hashedCombinedPassword = md.digest();

            StringBuilder encryptedPassword = new StringBuilder();
            for (int i = 0; i < hashedCombinedPassword.length; i++) {
                encryptedPassword.append(Integer.toString((hashedCombinedPassword[i] & 0xFF) + 256, 16).substring(1));
            }

            return encryptedPassword.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 비밀번호 암호화에 사용할 salt 생성
     *
     * @return 임의로 생성된 salt 값
     */
    public static String generateSalt() {
        Random random = new Random();

        byte[] salt = new byte[8];
        random.nextBytes(salt);

        StringBuilder generatedSalt = new StringBuilder();
        for (byte b : salt) {
            generatedSalt.append(String.format("%02x", b));
        }

        return generatedSalt.toString();
    }
}