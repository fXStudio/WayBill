package cn.fxtech.pfatwebsite.services;

import java.util.List;
import java.util.Map;

import cn.fxtech.pfatwebsite.models.STkanban;

public interface ISTkanbanService {
	public Map<String, List<STkanban>> findAll(Long cachekey);
}
