package cn.fxtech.pfatwebsite.models;

import javax.persistence.Table;

@Table(name = "v_kanban")
public class STkanban {
	private String car;
	private String cdescrip;
	private String code;
	private String doorno;
	private String recorddate;

	public String getCar() {
		return car;
	}

	public void setCar(String car) {
		this.car = car;
	}

	public String getCdescrip() {
		return cdescrip;
	}

	public void setCdescrip(String cdescrip) {
		this.cdescrip = cdescrip;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDoorno() {
		return doorno;
	}

	public void setDoorno(String doorno) {
		this.doorno = doorno;
	}

	public String getRecorddate() {
		return recorddate;
	}

	public void setRecorddate(String recorddate) {
		this.recorddate = recorddate;
	}
}
