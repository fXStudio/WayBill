package cn.fxtech.pfatwebsite.controllers.md;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.MDprintset;
import cn.fxtech.pfatwebsite.services.IMDtfassprintService;

@RestController
@RequestMapping(value = "services", method = RequestMethod.POST)
public class MDtfassprintController {
	private @Autowired IMDtfassprintService tfassprintService;

	@RequestMapping("tfassprintList")
	public Object tfassprintList() {

		List<MDprintset> list = tfassprintService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		return map;
	}

	@RequestMapping("tfassItemList")
	public Object groupItemList(Integer groupId) {

		List<MDprintset> list = tfassprintService.find(groupId);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		return map;
	}
}
