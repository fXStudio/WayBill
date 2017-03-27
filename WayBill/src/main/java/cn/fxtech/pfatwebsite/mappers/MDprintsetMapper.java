package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDprintset;

public interface MDprintsetMapper {
	@Select("select cDescrip, iprintgroupid from v_printset where not exists ("
			+ " select group_id from terminal_groupprint where printset_id = iprintgroupid)")
	public List<MDprintset> findAll();

	@Select("select cDescrip, iprintgroupid from v_printset where exists ("
			+ " select group_id from terminal_groupprint where printset_id = iprintgroupid and group_id = #{groupId})")
	public List<MDprintset> find(@Param("groupId") Integer groupId);

	@Select("select group_name cDescrip from terminal_group order by group_name")
	public List<MDprintset> listPrintGroup();
}
