package cn.fxtech.pfatwebsite.services;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;

public interface IMDterminalscanService {
	public FeedBackMessage del(String orderId);

	public FeedBackMessage insertRecord(String val);

	public Object delAll(String orderId);
}
