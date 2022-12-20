package com.example.myoceanproject.handler;

import com.example.myoceanproject.domain.ChattingDTO;
import com.example.myoceanproject.domain.GroupDTO;
import com.example.myoceanproject.repository.GroupMemberRepository;
import com.example.myoceanproject.repository.GroupRepositoryImpl;
import com.example.myoceanproject.repository.UserRepositoryImpl;
import com.example.myoceanproject.repository.chatting.ChattingRepositoryImpl;
import com.example.myoceanproject.service.chattingService.ChattingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final GroupRepositoryImpl groupRepositoryImpl;
    private final ObjectMapper objectMapper;
    private final ChattingRepositoryImpl chattingRepository;
//    public static List<WebSocketSession> sessions = new ArrayList<>();

    private final UserRepositoryImpl userRepositoryImple;



    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info("메세지 전송 = {} : {}",session,message.getPayload());
        String msg = message.getPayload();
        ChattingDTO chattingDTO = objectMapper.readValue(msg,ChattingDTO.class);
        GroupDTO groupDTO = groupRepositoryImpl.findGroupByGroupId(chattingDTO.getGroupId());
        Long groupMemberId =chattingRepository.findGroupMemberIdByUserIdAndGroupId(chattingDTO.getSenderUserId(), chattingDTO.getGroupId());

        String userFileUuid = userRepositoryImple.findByUserId(chattingDTO.getSenderUserId()).getUserFileUuid();
        String userFilePath = userRepositoryImple.findByUserId(chattingDTO.getSenderUserId()).getUserFilePath();
        String userFileName = userRepositoryImple.findByUserId(chattingDTO.getSenderUserId()).getUserFileName();

        if(userFileUuid == null) {
            chattingDTO.setImageSrc("/imgin/main/logo.png");
        }else{
            chattingDTO.setImageSrc("/mypage/display?fileName=" + userFilePath + "/" + userFileUuid + "_" + userFileName);
        }

        log.info("============================================================");
        log.info("============================================================");
        log.info("============================================================");
        log.info("webSocketHandler들어옴");
        log.info(session.toString());
        log.info("============================================================");
        log.info("============================================================");
        log.info("============================================================");

        chattingDTO.setSenderGroupMemberId(groupMemberId);

//        세션 가지고 있음
        groupDTO.handleMessage(session,chattingDTO,objectMapper);
    }



}