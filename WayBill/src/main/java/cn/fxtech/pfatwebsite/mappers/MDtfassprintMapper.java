package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDprintset;

public interface MDtfassprintMapper {
	@Select("select ccartypedesc,  ctfassname cDescrip, id iprintgroupid from printSet where not exists ("
			+ " select group_id from terminal_tfassrelation where printset_id = id)")
	public List<MDprintset> findAll();

	@Select("select ccartypedesc,  ctfassname cDescrip, id  iprintgroupid from printSet where exists ("
			+ " select group_id from terminal_tfassrelation where printset_id = id and group_id = #{groupId})")
	public List<MDprintset> find(@Param("groupId") Integer groupId);

	@Select("select group_name cDescrip from terminal_tfassgroup order by group_name")
	public List<MDprintset> listPrintGroup();
}
