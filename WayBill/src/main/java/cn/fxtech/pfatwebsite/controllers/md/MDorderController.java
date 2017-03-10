package cn.fxtech.pfatwebsite.controllers.md;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.models.MDorder;
import cn.fxtech.pfatwebsite.services.IMDorderService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDorderController {
	private Logger log = Logger.getLogger(MDorderController.class);

	private @Autowired IMDorderService orderService;

	/**
	 * @return
	 */
	@RequestMapping(value = "orderList")
	public Object orderList() {
		List<MDorder> list = orderService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Order items: " + map.get("totalCount"));

		return map;
	}
	
	/**
	 * @return
	 */
	@RequestMapping(value = "createdOrderList")
	public Object createdOrderList(String dtype) {
		log.debug(dtype);
		List<MDorder> list = orderService.findCreatedOrder(dtype);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象
		
		log.debug("Order items: " + map.get("totalCount"));
		
		return map;
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "orderModify")
	public Object mdCarInfoModify(MDorder order) {
		return orderService.addOrUpdate(order);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "orderDel")
	public Object mdCarInfoDel(MDorder order) {
		return orderService.del(order.getId());
	}
}
