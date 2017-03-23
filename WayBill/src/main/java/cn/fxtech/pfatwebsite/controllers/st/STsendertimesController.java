package cn.fxtech.pfatwebsite.controllers.st;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.STsendertimes;
import cn.fxtech.pfatwebsite.services.ISTsendertimesService;

@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class STsendertimesController {
	private Logger log = Logger.getLogger(STsendertimesController.class);

	private @Autowired ISTsendertimesService sendertimesService;

	@RequestMapping("stSenderTimesList")
	public Object stSenderList(String startDate, String endDate, boolean sender, boolean order) {
		List<STsendertimes> list = sendertimesService.find(startDate, endDate, sender, order);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("ST Sender: " + map.get("totalCount"));

		return map;
	}
}
