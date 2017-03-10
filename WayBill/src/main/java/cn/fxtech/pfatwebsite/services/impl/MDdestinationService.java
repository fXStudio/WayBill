package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.MDdestinationMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDdestination;
import cn.fxtech.pfatwebsite.services.IMDdestinationService;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Repository
final class MDdestinationService implements IMDdestinationService {
	private Logger log = Logger.getLogger(MDdestinationService.class);

	private @Autowired MDdestinationMapper destinationMapper;

	@Override
	public List<MDdestination> findAll() {
		log.debug("Find all Destination");
		return destinationMapper.findAll();
	}

	@Override
	public Object addOrUpdate(MDdestination dest) {
		Example condition = new Example(MDdestination.class);
		Criteria criteria = condition.createCriteria();
		criteria.andNotEqualTo("id", dest.getId());
		criteria.andEqualTo("destination", dest.getDestination());

		if (destinationMapper.selectByExample(condition).size() > 0) {
			log.debug("Destination duplicate: " + dest.getDestination());
			return new FeedBackMessage(false, "客户名称重复");
		}

		if (dest.getId() == 0) {
			log.debug("Create new Destination is: " + dest.getDestination());
			return new FeedBackMessage(destinationMapper.insertRecord(dest) > 0);
		}
		log.debug("update Destination name is: " + dest.getDestination());
		return new FeedBackMessage(destinationMapper.updateByPrimaryKey(dest) > 0);
	}

	@Override
	public Object del(Integer id) {
		return new FeedBackMessage(destinationMapper.deleteByPrimaryKey(id) > 0);
	}
}
