package cn.fxtech.pfatwebsite.models;

import java.sql.Timestamp;

public class STpagepart {
	private String partname;
	private String partseq;
	private String pageno;
	private Timestamp recorddate;
	private String emp;
	private String dpcode;
	private String dpdate;
	private String dpseqnum;
	private String vin;

	public String getPartname() {
		return partname;
	}

	public void setPartname(String partname) {
		this.partname = partname;
	}

	public String getPartseq() {
		return partseq;
	}

	public void setPartseq(String partseq) {
		this.partseq = partseq;
	}

	public String getPageno() {
		return pageno;
	}

	public void setPageno(String pageno) {
		this.pageno = pageno;
	}

	public Timestamp getRecorddate() {
		return recorddate;
	}

	public void setRecorddate(Timestamp recorddate) {
		this.recorddate = recorddate;
	}

	public String getEmp() {
		return emp;
	}

	public void setEmp(String emp) {
		this.emp = emp;
	}

	public String getDpcode() {
		return dpcode;
	}

	public void setDpcode(String dpcode) {
		this.dpcode = dpcode;
	}

	public String getDpdate() {
		return dpdate;
	}

	public void setDpdate(String dpdate) {
		this.dpdate = dpdate;
	}

	public String getDpseqnum() {
		return dpseqnum;
	}

	public void setDpseqnum(String dpseqnum) {
		this.dpseqnum = dpseqnum;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}
}
