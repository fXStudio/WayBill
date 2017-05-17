package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import cn.fxtech.pfatwebsite.models.MDtfassgroup;

public interface MDtfassgroupMapper {
	@Insert("INSERT INTO terminal_tfassgroup (group_name, remark) VALUES (#{groupName}, #{remark})")
	public int insertRecord(MDtfassgroup group);

	@Select("select id, group_name, remark from terminal_tfassgroup order by group_name")
	@Results({ @Result(column = "group_name", property = "groupName") })
	public List<MDtfassgroup> findAll();

	@Select("select  id, group_name, remark from terminal_tfassgroup where group_name = #{groupName}")
	@Results({ @Result(column = "group_name", property = "groupName") })
	public List<MDtfassgroup> find(MDtfassgroup group);

	@Delete("delete from terminal_tfassrelation where group_id = #{id};delete from terminal_tfassgroup where id = #{id}")
	public int del(@Param("id") Integer id);

	@Update("update terminal_tfassgroup set group_name = #{groupName}, remark = #{remark} where id = #{id}")
	public int update(MDtfassgroup group);

	@Delete("delete from terminal_tfassrelation where printset_id = #{id}")
	public int delGroupitem(@Param("id") Integer id);

	@Insert("insert into terminal_tfassrelation (group_id, printset_id) values (#{groupId}, #{iprintgroupid})")
	public void addOrUpdate(@Param("groupId") String groupId, @Param("iprintgroupid") Integer  iprintgroupid);
}
