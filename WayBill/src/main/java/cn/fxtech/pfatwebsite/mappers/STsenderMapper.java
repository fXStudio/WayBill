package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.STsender;

public interface STsenderMapper {
	@Select("Select CTFASS partno, count(id) partcount, '准时化' type from print_data where "
			+ " cpageno in( select pageno from car_pageno where outrecorddate between #{startDate} and #{endDate})"
			+ " group by CTFASS")
	public List<STsender> findSender(@Param("startDate") String startDate, @Param("endDate") String endDate);

	@Select("select partno partno, sum(pkgcount * pkgquantity) partcount, '运单' type from terminal_orderpart "
			+ " where orderid in ( select id from terminal_order where status='已发运' and "
			+ " send_date between #{startDate} and #{endDate})" + " group by partno")
	public List<STsender> findOrder(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
