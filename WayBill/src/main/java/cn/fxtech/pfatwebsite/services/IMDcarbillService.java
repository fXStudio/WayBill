package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarbill;

public interface IMDcarbillService {
	public List<MDcarbill> findAll(String cdescrip);

	public FeedBackMessage insertCarpageno(String pageno, String emp, String doorno);
}
