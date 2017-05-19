package cn.fxtech.pfatwebsite.services.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.STkanbanMapper;
import cn.fxtech.pfatwebsite.models.STkanban;
import cn.fxtech.pfatwebsite.services.ISTkanbanService;

@Repository
final class STkanbanService implements ISTkanbanService {
	private Logger log = Logger.getLogger(STkanbanService.class);

	private @Autowired STkanbanMapper kanbanMapper;

	@Cacheable(value = "configs")
	@Override
	public Map<String, List<STkanban>> findAll(Long cachekey) {
		List<STkanban> list = kanbanMapper.findAll();

		Map<String, List<STkanban>> map = new LinkedHashMap<String, List<STkanban>>();

		log.debug("Kanban items count: " + list.size());

		for (STkanban kanban : list) {// 生成看板分类(按门号与车号组合进行分组)
			String key = kanban.getDoorno() + " <p>" + kanban.getRecorddate() + "</p>";

			if (!map.containsKey(key)) {
				map.put(key, new ArrayList<STkanban>());
			}
			if (kanban.getDoorno() != null && kanban.getDoorno().trim().length() > 0) {
				map.get(key).add(kanban);
			}
		}
		return map;
	}
}
