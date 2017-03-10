package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDdoor;

public interface IMDdoorService {
	public List<MDdoor> findAll();
	public List<MDdoor> findInWait();
	public FeedBackMessage del(Integer id);
	public FeedBackMessage addOrUpdate(MDdoor door);
}
