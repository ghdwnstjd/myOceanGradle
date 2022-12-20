package com.example.myoceanproject.entity;

import com.example.myoceanproject.domain.AskDTO;
import com.example.myoceanproject.type.AskCategory;
import com.example.myoceanproject.type.AskStatus;
import com.example.myoceanproject.type.ReadStatus;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "TBL_ASK")
@Getter
@ToString(exclude = "user")
@NoArgsConstructor/*(access = AccessLevel.PROTECTED)*/
public class Ask extends Period{
    @Id
    @GeneratedValue
    private Long askId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;//유저가 null일 경우 자주 묻는 질문

    @Enumerated(EnumType.STRING)
    private AskStatus askStatus; //Enum
    private String askTitle;
    @Column(length=10000)
    private String askContent;
    @NotNull
    @Enumerated(EnumType.STRING)
    private AskCategory askCategory;

    private String answer;


    //  양방향
    public void changeUser(User user){
        this.user = user;
        user.getAsks().add(this);
    }

    @Builder
    public Ask(String askTitle, String askContent, AskStatus askStatus, AskCategory askCategory, String answer,User user) {
        this.askTitle = askTitle;
        this.askContent = askContent;
        this.askStatus = askStatus;
        this.askCategory = askCategory;
        this.answer = answer;
        this.user=user;
    }

    public void setUser(User user){this.user=user;}
    //  관리자 답변이 발송되면 askStatus의 값이 변하므로 update
    public void updateStatus(AskStatus status){
        this.askStatus = status;
    }
    //  작성 후 문의하기 제목, 내용을 수정할때 update
    public void update(AskDTO askDTO){
        this.askTitle=askDTO.getAskTitle();
        this.askContent=askDTO.getAskContent();
    }
    public void updateAnswer(String answer){
        this.answer = answer;
    }
}