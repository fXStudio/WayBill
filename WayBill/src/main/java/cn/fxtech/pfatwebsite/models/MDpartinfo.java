package cn.fxtech.pfatwebsite.models;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "terminal_partnifo")
public class MDpartinfo {
	@Id
	private Integer id;
	private String cqadno;
	private String cdesc;
	private Float cquantity;
	private String destinationId;
	private Integer isscan;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id == null ? 0 : id;
	}

	public String getCqadno() {
		return cqadno;
	}

	public void setCqadno(String cqadno) {
		this.cqadno = cqadno;
	}

	public String getCdesc() {
		return cdesc;
	}

	public void setCdesc(String cdesc) {
		this.cdesc = cdesc;
	}

	public String getDestinationId() {
		return destinationId;
	}

	public void setDestinationId(String destinationId) {
		this.destinationId = destinationId;
	}

	public Integer getIsscan() {
		return isscan == null ? 0 : isscan;
	}

	public void setIsscan(Integer isscan) {
		this.isscan = isscan;
	}

	public Float getCquantity() {
		return cquantity;
	}

	public void setCquantity(Float cquantity) {
		this.cquantity = cquantity;
	}
}
