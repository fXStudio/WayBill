package cn.fxtech.pfatwebsite.controllers.st;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.STpagepart;
import cn.fxtech.pfatwebsite.services.ISTpagepartService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class STpagepartController {
	private Logger log = Logger.getLogger(STpagepartController.class);

	private @Autowired ISTpagepartService pagepartService;

	/**
	 * @return
	 */
	@RequestMapping(value = "pagepartList")
	public Object pagepartList(@RequestParam(value = "pageno", defaultValue = "-1") String pageno) {
		List<STpagepart> list = pagepartService.findAll(pageno);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.info("page part count: " + list.size());

		return map;
	}
}
