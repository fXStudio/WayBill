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
import cn.fxtech.pfatwebsite.models.MDtfassgroup;
import cn.fxtech.pfatwebsite.services.IMDtfassgroupService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDtfassgroupController {
	private Logger log = Logger.getLogger(MDtfassgroupController.class);

	private @Autowired IMDtfassgroupService tfassgroupService;

	/**
	 * @return 配货单分组
	 */
	@RequestMapping(value = "tfassGroupList")
	public Object groupList() {
		List<MDtfassgroup> list = tfassgroupService.findAll();

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
	@RequestMapping(value = "mdTfassGroupModify")
	public Object mdDoorModify(MDtfassgroup group) {
		return tfassgroupService.addOrUpdate(group);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "tfassGroupItemModify")
	public Object groupItemModify(String groupId, String items) {
		ObjectMapper mapper = new ObjectMapper();
		MDprintset[] prints;
		try {
			prints = mapper.readValue(items, mapper.getTypeFactory().constructArrayType(MDprintset.class));

			return tfassgroupService.addOrUpdate(groupId, prints);
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
	@RequestMapping(value = "mdTfassGroupDel")
	public Object mdDoorDel(MDtfassgroup group) {
		return tfassgroupService.del(group.getId());
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "delTfassGroupItem")
	public Object delGroupItem(HttpServletRequest request) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			MDprintset item = mapper.readValue(request.getReader(), MDprintset.class);

			log.debug("Delete group item  is: " + item.getIprintgroupid());

			return tfassgroupService.delGroupitem(item.getIprintgroupid());
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
