package com.example.myoceanproject.controller.manager;


import com.example.myoceanproject.domain.Criteria;
import com.example.myoceanproject.domain.UserDTO;
import com.example.myoceanproject.repository.UserRepositoryImpl;
import com.example.myoceanproject.service.UserService;
import com.example.myoceanproject.service.community.CommunityReplyService;
import com.example.myoceanproject.type.UserAccountStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user/*")
public class ManageUserController {
    @Autowired
    private CommunityReplyService replyService;
//    브라우저에서 JSON 타입으로 데이터를 전송하고 서버에서는 댓글의 처리 결과에 따라 문자열로 결과를 리턴한다.
//    consumes : 전달받은 데이터의 타입
//    produces : 콜백함수로 결과를 전달할 때의 타입
//    @RequestBody : 전달받은 데이터를 알맞는 매개변수로 주입
//    ResponseEntity : 서버의 상태코드, 응답 메세지 등을 담을 수 있는 타입

    @Autowired
    private UserService userService;

    @GetMapping("/{status}/{page}/{keyword}")
//    public UserDTO list(@RequestBody Criteria criteria){
    public UserDTO list(@PathVariable String status, @PathVariable int page, @PathVariable(required = false) String keyword){
        log.info("dddd");

        Criteria criteria = new Criteria();
        criteria.setKeyword(keyword);
        criteria.setPage(page);
        criteria.setStatus(status);
        Pageable pageable = PageRequest.of(criteria.getPage() == 0 ? 0 : criteria.getPage()-1, 10);

        UserAccountStatus userAccountStatus = (criteria.getStatus().equals("active") ? UserAccountStatus.ACTIVE : UserAccountStatus.BANNED);

        Page<UserDTO> userDTOPage= userService.showUserByStatus(pageable, userAccountStatus, criteria);
        int endPage = (int)(Math.ceil(userDTOPage.getNumber()+1 / (double)10)) * 10;
        if(userDTOPage.getTotalPages() < endPage){
            endPage = userDTOPage.getTotalPages() == 0 ? 1 : userDTOPage.getTotalPages();
        }
        log.info(endPage + "end");

        UserDTO userDTO = new UserDTO();
        userDTO.setUserList(userDTOPage.getContent());
        userDTO.setEndPage(endPage);


        return userDTO;
    }
    @GetMapping("/{status}/{page}")
//    public UserDTO list(@RequestBody Criteria criteria){
    public UserDTO list(@PathVariable String status, @PathVariable int page){
        log.info("---------------------------------------------------------");
        log.info("dddd");
        log.info("---------------------------------------------------------");

        Criteria criteria = new Criteria();
        criteria.setPage(page);
        criteria.setStatus(status);
        Pageable pageable = PageRequest.of(criteria.getPage() == 0 ? 0 : criteria.getPage()-1, 10);

        UserAccountStatus userAccountStatus = (criteria.getStatus().equals("active") ? UserAccountStatus.ACTIVE : UserAccountStatus.BANNED);

        Page<UserDTO> userDTOPage= userService.showUserByStatus(pageable, userAccountStatus, criteria);
        int endPage = (int)(Math.ceil(userDTOPage.getNumber()+1 / (double)10)) * 10;
        if(userDTOPage.getTotalPages() < endPage){
            endPage = userDTOPage.getTotalPages() == 0 ? 1 : userDTOPage.getTotalPages();
        }
        log.info(endPage + "end");

        UserDTO userDTO = new UserDTO();
        userDTO.setUserList(userDTOPage.getContent());
        userDTO.setEndPage(endPage);


        return userDTO;
    }

}