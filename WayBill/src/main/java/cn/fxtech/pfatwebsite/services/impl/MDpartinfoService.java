package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.MDpartinfoMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDpartinfo;
import cn.fxtech.pfatwebsite.services.IMDpartinfoService;

@Repository
final class MDpartinfoService implements IMDpartinfoService {
	private Logger log = Logger.getLogger(MDpartinfoService.class);

	private @Autowired MDpartinfoMapper partinfoMapper;

	@Override
	public List<MDpartinfo> find(String orderid, String destinationId) {
		log.debug(orderid);
		return partinfoMapper.find(orderid, destinationId);
	}

	@Override
	public Object del(Integer id) {
		return new FeedBackMessage(partinfoMapper.deleteByPrimaryKey(id) > 0);
	}

	@Override
	public Object addOrUpdate(MDpartinfo partinfo) {
		if (partinfo.getId() == 0) {
			log.debug("Create new partinfo is: " + partinfo.getCqadno());
			return new FeedBackMessage(partinfoMapper.insertRecord(partinfo) > 0);
		}
		log.debug("update partinfo name is: " + partinfo.getCqadno());
		return new FeedBackMessage(partinfoMapper.updateByPrimaryKey(partinfo) > 0);
	}

	@Override
	public List<MDpartinfo> findAll() {
		return partinfoMapper.findAll();
	}
}
