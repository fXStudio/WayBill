package cn.fxtech.pfatwebsite.controllers;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 模板引擎拦截器
 *
 * @author Ajaxfan
 */
@Controller
@RequestMapping(method = RequestMethod.GET)
public class FreeMarkerController {
	/** 日志工具 */
	private Logger log = Logger.getLogger(FreeMarkerController.class);

	/**
	 * 捕获系统页面的跳转操作
	 *
	 * @param request
	 * @param path
	 * @return
	 */
	@RequestMapping(value = "{path}")
	public String disp(@ModelAttribute("model") ModelMap model, @PathVariable("path") String path,
			HttpServletRequest request) {
		log.debug(path);
		model.addAttribute("modelName", path);

		// 载入Applet组件
		if ("mdOrder".equals(path)) {
			model.addAttribute("hasApplet", true);
		}
		return "func";
	}

	/**
	 * @param model
	 *            模型对象
	 * @return 要加载模板名称
	 */
	@RequestMapping("content")
	public String content() {
		return "content";
	}

	/**
	 * 管理系统登录页面处理
	 * 
	 * @param model
	 *            模型对象
	 * @return 要加载模板名称
	 */
	@RequestMapping(value = { "/", "main" })
	public String index() {
		return "main";
	}
}
