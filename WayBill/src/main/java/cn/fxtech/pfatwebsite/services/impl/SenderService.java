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
import cn.fxtech.pfatwebsite.models.MDcarpageno;
import cn.fxtech.pfatwebsite.models.MDcontainerpart;
import cn.fxtech.pfatwebsite.services.ISenderService;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

@Service
class SenderService implements ISenderService {
	private static String JASPER_NAME = "SenderKanban.jasper";

	private @Autowired JasperTemplateLoader templateLoader;

	private Logger log = Logger.getLogger(SenderService.class);

	@Override
	public JasperPrint getJasperPrint(String order, String parts, String infos) {
		try {
			JasperReport jasperReport = (JasperReport) JRLoader.loadObject(templateLoader.load(JASPER_NAME));

			Map<String, Object> params = parseParam(order);
			params.put("containers", parseItems(parts));
			params.put("parts", parseInfos(infos));
			params.put("containerCount", ((List) params.get("containers")).size());

			return createJasperPrint(jasperReport, params);
		} catch (JRException e) {
			e.printStackTrace();
		}
		return null;
	}

	private Map<String, Object> parseParam(String sender) {
		log.debug("Parse sender: " + sender);
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> param = new HashMap<String, Object>();
		MDcarpageno obj = null;

		try {
			obj = (MDcarpageno) mapper.readValue(sender, MDcarpageno.class);
			param.put("senddate", obj.getRecorddate().substring(0, 16));
			param.put("car", obj.getCar());
			param.put("doorno", obj.getDoorno());
			param.put("SUBREPORT_DIR", JasperTemplateLoader.BASE_PATH);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return param;
	}

	private List<MDcarpageno> parseItems(String parts) {
		log.debug("Parse items: " + parts);

		ObjectMapper mapper = new ObjectMapper();
		MDcarpageno[] items = new MDcarpageno[1];

		try {
			items = mapper.readValue(parts, mapper.getTypeFactory().constructArrayType(MDcarpageno.class));
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Arrays.asList(items);
	}

	private List<MDcontainerpart> parseInfos(String infos) {
		ObjectMapper mapper = new ObjectMapper();
		MDcontainerpart[] items = new MDcontainerpart[1];

		try {
			items = mapper.readValue(infos, mapper.getTypeFactory().constructArrayType(MDcontainerpart.class));
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Arrays.asList(items);
	}

	/**
	 * @param jasperReport
	 * @param parameters
	 * @param datas
	 * @return
	 * @throws JRException
	 */
	private JasperPrint createJasperPrint(JasperReport jasperReport, Map<String, Object> parameters)
			throws JRException {
		return JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());
	}
}
