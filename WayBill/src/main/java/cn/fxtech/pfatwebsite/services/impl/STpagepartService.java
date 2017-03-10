package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.STpagepartMapper;
import cn.fxtech.pfatwebsite.models.STpagepart;
import cn.fxtech.pfatwebsite.services.ISTpagepartService;

@Repository
final class STpagepartService implements ISTpagepartService {
	private Logger log = Logger.getLogger(STpagepartService.class);

	private @Autowired STpagepartMapper pagepartMapper;

	@Override
	public List<STpagepart> findAll(String pageno) {
		log.debug("Select page part by pageno: " + pageno);
		return pagepartMapper.findByPageNo(pageno);
	}
}
