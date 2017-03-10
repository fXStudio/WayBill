package cn.fxtech.pfatwebsite.models;

import javax.persistence.Id;

public class MDterminalscan {
	@Id
	private String id;
	private String cflag;
	private String cpartno;
	private String ccount;
	private String orderpartId;

	public String getCflag() {
		return cflag;
	}

	public void setCflag(String cflag) {
		this.cflag = cflag;
	}

	public String getCpartno() {
		return cpartno;
	}

	public void setCpartno(String cpartno) {
		this.cpartno = cpartno;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrderpartId() {
		return orderpartId;
	}

	public void setOrderpartId(String orderpartId) {
		this.orderpartId = orderpartId;
	}

	public String getCcount() {
		return ccount;
	}

	public void setCcount(String ccount) {
		this.ccount = ccount;
	}
}
