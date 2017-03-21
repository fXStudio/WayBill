package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDcarinfo;
import tk.mybatis.mapper.common.Mapper;

public interface MDcarinfoMapper extends Mapper<MDcarinfo> {
	@Insert("INSERT INTO car_info (car) VALUES (#{car})")
	public int insertRecord(MDcarinfo car);
	
	@Select("SELECT * FROM car_info WHERE NOT EXISTS (SELECT id FROM car_state WHERE car = car_info.car) order by car ")
	public List<MDcarinfo> findCarInWait();
}
