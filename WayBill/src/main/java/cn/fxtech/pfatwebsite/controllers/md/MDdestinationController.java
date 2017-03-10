package cn.fxtech.pfatwebsite.controllers.md;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.MDdestination;
import cn.fxtech.pfatwebsite.services.IMDdestinationService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDdestinationController {
	private Logger log = Logger.getLogger(MDdestinationController.class);

	private @Autowired IMDdestinationService destinationService;

	/**
	 * @return
	 */
	@RequestMapping(value = "destinationList")
	public Object destinationList() {
		log.debug("destinationList");

		return destinationService.findAll();
	}
	
	/**
	 * @return 物流门列表
	 */
	@RequestMapping(value = "destList")
	public Object destList() {
		List<MDdestination> list = destinationService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Destination items: " + map.get("totalCount"));

		return map;
	}
	
	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "destModify")
	public Object mdDoorModify(MDdestination dest) {
		return destinationService.addOrUpdate(dest);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "destDel")
	public Object mdDoorDel(MDdestination dest) {
		return destinationService.del(dest.getId());
	}
}
