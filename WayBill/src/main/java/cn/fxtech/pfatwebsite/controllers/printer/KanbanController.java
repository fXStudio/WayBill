package cn.fxtech.pfatwebsite.controllers.printer;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.services.IKanbanService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(method = RequestMethod.GET)
public class KanbanController {
	private Logger log = Logger.getLogger(KanbanController.class);

	private @Autowired IKanbanService kanbanService;

	/**
	 * 文件下载
	 * 
	 * @param sn
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "*/kanbanPrint")
	public void kanbanPrint(String order, String parts, HttpServletResponse response) {
		log.debug("Kanban Print Mthod Invoked");

		response.setContentType("application/octet-stream");

		OutputStream streamOutPut = null;
		ObjectOutputStream objectOutput = null;

		try {
			streamOutPut = response.getOutputStream();
			objectOutput = new ObjectOutputStream(streamOutPut);

			objectOutput.writeObject(kanbanService.getJasperPrint(order, parts));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (objectOutput != null) {
				try {
					objectOutput.close();
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					objectOutput = null;
				}
			}
			if (streamOutPut != null) {
				try {
					streamOutPut.close();
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					streamOutPut = null;
				}
			}
		}
	}
}
