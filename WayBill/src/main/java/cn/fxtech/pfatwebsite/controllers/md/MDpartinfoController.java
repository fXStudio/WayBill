package cn.fxtech.pfatwebsite.controllers.md;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.MDpartinfo;
import cn.fxtech.pfatwebsite.services.IMDpartinfoService;

@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDpartinfoController {
	private Logger log = Logger.getLogger(MDpartinfoController.class);

	private @Autowired IMDpartinfoService partinfoService;

	/**
	 * @return
	 */
	@RequestMapping(value = "terminalPartInfoList")
	public Object terminalPartInfoList(@RequestParam(value = "orderid") String orderid,
			@RequestParam(value = "destinationid") String destinationid) {
		List<MDpartinfo> list = partinfoService.find(orderid, destinationid);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("terminalPartInfo: " + map.get("totalCount"));

		return map;
	}
	
	/**
	 * @return
	 */
	@RequestMapping(value = "partinfoList")
	public Object partInfoList() {
		List<MDpartinfo> list = partinfoService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("terminalPartInfo: " + map.get("totalCount"));

		return map;
	}
	
	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "partinfoModify")
	public Object partinfoModify(MDpartinfo partinfo) {
		return partinfoService.addOrUpdate(partinfo);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "partinfoDel")
	public Object partinfoDel( MDpartinfo partinfo) {
		return partinfoService.del(partinfo.getId());
	}
}
