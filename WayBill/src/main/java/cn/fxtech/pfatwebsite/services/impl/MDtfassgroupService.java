package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import cn.fxtech.pfatwebsite.mappers.MDtfassgroupMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDprintset;
import cn.fxtech.pfatwebsite.models.MDtfassgroup;
import cn.fxtech.pfatwebsite.services.IMDtfassgroupService;

@Repository
final class MDtfassgroupService implements IMDtfassgroupService {
	private Logger log = Logger.getLogger(MDtfassgroupService.class);

	private @Autowired MDtfassgroupMapper tfassgroupMapper;

	@Override
	public List<MDtfassgroup> findAll() {
		return tfassgroupMapper.findAll();
	}

	@Override
	public FeedBackMessage del(Integer id) {
		return new FeedBackMessage(tfassgroupMapper.del(id) > 0);
	}

	@Override
	public FeedBackMessage addOrUpdate(MDtfassgroup group) {
		if (group.getId() == 0) {
			if (tfassgroupMapper.find(group).size() > 0) {
				return new FeedBackMessage(false, "分组名称重复.");
			}
			log.debug("Create new Group is: " + group.getGroupName());
			return new FeedBackMessage(tfassgroupMapper.insertRecord(group) > 0, "程序错误，请查看运行日志.");
		}
		log.debug("update Group name is: " + group.getGroupName());
		return new FeedBackMessage(tfassgroupMapper.update(group) > 0, "程序错误，请查看运行日志.");
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Object addOrUpdate(String groupId, MDprintset[] prints) {
		try {
			for (MDprintset item : prints) {
				tfassgroupMapper.addOrUpdate(groupId, item.getIprintgroupid());
			}
			return new FeedBackMessage(true);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "保存失败，请联系系统管理员");
	}

	@Override
	public Object delGroupitem(Integer iprintgroupid) {
		return new FeedBackMessage(tfassgroupMapper.delGroupitem(iprintgroupid) > 0, "保存失败，请联系系统管理员");
	}
}
