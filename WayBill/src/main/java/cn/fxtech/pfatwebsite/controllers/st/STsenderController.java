package cn.fxtech.pfatwebsite.controllers.st;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.STsender;
import cn.fxtech.pfatwebsite.services.ISTsenderService;

@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class STsenderController {
	private Logger log = Logger.getLogger(STsenderController.class);

	private @Autowired ISTsenderService senderService;

	@RequestMapping("stSenderList")
	public Object stSenderList(String startDate, String endDate, boolean sender, boolean order) {
		List<STsender> list = senderService.find(startDate, endDate, sender, order);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("ST Sender: " + map.get("totalCount"));

		return map;
	}
}
