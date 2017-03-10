package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarpageno;

public interface IMDcarpagenoService {
	public List<MDcarpageno> findAllCar();

	public List<MDcarpageno> findPartByCar(String car);

	public FeedBackMessage update(String car, String emp);
	
	public FeedBackMessage del(String car);
}
