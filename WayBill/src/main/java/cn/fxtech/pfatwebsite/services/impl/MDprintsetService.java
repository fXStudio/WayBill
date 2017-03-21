package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.fxtech.pfatwebsite.mappers.MDprintsetMapper;
import cn.fxtech.pfatwebsite.models.MDprintset;
import cn.fxtech.pfatwebsite.services.IMDprintsetService;

@Service
public class MDprintsetService implements IMDprintsetService {
	private @Autowired MDprintsetMapper printsetMapper;

	@Override
	public List<MDprintset> findAll() {
		return printsetMapper.findAll();
	}

	@Override
	public List<MDprintset> find(Integer groupId) {
		return printsetMapper.find(groupId);
	}

	@Override
	public List<MDprintset> listPrintGroup() {
		return printsetMapper.listPrintGroup();
	}
}
