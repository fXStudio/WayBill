package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import cn.fxtech.pfatwebsite.mappers.MDcarpagenoMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarpageno;
import cn.fxtech.pfatwebsite.services.IMDcarpagenoService;

@Repository
final class MDcarpagenoService implements IMDcarpagenoService {
	private Logger log = Logger.getLogger(MDcarpagenoService.class);

	private @Autowired MDcarpagenoMapper carpagenoMapper;

	@Override
	public List<MDcarpageno> findAllCar() {
		log.debug("Select prepared car.");
		return carpagenoMapper.findAllCar();
	}

	@Override
	public List<MDcarpageno> findPartByCar(String car) {
		log.debug("Select part in car: " + car);
		return carpagenoMapper.findPartByCar(car);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public FeedBackMessage update(String car, String emp) {
		try {
			carpagenoMapper.update(car, emp);
			carpagenoMapper.delCar(car);
			
			return new FeedBackMessage(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "确认发货失败");
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public FeedBackMessage del(String car) {
		try {
			carpagenoMapper.del(car);
			carpagenoMapper.delCar(car);
			
			return new FeedBackMessage(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "撤销装载失败");
	}
}
