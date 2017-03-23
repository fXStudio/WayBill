package cn.fxtech.pfatwebsite.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.fxtech.pfatwebsite.mappers.STsendertimesMapper;
import cn.fxtech.pfatwebsite.models.STsendertimes;
import cn.fxtech.pfatwebsite.services.ISTsendertimesService;

@Service
public class STsendertimesService implements ISTsendertimesService {
	private @Autowired STsendertimesMapper sendertimesMapper;

	@Override
	public List<STsendertimes> find(String startDate, String endDate, boolean sender, boolean order) {
		List<STsendertimes> list = new ArrayList<STsendertimes>();

		if (sender) {
			list.addAll(sendertimesMapper.findSender(startDate, endDate));
		}
		if (order) {
			list.addAll(sendertimesMapper.findOrder(startDate, endDate));
		}
		return list;
	}
}
