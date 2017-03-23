package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.STsendertimes;

public interface STsendertimesMapper {
	@Select("select sum(times) times, destination, car, '准时化' type "
			+ " from ( select max(1) times, '' destination, car from car_pageno"
			+ " where outrecorddate between #{startDate} and #{endDate} group by car)"
			+ " a group by destination, car")
	public List<STsendertimes> findSender(@Param("startDate") String startDate, @Param("endDate") String endDate);

	@Select("select COUNT(a.id) times, b.destination, car, '订单' type "
			+ " from terminal_order a inner join terminal_destination b on a.destination = b.id"
			+ " where send_date between #{startDate} and #{endDate}" + " group by  b.destination, car")
	public List<STsendertimes> findOrder(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
