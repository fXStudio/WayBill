package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDprintset;

public interface MDprintsetMapper {
	@Select("select cDescrip from printset group by cDescrip")
	public List<MDprintset> findAll();
}
