package cn.fxtech.pfatwebsite.services.impl;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cn.fxtech.pfatwebsite.helper.JasperTemplateLoader;
import cn.fxtech.pfatwebsite.models.MDorder;
import cn.fxtech.pfatwebsite.models.MDorderpart;
import cn.fxtech.pfatwebsite.services.IKanbanService;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

@Service
class KanbanService implements IKanbanService {
	private static String JASPER_NAME = "kanbanReport.jasper";

	private @Autowired JasperTemplateLoader templateLoader;

	private Logger log = Logger.getLogger(KanbanService.class);

	@Override
	public JasperPrint getJasperPrint(String order, String parts) {
		try {
			JasperReport jasperReport = (JasperReport) JRLoader.loadObject(templateLoader.load(JASPER_NAME));

			return createJasperPrint(jasperReport, parseParam(order), parseItems(parts));
		} catch (JRException e) {
			e.printStackTrace();
		}
		return null;
	}

	private List<MDorderpart> parseItems(String parts) {
		log.debug("Parse items: " + parts);

		ObjectMapper mapper = new ObjectMapper();
		MDorderpart[] items = new MDorderpart[1];

		try {
			items = mapper.readValue(parts, mapper.getTypeFactory().constructArrayType(MDorderpart.class));
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Arrays.asList(items);
	}

	private Map<String, Object> parseParam(String order) {
		log.debug("Parse order: " + order);
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> param = new HashMap<String, Object>();
		MDorder obj = null;

		try {
			obj = (MDorder) mapper.readValue(order, MDorder.class);
			param.put("destination", obj.getOrdertype());
			param.put("senddate", obj.getSendDate());
			param.put("car", obj.getCar());
			param.put("orderno", obj.getOrderno());
			param.put("mesorderno", obj.getId());

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return param;
	}

	/**
	 * @param jasperReport
	 * @param parameters
	 * @param datas
	 * @return
	 * @throws JRException
	 */
	private JasperPrint createJasperPrint(JasperReport jasperReport, Map<String, Object> parameters,
			List<MDorderpart> datas) throws JRException {
		if (datas.size() > 0) {
			return JasperFillManager.fillReport(jasperReport, parameters, new JRBeanCollectionDataSource(datas));
		}
		return JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());
	}
}
