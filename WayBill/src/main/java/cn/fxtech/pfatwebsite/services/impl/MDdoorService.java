package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.MDdoorMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDdoor;
import cn.fxtech.pfatwebsite.services.IMDdoorService;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Repository
final class MDdoorService implements IMDdoorService {
	private Logger log = Logger.getLogger(MDdoorService.class);

	private @Autowired MDdoorMapper doorMapper;

	@Override
	public List<MDdoor> findAll() {
		return doorMapper.selectAll();
	}

	@Override
	public List<MDdoor> findInWait() {
		return doorMapper.findInWait();
	}

	@Override
	public FeedBackMessage del(Integer id) {
		return new FeedBackMessage(doorMapper.deleteByPrimaryKey(id) > 0);
	}

	@Override
	public FeedBackMessage addOrUpdate(MDdoor door) {
		Example condition = new Example(MDdoor.class);
		Criteria criteria = condition.createCriteria();
		criteria.andNotEqualTo("id", door.getId());
		criteria.andEqualTo("name", door.getName());

		if (doorMapper.selectByExample(condition).size() > 0) {
			log.debug("Door duplicate: " + door.getName());
			return new FeedBackMessage(false, "物流门名称重复");
		}

		if (door.getId() == 0) {
			log.debug("Create new Door is: " + door.getName());
			return new FeedBackMessage(doorMapper.insertRecord(door) > 0);
		}
		log.debug("update Door name is: " + door.getName());
		return new FeedBackMessage(doorMapper.updateByPrimaryKey(door) > 0);
	}
}
