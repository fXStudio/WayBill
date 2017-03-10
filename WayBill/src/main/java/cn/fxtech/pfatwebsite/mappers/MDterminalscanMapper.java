package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDterminalscan;

public interface MDterminalscanMapper {
	@Insert("INSERT INTO terminal_scan (id, cflag, cpartno, ccount, orderpart_id) "
			+ " SELECT #{id}, id, #{cpartno}, #{ccount}, orderid " + " from terminal_orderpart "
			+ " WHERE id = #{orderpartId} and totalcount >= #{ccount}")
	public int insertRecord(MDterminalscan obj);

	@Select("SELECT * FROM terminal_scan WHERE id = #{id}")
	public List<MDterminalscan> find(String obj);

	@Delete("DELETE FROM terminal_scan WHERE scaned = (SELECT max(scaned) FROM terminal_scan WHERE orderpart_id = #{orderId} )")
	public int del(@Param("orderId") String orderId);

	@Delete("DELETE FROM terminal_scan WHERE orderpart_id = #{orderId}")
	public int delAll(@Param("orderId") String orderId);
}
