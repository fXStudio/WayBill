package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.fxtech.pfatwebsite.mappers.MDtfassprintMapper;
import cn.fxtech.pfatwebsite.models.MDprintset;
import cn.fxtech.pfatwebsite.services.IMDtfassprintService;

@Service
public class MDtfassprintService implements IMDtfassprintService {
	private @Autowired MDtfassprintMapper tfassprintMapper;

	@Override
	public List<MDprintset> findAll() {
		return tfassprintMapper.findAll();
	}

	@Override
	public List<MDprintset> find(Integer groupId) {
		return tfassprintMapper.find(groupId);
	}

	@Override
	public List<MDprintset> listPrintGroup() {
		return tfassprintMapper.listPrintGroup();
	}
}
