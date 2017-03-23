package cn.fxtech.pfatwebsite.controllers.md;

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

import cn.fxtech.pfatwebsite.caches.KeyUtil;
import cn.fxtech.pfatwebsite.models.MDcarpageno;
import cn.fxtech.pfatwebsite.models.MDcontainerpart;
import cn.fxtech.pfatwebsite.services.IMDcarpagenoService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDcarpagenoController {
	private Logger log = Logger.getLogger(MDcarpagenoController.class);

	private @Autowired IMDcarpagenoService carpagenoService;
	private @Autowired KeyUtil keyutil;

	/**
	 * @return
	 */
	@RequestMapping(value = "carpagenoList")
	public Object carpagenoList() {
		List<MDcarpageno> list = carpagenoService.findAllCar();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Car : " + map.get("totalCount"));

		return map;
	}

	/**
	 * @return
	 */
	@RequestMapping(value = "carpartList")
	public Object carpartList(@RequestParam(value = "car", defaultValue = "-1") String car) {
		List<MDcarpageno> list = carpagenoService.findPartByCar(car);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Car has parts : " + map.get("totalCount"));

		return map;
	}
	
	/**
	 * @return
	 */
	@RequestMapping(value = "containerPartList")
	public Object containerPartList(@RequestParam(value = "car", defaultValue = "-1") String car) {
		List<MDcontainerpart> list = carpagenoService.findContainerPartByCar(car);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Car has container parts : " + map.get("totalCount"));

		return map;
	}

	@RequestMapping(value = "pagenoModify")
	public Object pagenoModify(@RequestParam(value = "car") String car, HttpServletRequest request) {
		log.info(car);

		keyutil.setKey(System.currentTimeMillis());
		
		return carpagenoService.update(car, (String) request.getSession().getAttribute("username"));
	}

	@RequestMapping(value = "pagenoDel")
	public Object pagenoDel(@RequestParam(value = "car") String car, HttpServletRequest request) {
		log.info(car);

		keyutil.setKey(System.currentTimeMillis());
		
		return carpagenoService.del(car);
	}
}
