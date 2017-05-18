package cn.fxtech.pfatwebsite.services.impl;

import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import cn.fxtech.pfatwebsite.mappers.MDcarbillMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarbill;
import cn.fxtech.pfatwebsite.services.IMDcarbillService;

@Repository
final class MDcarbillService implements IMDcarbillService {
	private Logger log = Logger.getLogger(MDcarbillService.class);

	private @Autowired MDcarbillMapper carbillMapper;

	@Override
	public List<MDcarbill> findAll(String cdescrip) {
		log.debug("Select carbill info");
		return carbillMapper.findAll(cdescrip);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public FeedBackMessage insertCarpageno(String pageno, String emp, String doorno) {
		try {
			Timestamp date = new Timestamp(System.currentTimeMillis());

			for (String pno : pageno.split(",")) {
				carbillMapper.insertCarpageno(pno.trim(), emp, date, doorno);
			}
			return new FeedBackMessage(true);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return new FeedBackMessage(false, "数据保存失败");
	}
}
