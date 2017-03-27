package cn.fxtech.pfatwebsite.controllers.down;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import cn.fxtech.pfatwebsite.excel.inters.IExcelExporter;

@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class FileDownloadController {
	private Logger log = Logger.getLogger(FileDownloadController.class);

	private @Autowired IExcelExporter excelExporter;

	private ByteArrayOutputStream buffer;

	/**
	 * 文件下载
	 * 
	 * @param sn
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "exportData")
	public synchronized void exportData(String meta, String data, HttpServletResponse response) throws Exception {
		log.debug("User Request Export Data.");
		log.debug("Begin Export Data.");

		ObjectMapper mapper = new ObjectMapper();
		List<Map<String, Object>> items = mapper.readValue(data, List.class);
		excelExporter.export(meta, items, buffer = new ByteArrayOutputStream());

		response.getWriter().write("{path: 'services/exportDownload'}");
	}

	@RequestMapping(value = "exportDownload", method = RequestMethod.GET)
	public void exportDownload(HttpServletResponse response) throws Exception {
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		response.setHeader("Content-disposition", "attachment;filename=exportedData.xls");

		log.debug("End Export Data.");

		try {
			response.getOutputStream().write(buffer.toByteArray());
		} finally {
			buffer.close();
		}
	}
}
