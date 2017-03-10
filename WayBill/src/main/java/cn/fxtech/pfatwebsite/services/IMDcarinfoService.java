package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarinfo;

public interface IMDcarinfoService {
	public List<MDcarinfo> findAll();
	public List<MDcarinfo> findCarInWaitl();
	public FeedBackMessage del(Integer id);
	public FeedBackMessage addOrUpdate(MDcarinfo car);
}
