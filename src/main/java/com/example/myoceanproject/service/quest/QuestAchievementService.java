package com.example.myoceanproject.service.quest;

import com.example.myoceanproject.domain.QuestDTO;
import com.example.myoceanproject.repository.quest.QuestAchievementRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestAchievementService {

    private final QuestAchievementRepositoryImpl questAchievementRepositoryImpl;

//    유저 아이디를 넘겨주면 해당 유저가 달성한 퀘스트를 dto로 반환한다.
    public List<QuestDTO> showMyAchievement(Long userId){
        return questAchievementRepositoryImpl.findQuestAchievementByUserId(userId);
    }
}
