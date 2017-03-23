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

	@Select("SELECT cpageno pageno, doorno, cardate recorddate, name, code FROM v_carbill WHERE car = #{car} AND outpnostate is null")
	public List<MDcarpageno> findPartByCar(String car);
	
	@Select("select partname partno, COUNT(id) partcount from dbo.pageno_part where exists ("
			+ " SELECT cpageno FROM v_carbill WHERE car = #{car} AND outpnostate is null and CPAGENO = pageno"
			+ " ) group by partname")
	public List<MDcontainerpart> findContainerPartByCar(String car);

	@Update("UPDATE car_pageno set outpnostate = 1, outrecorddate = getdate(), outemp = #{emp} WHERE car= #{car} AND sequence = ("
			+ "SELECT MAX(sequence) FROM car_pageno WHERE car = #{car} AND outrecorddate is null)")
	public void update(@Param("car") String car, @Param("emp") String emp);
	
	@Update("DELETE car_state WHERE car = #{car}")
	public void delCar(@Param("car") String car);

	@Delete("DELETE car_pageno WHERE car= #{car} AND sequence = ( "
			+ "SELECT MAX(sequence) FROM car_pageno WHERE car = #{car} AND outrecorddate is null)")
	public void del(@Param("car") String car);
}
