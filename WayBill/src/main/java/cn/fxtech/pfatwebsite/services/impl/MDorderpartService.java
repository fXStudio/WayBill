package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.MDorderpartMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDorderpart;
import cn.fxtech.pfatwebsite.models.MDpartinfo;
import cn.fxtech.pfatwebsite.services.IMDorderpartService;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Repository
final class MDorderpartService implements IMDorderpartService {
	private Logger log = Logger.getLogger(MDorderpartService.class);

	private @Autowired MDorderpartMapper orderpartMapper;

	@Override
	public List<MDorderpart> findRecords(String orderid) {
		Example condition = new Example(MDorderpart.class);
		Criteria criteria = condition.createCriteria();
		criteria.andEqualTo("orderid", orderid);
		condition.setOrderByClause("partno");

		return orderpartMapper.selectByExample(condition);
	}

	@Override
	public FeedBackMessage del(Integer id) {
		return new FeedBackMessage(orderpartMapper.deleteByPrimaryKey(id) > 0);
	}

	@Override
	public Object addOrUpdate(Integer orderId, MDpartinfo[] items) {
		try {
			for (MDpartinfo item : items) {
				MDorderpart part = new MDorderpart();
				part.setOrderid(orderId);
				part.setPartno(item.getCqadno());
				part.setPkgcount(1);
				part.setPkgquantity(item.getCquantity());
				part.setTotalcount(item.getCquantity());
				part.setPartdesc(item.getCdesc());
				part.setIsscan(item.getIsscan());

				orderpartMapper.insertRecord(part);
			}
			return new FeedBackMessage(true);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "保存失败，请联系系统管理员");
	}

	@Override
	public Object update(MDorderpart item) {
		if (item.getId() == 0) {
			return new FeedBackMessage(orderpartMapper.insertRecord(item) > 0, "新增失败，请联系系统管理员");
		}
		return new FeedBackMessage(orderpartMapper.updateByPrimaryKey(item) > 0, "修改失败，请联系系统管理员");
	}

	@Override
	public List<MDorderpart> findScanRecords(String orderid) {
		return orderpartMapper.findScanRecords(orderid);
	}
}
