package com.example.myoceanproject.service;

import com.example.myoceanproject.domain.PointDTO;
import com.example.myoceanproject.entity.Point;
import com.example.myoceanproject.entity.User;
import com.example.myoceanproject.repository.PointRepository;
import com.example.myoceanproject.repository.PointRepositoryImpl;
import com.example.myoceanproject.repository.UserRepository;
import com.example.myoceanproject.type.PointType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepositoryImpl pointRepositoryImpl;
    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    public List<PointDTO> findAllPointByUser(Long userId){return pointRepositoryImpl.findAllPointByUser(userId);}
    public List<PointDTO> findAllPayPointByUser(Long userId,PointType pointType){return pointRepositoryImpl.findAllPayPoint(userId,pointType);}
    public List<PointDTO> findAllRefundPointByAllUser(PointType pointType){return pointRepositoryImpl.findAllRefundPoint(pointType);}

    public void questReward(PointDTO pointDTO){
        Point point = pointDTO.toEntity();
        point.changeUser(userRepository.findById(pointDTO.getUserId()).get());

        pointRepository.save(point);

        int updateTotalPoint=point.getUser().getUserTotalPoint()+Integer.parseInt(String.valueOf(pointDTO.getPointAmountHistory()));
        point.getUser().updateUserTotalPoint(updateTotalPoint);
    }
}