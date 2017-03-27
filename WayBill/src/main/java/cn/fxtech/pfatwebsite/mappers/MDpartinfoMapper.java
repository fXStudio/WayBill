package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDpartinfo;
import tk.mybatis.mapper.common.Mapper;

public interface MDpartinfoMapper extends Mapper<MDpartinfo> {
	@Select("select * from terminal_partnifo where destination_id = #{destinationId} and not exists("
			+ " select id from terminal_orderpart where cqadno= partno and orderid = #{orderid}) order by cqadno")
	public List<MDpartinfo> find(@Param("orderid") String orderid, @Param("destinationId") String destinationId);

	@Insert("insert into terminal_partnifo (cqadno, cdesc, cquantity, destination_id, isscan) values (#{cqadno}, #{cdesc}, #{cquantity}, #{destinationId}, #{isscan})")
	public int insertRecord(MDpartinfo partinfo);

	@Select("select a.id, cqadno, cdesc, cquantity, b.destination, isscan from terminal_partnifo a inner join terminal_destination b on a.destination_id = b.id order by destination, cqadno")
	@Results({@Result(column = "destination", property = "destinationId")})
	public List<MDpartinfo> findAll();
}
