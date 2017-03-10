package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDdoor;
import tk.mybatis.mapper.common.Mapper;

public interface MDdoorMapper extends Mapper<MDdoor> {
	@Insert("INSERT INTO terminal_door (name, remark) VALUES (#{name}, #{remark})")
	public int insertRecord(MDdoor door);

	@Select("SELECT * FROM terminal_door WHERE not exists ("
			+ " SELECT id FROM car_pageno WHERE outrecorddate is null AND doorno = name)")
	public List<MDdoor> findInWait();
}
