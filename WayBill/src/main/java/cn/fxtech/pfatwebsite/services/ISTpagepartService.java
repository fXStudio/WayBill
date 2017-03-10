package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.models.STpagepart;

public interface ISTpagepartService {
	public List<STpagepart> findAll(String pageno);
}
