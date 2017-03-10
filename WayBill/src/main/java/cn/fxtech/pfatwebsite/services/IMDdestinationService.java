package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.models.MDdestination;

public interface IMDdestinationService {
	public List<MDdestination> findAll();

	public Object addOrUpdate(MDdestination dest);

	public Object del(Integer id);
}
