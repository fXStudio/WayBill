package cn.fxtech.pfatwebsite.mappers;

import java.sql.Timestamp;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDcarbill;

public interface MDcarbillMapper {
	@Select("SELECT * FROM v_carbill WHERE exists ( "
			+ "  select print_descrip from v_printgroup where  print_descrip = cdescrip and group_name = #{groupName}"
			+ ") and outdate is null ORDER BY id, cpageno")
	public List<MDcarbill> findAll(@Param("groupName") String groupName);

	@Insert("INSERT INTO CAR_PAGENO(PAGENO, RECORDDATE, EMP, DOORNO) VALUES("
			+ "#{pageno}, #{date}, #{emp}, #{doorno})")
	public void insertCarpageno(@Param("pageno") String pageno, @Param("emp") String emp, @Param("date") Timestamp date,
			@Param("doorno") String doorno);
}
