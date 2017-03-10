package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.STsendcomp;

public interface STsendcompMapper {
	@Select("SELECT * FROM v_sendcomp")
	public List<STsendcomp> findAll();
}
