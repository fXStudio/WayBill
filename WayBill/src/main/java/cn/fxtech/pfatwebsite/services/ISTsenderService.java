package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.models.STsender;

public interface ISTsenderService {
	public List<STsender> find(String startDate, String endDate, boolean sender, boolean order);
}
