import java.applet.Applet;
import java.net.URL;
import java.net.URLEncoder;

import javax.swing.JOptionPane;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperPrintManager;
import net.sf.jasperreports.engine.util.JRLoader;

/**
 * @author Ajaxfan
 */
public class JdApplet extends Applet {
	private static final long serialVersionUID = 3007717280460840364L;

	/**
	 * Print Kanban
	 * 
	 * @param order
	 * @param parts
	 */
	public void printSender(String sender, String parts, String infos) {
		String urlbase = "senderPrint?";

		try {
			URL url = new URL(getCodeBase(), urlbase + "sender=" + URLEncoder.encode(sender) + "&parts="
					+ URLEncoder.encode(parts) + "&infos=" + URLEncoder.encode(infos));

			printAction((JasperPrint) JRLoader.loadObject(url));
		} catch (Exception e) {
			JOptionPane.showMessageDialog(this, "打印执行失败，更多信息请查看运行日志");
			e.printStackTrace();
		}
	}

	/**
	 * Print Kanban
	 * 
	 * @param order
	 * @param parts
	 */
	public void printKanban(String order, String parts) {
		String urlbase = "kanbanPrint?";

		try {
			URL url = new URL(getCodeBase(),
					urlbase + "order=" + URLEncoder.encode(order) + "&parts=" + URLEncoder.encode(parts));

			printAction((JasperPrint) JRLoader.loadObject(url));
		} catch (Exception e) {
			JOptionPane.showMessageDialog(this, "打印执行失败，更多信息请查看运行日志");
			e.printStackTrace();
		}
	}

	/**
	 * 报表打印
	 * 
	 * @param jasperPrint
	 *            报表对象
	 */
	private void printAction(JasperPrint jasperPrint) throws Exception {
		JasperPrintManager.printReport(jasperPrint, false);
	}
}
