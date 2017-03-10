package cn.fxtech.pfatwebsite.controllers.md;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.fxtech.pfatwebsite.services.IMDterminalscanService;

/**
 * @author Ajaxfan
 */
@RestController
@RequestMapping(value = "services", method = { RequestMethod.POST })
public class MDterminalscanController {
	private Logger log = Logger.getLogger(MDterminalscanController.class);

	private @Autowired IMDterminalscanService terminalscanService;

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "scanCommit")
	public Object scanCommit(String val) {
		return terminalscanService.insertRecord(val);
	}

	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "scanRollback")
	public Object scanRollback(String orderId) {
		log.debug("scanRollback");
		return terminalscanService.del(orderId);
	}
	
	/**
	 * @param sn
	 * @return
	 */
	@RequestMapping(value = "scanRollbackAll")
	public Object scanRollbackAll(String orderId) {
		log.debug("scanRollbackAll");
		return terminalscanService.delAll(orderId);
	}
}
