package cn.fxtech.pfatwebsite.controllers.md;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.MDdoor;
import cn.fxtech.pfatwebsite.services.IMDdoorService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDdoorController {
	private Logger log = Logger.getLogger(MDdoorController.class);

	private @Autowired IMDdoorService doorService;

	/**
	 * @return 物流门列表
	 */
	@RequestMapping(value = "doorList")
	public Object doorList() {
		List<MDdoor> list = doorService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Door items: " + map.get("totalCount"));

		return map;
	}
	
	/**
	 * @return 物流门列表
	 */
	@RequestMapping(value = "doorCombox")
	public Object doorCombox() {
		return doorService.findInWait();
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "mdDoorModify")
	public Object mdDoorModify(MDdoor door) {
		return doorService.addOrUpdate(door);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "mdDoorDel")
	public Object mdDoorDel(MDdoor door) {
		return doorService.del(door.getId());
	}
}
