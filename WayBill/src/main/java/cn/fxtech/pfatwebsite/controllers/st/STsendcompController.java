package cn.fxtech.pfatwebsite.controllers.st;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.STsendcomp;
import cn.fxtech.pfatwebsite.services.ISTsendcompService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class STsendcompController {
	private Logger log = Logger.getLogger(STsendcompController.class);

	private @Autowired ISTsendcompService sendcompService;

	/**
	 * @return
	 */
	@RequestMapping(value = "sendcompList")
	public Object sendcompList() {
		List<STsendcomp> list = sendcompService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Send Comp: " + map.get("totalCount"));

		return map;
	}
}
