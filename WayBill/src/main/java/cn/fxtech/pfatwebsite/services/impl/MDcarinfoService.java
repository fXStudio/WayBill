package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.MDcarinfoMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarinfo;
import cn.fxtech.pfatwebsite.services.IMDcarinfoService;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Repository
final class MDcarinfoService implements IMDcarinfoService {
	private Logger log = Logger.getLogger(MDcarinfoService.class);

	private @Autowired MDcarinfoMapper carinfoMapper;

	@Override
	public List<MDcarinfo> findAll() {
		return carinfoMapper.findAll();
	}

	@Override
	public List<MDcarinfo> findCarInWaitl() {
		return carinfoMapper.findCarInWait();
	}

	@Override
	public FeedBackMessage del(Integer id) {
		return new FeedBackMessage(carinfoMapper.deleteByPrimaryKey(id) > 0);
	}

	@Override
	public FeedBackMessage addOrUpdate(MDcarinfo car) {
		Example condition = new Example(MDcarinfo.class);
		Criteria criteria = condition.createCriteria();
		criteria.andNotEqualTo("id", car.getId());
		criteria.andEqualTo("car", car.getCar());

		if (carinfoMapper.selectByExample(condition).size() > 0) {
			log.debug("Car duplicate: " + car.getCar());
			return new FeedBackMessage(false, "车牌重复");
		}

		if (car.getId() == 0) {
			log.debug("Create new car is: " + car.getCar());
			return new FeedBackMessage(carinfoMapper.insertRecord(car) > 0);
		}
		log.debug("update dept name is: " + car.getCar());
		return new FeedBackMessage(carinfoMapper.updateByPrimaryKey(car) > 0);
	}
}
