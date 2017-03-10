package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDorderpart;
import cn.fxtech.pfatwebsite.models.MDpartinfo;

public interface IMDorderpartService {
	public FeedBackMessage del(Integer id);

	public List<MDorderpart> findRecords(String orderid);

	public Object addOrUpdate(Integer orderId, MDpartinfo[] items);

	public Object update(MDorderpart part);

	public List<MDorderpart> findScanRecords(String orderid);
}
