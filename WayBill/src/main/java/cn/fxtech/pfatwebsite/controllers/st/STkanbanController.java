package cn.fxtech.pfatwebsite.controllers.st;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import cn.fxtech.pfatwebsite.caches.KeyUtil;
import cn.fxtech.pfatwebsite.models.STkanban;
import cn.fxtech.pfatwebsite.services.ISTkanbanService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.GET })
public class STkanbanController {
	private Logger log = Logger.getLogger(STkanbanController.class);

	private @Autowired ISTkanbanService kanbanService;
	private @Autowired KeyUtil keyutil;

	/**
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "kanbanList")
	public Object kanbanList(HttpServletRequest request) {
		Long cachekey = keyutil.getKey();

		Map<String, List<STkanban>> map = kanbanService.findAll(cachekey);

		log.debug(MessageFormat.format("Kanban cachekey is: {0}", cachekey));
		
		return map;
	}
}
