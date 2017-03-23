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
	public Object orderList(@RequestParam(value = "status", defaultValue = "-1") String status) {
		List<MDorder> list = orderService.findAll(status);

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
	public Object orderModify(MDorder order) {
		return orderService.addOrUpdate(order);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "orderDel")
	public Object orderDel(MDorder order) {
		return orderService.del(order.getId());
	}
	
	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "orderSend")
	public Object orderSend(MDorder order) {
		return orderService.send(order.getId());
	}
}
