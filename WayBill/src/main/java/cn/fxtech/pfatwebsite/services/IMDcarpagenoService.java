package cn.fxtech.pfatwebsite.services;

import java.util.List;

import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDcarpageno;
import cn.fxtech.pfatwebsite.models.MDcontainerpart;

public interface IMDcarpagenoService {
	public List<MDcarpageno> findAllCar();

	public List<MDcarpageno> findPartByCar(String doorno);

	public FeedBackMessage update(String doorno, String car, String emp);

	public FeedBackMessage del(String doorno);

	public List<MDcontainerpart> findContainerPartByDoor(String doorno);
}
