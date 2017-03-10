package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.STkanban;

public interface STkanbanMapper {
	@Select("SELECT * FROM v_kanban ORDER BY doorno,  printdate DESC, cast(REPLACE(CODE, '-', '') as int) desc, cdescrip")
	public List<STkanban> findAll();
}
