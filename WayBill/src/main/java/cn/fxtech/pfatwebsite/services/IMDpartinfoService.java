package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.models.MDpartinfo;

public interface IMDpartinfoService {
	public List<MDpartinfo> find(String orderid, String destinationId);

	public Object del(Integer id);

	public Object addOrUpdate(MDpartinfo partinfo);

	public List<MDpartinfo> findAll();
}
