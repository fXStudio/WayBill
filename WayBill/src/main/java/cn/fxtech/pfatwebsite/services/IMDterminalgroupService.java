package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDprintset;
import cn.fxtech.pfatwebsite.models.MDterminalgroup;

public interface IMDterminalgroupService {
	public List<MDterminalgroup> findAll();

	public FeedBackMessage del(Integer id);

	public FeedBackMessage addOrUpdate(MDterminalgroup group);

	public Object addOrUpdate(String groupId, MDprintset[] prints);

	public Object delGroupitem(Integer iprintgroupid);
}
