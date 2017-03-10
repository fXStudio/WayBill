package cn.fxtech.pfatwebsite.helper;

import java.io.InputStream;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class JasperTemplateLoader {
	public static final String BASE_PATH = "/jaspers/";
	private Logger log = Logger.getLogger(JasperTemplateLoader.class);

	public synchronized InputStream load(String fileName) {
		log.debug(fileName.trim());

		return JasperTemplateLoader.class.getResourceAsStream(BASE_PATH + fileName.trim());
	}
}
