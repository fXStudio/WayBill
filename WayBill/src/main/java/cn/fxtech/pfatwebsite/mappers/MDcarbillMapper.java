package cn.fxtech.pfatwebsite.mappers;

import java.sql.Timestamp;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDcarbill;

public interface MDcarbillMapper {
	@Select("SELECT * FROM v_carbill WHERE exists ( "
			+ "  select print_descrip from v_printgroup where  print_descrip = cdescrip and group_name = #{groupName}"
			+ ") and outdate is null ORDER BY id, cpageno")
	public List<MDcarbill> findAll(@Param("groupName") String groupName);

	@Insert("INSERT INTO CAR_PAGENO(CAR, PAGENO, RECORDDATE, EMP, DOORNO, sequence) VALUES("
			+ "#{car}, #{pageno}, #{date}, #{emp}, #{doorno}, #{seq})")
	public void insertCarpageno(@Param("car") String car, @Param("pageno") String pageno, @Param("emp") String emp,
			@Param("date") Timestamp date, @Param("doorno") String doorno, @Param("seq") Integer seq);

	@Delete("DELETE FROM car_state WHERE car=#{car}")
	public void delCarstate(@Param("car") String car);

	@Insert("INSERT INTO CAR_STATE(car, carstate, recorddate, emp)  VALUES(#{car}, #{state}, #{date}, #{emp})")
	public void insertCarstate(@Param("car") String car, @Param("state") String state, @Param("date") Timestamp date,
			@Param("emp") String emp);

	@Select("SELECT ISNULL(max(sequence), 0) + 1 FROM CAR_PAGENO WHERE car = #{car}")
	public int getSeq(@Param("car") String car);
}
