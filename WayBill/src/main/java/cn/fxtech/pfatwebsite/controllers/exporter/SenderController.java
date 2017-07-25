package cn.fxtech.pfatwebsite.controllers.exporter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.services.ISenderService;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.GET })
public class SenderController {
	private Logger log = Logger.getLogger(SenderController.class);

	private @Autowired ISenderService senderService;

	private ByteArrayOutputStream buffer;

	@RequestMapping(value = "senderExport", method = { RequestMethod.POST })
	public synchronized void exportData(String sender, String parts, String infos, HttpServletResponse response)
			throws Exception {
		JasperPrint print = senderService.getJasperPrint(sender, parts, infos);
		JasperExportManager.exportReportToPdfStream(print, buffer = new ByteArrayOutputStream());

		response.getWriter().write("{path: 'services/senderDownload'}");
	}

	/**
	 * 文件下载
	 * 
	 * @param sn
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "senderDownload/{sender}")
	public void senderDownload(@PathVariable("sender") String sender, HttpServletResponse response) throws IOException {
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		response.setHeader("Content-disposition", "attachment;filename=" + sender + ".pdf");

		try {
			response.getOutputStream().write(buffer.toByteArray());
		} finally {
			buffer.close();
		}
	}
}
