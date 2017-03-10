package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.STpagepart;

public interface STpagepartMapper {
	@Select("SELECT * FROM pageno_part WHERE pageno = #{pageno}")
	public List<STpagepart> findByPageNo(@Param("pageno") String pageno);
}
