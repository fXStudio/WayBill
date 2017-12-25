package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import cn.fxtech.pfatwebsite.models.MDcarpageno;
import cn.fxtech.pfatwebsite.models.MDcontainerpart;

public interface MDcarpagenoMapper {
	@Select("SELECT car, max(recorddate) recorddate, doorno FROM car_pageno WHERE outrecorddate is null GROUP BY car, doorno ORDER BY recorddate")
	public List<MDcarpageno> findAllCar();

	@Select("SELECT cpageno pageno, doorno, cardate recorddate, name, code "
			+ "  FROM v_carbill "
			+ "  WHERE doorno = #{doorno} AND outpnostate is null "
			+ "  GROUP BY cpageno, doorno, cardate, name, code"
			+ "  ORDER BY cast(REPLACE(CODE, '-', '') as int)")
	public List<MDcarpageno> findPartByCar(String doorno);
	
	@Select("SELECT partname partno, COUNT(id) partcount from dbo.pageno_part WHERE exists ("
			+ "  SELECT cpageno FROM v_carbill WHERE doorno = #{doorno} AND outpnostate is null AND CPAGENO = pageno"
			+ " ) GROUP BY partname")
	public List<MDcontainerpart> findContainerPartByDoor(String doorno);

	@Update("UPDATE car_pageno SET outpnostate = 1, outrecorddate = getdate(), outemp = #{emp}, car=#{car} WHERE doorno= #{doorno} and outrecorddate is null")
	public void update(@Param("doorno") String doorno, @Param("car") String car,@Param("emp") String emp);
	
	@Delete("DELETE car_pageno WHERE doorno= #{doorno} AND outrecorddate is null")
	public void del(@Param("doorno") String doorno);
}
