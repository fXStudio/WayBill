package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.STsendcompMapper;
import cn.fxtech.pfatwebsite.models.STsendcomp;
import cn.fxtech.pfatwebsite.services.ISTsendcompService;

@Repository
final class STsendcompService implements ISTsendcompService {
	private Logger log = Logger.getLogger(STsendcompService.class);

	private @Autowired STsendcompMapper sendcompMapper;

	@Override
	public List<STsendcomp> findAll() {
		log.debug("Select sendcomp info");
		return sendcompMapper.findAll();
	}
}
