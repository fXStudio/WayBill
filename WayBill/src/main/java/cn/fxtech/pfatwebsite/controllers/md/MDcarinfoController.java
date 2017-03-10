package cn.fxtech.pfatwebsite.controllers.md;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.MDcarinfo;
import cn.fxtech.pfatwebsite.services.IMDcarinfoService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDcarinfoController {
	private Logger log = Logger.getLogger(MDcarinfoController.class);

	private @Autowired IMDcarinfoService carinfoService;

	/**
	 * @return 车辆信息列表
	 */
	@RequestMapping(value = "carList")
	public Object carList() {
		List<MDcarinfo> list = carinfoService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Car items: " + map.get("totalCount"));

		return map;
	}

	/**
	 * @return 车辆信息列表
	 */
	@RequestMapping(value = "carCombox")
	public Object carCombox() {
		return carinfoService.findCarInWaitl();
	}
	
	/**
	 * @return 车辆信息列表
	 */
	@RequestMapping(value = "carSelList")
	public Object carSelList() {
		return carinfoService.findAll();
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "mdCarInfoModify")
	public Object mdCarInfoModify(MDcarinfo car) {
		return carinfoService.addOrUpdate(car);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "mdCarInfoDel")
	public Object mdCarInfoDel(MDcarinfo car) {
		return carinfoService.del(car.getId());
	}
}
