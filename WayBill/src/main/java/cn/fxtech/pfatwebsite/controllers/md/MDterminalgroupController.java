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
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDprintset;
import cn.fxtech.pfatwebsite.models.MDterminalgroup;
import cn.fxtech.pfatwebsite.services.IMDterminalgroupService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDterminalgroupController {
	private Logger log = Logger.getLogger(MDterminalgroupController.class);

	private @Autowired IMDterminalgroupService terminalgroupService;

	/**
	 * @return 配货单分组
	 */
	@RequestMapping(value = "groupList")
	public Object groupList() {
		List<MDterminalgroup> list = terminalgroupService.findAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", list.size());// 记录总数
		map.put("items", list);// 记录行对象

		log.debug("Group items: " + map.get("totalCount"));

		return map;
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "mdGroupModify")
	public Object mdDoorModify(MDterminalgroup group) {
		return terminalgroupService.addOrUpdate(group);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "groupItemModify")
	public Object groupItemModify(String groupId, String items) {
		ObjectMapper mapper = new ObjectMapper();
		MDprintset[] prints;
		try {
			prints = mapper.readValue(items, mapper.getTypeFactory().constructArrayType(MDprintset.class));
			
			return terminalgroupService.addOrUpdate(groupId, prints);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "系统错误，请查看系统日志.");
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "mdGroupDel")
	public Object mdDoorDel(MDterminalgroup group) {
		return terminalgroupService.del(group.getId());
	}
	
	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "delGroupItem")
	public Object delGroupItem(HttpServletRequest request) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			MDprintset item = mapper.readValue(request.getReader(), MDprintset.class);

			log.debug("Delete group item  is: " + item.getIprintgroupid());

			return terminalgroupService.delGroupitem(item.getIprintgroupid());
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
