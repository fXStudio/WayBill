package cn.fxtech.pfatwebsite.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "terminal_orderpart")
public class MDorderpart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String partno;
	private Integer pkgcount;
	private Float totalcount;
	private Float pkgquantity;
	private Integer orderid;
	private String orderno;
	private String partdesc;
	private Integer isscan;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = (id == null ? 0 : id);
	}

	public String getPartno() {
		return partno;
	}

	public void setPartno(String partno) {
		this.partno = partno;
	}

	public Integer getPkgcount() {
		return pkgcount;
	}

	public void setPkgcount(Integer pkgcount) {
		this.pkgcount = pkgcount;
	}

	public Integer getOrderid() {
		return orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}

	public String getOrderno() {
		return orderno;
	}

	public void setOrderno(String orderno) {
		this.orderno = orderno;
	}

	public String getPartdesc() {
		return partdesc;
	}

	public void setPartdesc(String partdesc) {
		this.partdesc = partdesc;
	}

	public Integer getIsscan() {
		return isscan;
	}

	public void setIsscan(Integer isscan) {
		this.isscan = isscan;
	}

	public Float getTotalcount() {
		return totalcount;
	}

	public void setTotalcount(Float totalcount) {
		this.totalcount = totalcount;
	}

	public void setPkgquantity(Float pkgquantity) {
		this.pkgquantity = pkgquantity;
	}

	public Float getPkgquantity() {
		return pkgquantity;
	}
}
