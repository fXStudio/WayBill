package cn.fxtech.pfatwebsite.services;

import net.sf.jasperreports.engine.JasperPrint;

public interface IKanbanService {
	public JasperPrint getJasperPrint(String order, String parts);
}
