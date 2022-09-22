package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dto.MailDto;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService {

    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS="newstudy.corporation@gmail.com";

    public MailDto createMailAndChangePassword(String userEmail, String userName) {
        String str = getTempPassword();
        MailDto dto = new MailDto();
        dto.setAddress(userEmail);
        dto.setTitle(userName + "님의 [NEWSTUDY] 인증번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요 :) \n[NEWSTUDY] 인증번호 안내 관련 이메일 입니다. \n"
                + "[" + userName + "]" + "님의  인증번호는 " + str + " 입니다. ");
        dto.setTmpPassword(str);
        return dto;
    }

    public String getTempPassword() {
        String str = "";
        for (int i = 0; i < 8; i++) {
            int rndVal = (int) (Math.random() * 62);
            if (rndVal < 10) {
                str += rndVal;
            } else if (rndVal > 35) {
                str += (char) (rndVal + 61);
            } else {
                str += (char) (rndVal + 55);
            }
        }
        return str;
    }

    public void mailSend(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setFrom(MailService.FROM_ADDRESS);
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());

        mailSender.send(message);
        System.out.println("이메일 전송 완료!");
    }
}
