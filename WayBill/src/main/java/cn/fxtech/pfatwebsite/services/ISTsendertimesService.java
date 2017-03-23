package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.models.STsendertimes;

public interface ISTsendertimesService {
	public List<STsendertimes> find(String startDate, String endDate, boolean sender, boolean order);
}
