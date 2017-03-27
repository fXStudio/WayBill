package cn.fxtech.pfatwebsite.excel.inters;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

/**
 * Excel 文件导出接口
 */
public interface IExcelExporter {
	/**
	 * 导出文件
	 *
	 * @param out
	 *            输出文件流
	 */
	public void export(String meta, List<Map<String, Object>> data, OutputStream out) throws IOException;
}
