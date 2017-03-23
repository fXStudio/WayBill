package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDorder;

public interface IMDorderService {
	public List<MDorder> findAll(String status);
	public FeedBackMessage del(Integer id);
	public FeedBackMessage addOrUpdate(MDorder order);
	public List<MDorder> findCreatedOrder(String dtype);
	public Object send(Integer id);
}
