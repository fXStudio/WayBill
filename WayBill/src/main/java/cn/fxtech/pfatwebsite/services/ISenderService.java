package cn.fxtech.pfatwebsite.services;

import net.sf.jasperreports.engine.JasperPrint;

public interface ISenderService {
	public JasperPrint getJasperPrint(String order, String parts, String infos);
}
