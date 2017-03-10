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
import cn.fxtech.pfatwebsite.models.MDcarbill;
import cn.fxtech.pfatwebsite.services.IMDcarbillService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDcarbillController {
	private Logger log = Logger.getLogger(MDcarbillController.class);

	private @Autowired IMDcarbillService carbillService;
	private @Autowired KeyUtil keyutil;

	/**
	 * @return 车辆信息列表
	 */
	@RequestMapping(value = "carBillList")
	public Object carBillList(String cdescrip) {
		List<MDcarbill> list = carbillService.findAll(cdescrip);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Car bills: " + map.get("totalCount"));

		return map;
	}

	@RequestMapping(value = "carbillModify")
	public Object carbillModify(@RequestParam(value = "car") String car, @RequestParam(value = "pageno") String pageno,
			@RequestParam(value = "doorno") String doorno, HttpServletRequest request) {
		log.info(car);
		log.info(pageno);
		log.info(doorno);
		
		keyutil.setKey(System.currentTimeMillis());

		return carbillService.insertCarpageno(car, pageno, (String) request.getSession().getAttribute("username"),
				doorno);
	}
}
