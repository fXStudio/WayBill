package cn.fxtech.pfatwebsite.controllers.exporter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.services.IKanbanService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.GET })
public class KanbanController {
	private Logger log = Logger.getLogger(KanbanController.class);

	private @Autowired IKanbanService kanbanService;

	private ByteArrayOutputStream buffer;

	@RequestMapping(value = "kanbanExport", method = { RequestMethod.POST })
	public synchronized void exportData(String order, String parts, HttpServletResponse response) throws Exception {
		log.debug(order);

		JasperPrint print = kanbanService.getJasperPrint(order, parts);
		JasperExportManager.exportReportToPdfStream(print, buffer = new ByteArrayOutputStream());

		response.getWriter().write("{path: 'services/kanbanDownload'}");
	}

	/**
	 * 文件下载
	 * 
	 * @param sn
	 * @return
	 * @throws JRException
	 * @throws IOException
	 */
	@RequestMapping(value = "*kanbanDownload/{order}")
	public void kanbanPrint(@PathVariable("order") String order, HttpServletResponse response) throws IOException {
		log.debug("Kanban Print Mthod Invoked");
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		response.setHeader("Content-disposition", "attachment;filename=" + order + ".pdf");

		try {
			response.getOutputStream().write(buffer.toByteArray());
		} finally {
			buffer.close();
		}
	}
}
