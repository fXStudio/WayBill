package cn.fxtech.pfatwebsite.services.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import cn.fxtech.pfatwebsite.mappers.MDterminalscanMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDterminalscan;
import cn.fxtech.pfatwebsite.services.IMDterminalscanService;

@Repository
final class MDterminalscanService implements IMDterminalscanService {
	private Logger log = Logger.getLogger(MDterminalscanService.class);

	private @Autowired MDterminalscanMapper terminalscanMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public FeedBackMessage del(String orderId) {
		try {
			log.debug("Delete scan data by id: " + orderId);
			terminalscanMapper.del(orderId);
			return new FeedBackMessage(true);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return new FeedBackMessage(false, "撤销失败. 请联系管理员");
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public FeedBackMessage insertRecord(String val) {
		try {
			MDterminalscan obj = parse(val);

			if (terminalscanMapper.find(obj.getId()).size() == 0) {
				return new FeedBackMessage(terminalscanMapper.insertRecord(obj) > 0, "扫描失败: 总成数量无效.");
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			return new FeedBackMessage(false, "扫描失败: 无效的条码格式.");
		}
		return new FeedBackMessage(false, "扫描失败: 已扫过的条码.");
	}

	private MDterminalscan parse(String val) throws IllegalAccessException, InvocationTargetException {
		MDterminalscan obj = new MDterminalscan();
		String[] vals = val.replaceAll("[()]", "").split("\\|");

		log.debug(val);
		log.debug(Arrays.toString(vals));

		obj.setId(vals[0]);
		obj.setCflag(vals[1]);
		obj.setCpartno(vals[2]);
		obj.setCcount(vals[5]);
		obj.setOrderpartId(vals[vals.length - 1]);

		return obj;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Object delAll(String orderId) {
		try {
			log.debug("Delete scan data by id: " + orderId);
			terminalscanMapper.delAll(orderId);
			return new FeedBackMessage(true);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return new FeedBackMessage(false, "撤销失败. 请联系管理员");
	}
}
