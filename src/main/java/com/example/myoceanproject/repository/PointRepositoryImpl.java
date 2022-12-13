package com.example.myoceanproject.repository;

import com.example.myoceanproject.domain.PointDTO;
import com.example.myoceanproject.domain.QPointDTO;
import com.example.myoceanproject.type.PointCheckType;
import com.example.myoceanproject.type.PointType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.example.myoceanproject.entity.QPoint.point;

@Repository
public class PointRepositoryImpl implements PointCustomRepository{

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public List<PointDTO> findAllPointByUser(Long userId) {
        List<PointDTO> pointDTOS=jpaQueryFactory.select(new QPointDTO(
                point.user.userId,
                point.groupName,
                point.pointAmountHistory,
                point.createDate,
                point.pointType,
                point.pointMerchantUid,
                point.pointImpUid,
                point.pointContent,
                point.pointId,
                point.pointCheckType
        )).from(point).where(point.user.userId.eq(userId)).orderBy(point.pointId.desc()).fetch();
        return pointDTOS;
    }

    @Override
    public List<PointDTO> findAllPayPoint(Long userId,PointType pointType) {
        List<PointDTO> pointDTOS=jpaQueryFactory.select(new QPointDTO(
                point.user.userId,
                point.groupName,
                point.pointAmountHistory,
                point.createDate,
                point.pointType,
                point.pointMerchantUid,
                point.pointImpUid,
                point.pointContent,
                point.pointId,
                point.pointCheckType
        )).from(point).where(point.user.userId.eq(userId).and(point.pointType.eq(pointType)).and(point.pointCheckType.eq(PointCheckType.BEFOREREFUND))).orderBy(point.pointId.desc()).fetch();
        return pointDTOS;
    }

    @Override
    public List<PointDTO> findAllRefundPoint(PointType pointType) {
        List<PointDTO> pointDTOS=jpaQueryFactory.select(new QPointDTO(
                point.user.userId,
                point.groupName,
                point.pointAmountHistory,
                point.createDate,
                point.pointType,
                point.pointMerchantUid,
                point.pointImpUid,
                point.pointContent,
                point.pointId,
                point.pointCheckType
        )).from(point).where(point.pointType.eq(pointType).and(point.pointCheckType.eq(PointCheckType.BEFOREREFUND))).orderBy(point.pointId.desc()).fetch();
        return pointDTOS;
    }

}