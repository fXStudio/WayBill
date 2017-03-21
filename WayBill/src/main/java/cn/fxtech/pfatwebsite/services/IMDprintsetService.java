package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.models.MDprintset;

public interface IMDprintsetService {
	public List<MDprintset> findAll();

	public List<MDprintset> find(Integer groupId);

	public List<MDprintset> listPrintGroup();
}
