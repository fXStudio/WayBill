package cn.fxtech.pfatwebsite.controllers.md;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDorderpart;
import cn.fxtech.pfatwebsite.models.MDpartinfo;
import cn.fxtech.pfatwebsite.services.IMDorderpartService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDorderpartController {
	private Logger log = Logger.getLogger(MDorderpartController.class);

	private @Autowired IMDorderpartService orderpartService;

	/**
	 * @return
	 */
	@RequestMapping(value = "orderpartList")
	public Object orderList(@RequestParam(value = "orderid") String orderid) {
		List<MDorderpart> list = orderpartService.findRecords(orderid);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Order Part items: " + map.get("totalCount"));
		log.debug("Order: " + orderid);

		return map;
	}
	
	/**
	 * @return
	 */
	@RequestMapping(value = "scanpartList")
	public Object scanpartList(@RequestParam(value = "orderid") String orderid) {
		List<MDorderpart> list = orderpartService.findScanRecords(orderid);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象
		
		log.debug("Order Part items: " + map.get("totalCount"));
		log.debug("Order: " + orderid);
		
		return map;
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "orderpartModify")
	public Object mdCarInfoModify(@RequestParam(value = "orderId") Integer orderId,
			@RequestParam(value = "parts") String parts) {
		log.debug(orderId);
		log.debug(parts);

		ObjectMapper mapper = new ObjectMapper();
		MDpartinfo[] items;
		try {
			items = mapper.readValue(parts, mapper.getTypeFactory().constructArrayType(MDpartinfo.class));
			return orderpartService.addOrUpdate(orderId, items);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "添加失败，请联系系统管理员");
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "orderpartChange")
	public Object orderpartChange(MDorderpart part) {
		return orderpartService.update(part);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "delOrderpart")
	public Object mdCarInfoDel(HttpServletRequest request) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			MDorderpart item = mapper.readValue(request.getReader(), MDorderpart.class);

			log.debug("Delete orderpart  is: " + item.getPartno());

			return orderpartService.del(item.getId());
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "系统异常，请联系管理员");
	}
}
