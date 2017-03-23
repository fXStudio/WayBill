package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import cn.fxtech.pfatwebsite.models.MDorder;
import tk.mybatis.mapper.common.Mapper;

public interface MDorderMapper extends Mapper<MDorder> {
	@Insert("INSERT INTO terminal_order (id, destination, orderno, car, ordertype, send_date) "
			+ "VALUES (dbo.f_seq(), #{destination}, #{orderno}, #{car}, #{ordertype}, #{sendDate})")
	public int insertRecord(MDorder order);

	@Select("SELECT a.id, a.car, a.destination, a.orderno, b.destination ordertype, a.send_date"
			+ " FROM terminal_order a inner join terminal_destination b on a.destination = b.id"
			+ " WHERE status = #{status}" + " ORDER BY send_date")
	@Results({ @Result(column = "send_date", property = "sendDate") })
	public List<MDorder> findAll(String status);

	@Delete("DELETE FROM terminal_orderpart WHERE orderid = #{orderid}")
	public void deleteOrderPart(@Param("orderid") Integer id);

	@Select("SELECT a.id, a.car, a.destination, a.orderno, b.destination ordertype, a.send_date, status"
			+ " FROM terminal_order a inner join terminal_destination b on a.destination = b.id and dtype= #{dtype}"
			+ " WHERE  status != '已发运' " + " ORDER BY send_date")
	@Results({ @Result(column = "send_date", property = "sendDate") })
	public List<MDorder> findCreatedOrder(@Param("dtype") String dtype);

	@Update("update terminal_order set status = '已发运' where id = #{id}")
	public int send(@Param("id") Integer id);
}
