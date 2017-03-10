package cn.fxtech.pfatwebsite.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.fxtech.pfatwebsite.models.MDorderpart;
import tk.mybatis.mapper.common.Mapper;

public interface MDorderpartMapper extends Mapper<MDorderpart> {
	@Insert(" INSERT INTO terminal_orderpart (partno, pkgcount, totalcount, orderid, pkgquantity, orderno, partdesc, isscan) "
			+ " select #{partno}, #{pkgcount}, #{totalcount}, #{orderid}, #{pkgquantity}, orderno, #{partdesc} , #{isscan}"
			+ " from terminal_order where id = #{orderid}")
	public int insertRecord(MDorderpart part);

	@Select("SELECT id, partno, pkgcount, totalcount, orderid, pkgcount * pkgquantity as pkgquantity, "
			+ " orderno, partdesc, isscan"
			+ " FROM terminal_orderpart"
			+ " WHERE orderid = #{orderid} and totalcount > 0"
			+ " ORDER BY isscan desc, partno")
	public List<MDorderpart> findScanRecords(@Param("orderid") String orderid);
}
