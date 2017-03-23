package cn.fxtech.pfatwebsite.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.fxtech.pfatwebsite.mappers.STsenderMapper;
import cn.fxtech.pfatwebsite.models.STsender;
import cn.fxtech.pfatwebsite.services.ISTsenderService;

@Service
public class STsenderService implements ISTsenderService {
	private @Autowired STsenderMapper senderMapper;

	@Override
	public List<STsender> find(String startDate, String endDate, boolean sender, boolean order) {
		List<STsender> list = new ArrayList<STsender>();

		if (sender) {
			list.addAll(senderMapper.findSender(startDate, endDate));
		}
		if (order) {
			list.addAll(senderMapper.findOrder(startDate, endDate));
		}
		return list;
	}
}
