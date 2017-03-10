package cn.fxtech.pfatwebsite.services.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cn.fxtech.pfatwebsite.mappers.MDorderMapper;
import cn.fxtech.pfatwebsite.messages.FeedBackMessage;
import cn.fxtech.pfatwebsite.models.MDorder;
import cn.fxtech.pfatwebsite.services.IMDorderService;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Repository
final class MDorderService implements IMDorderService {
	private Logger log = Logger.getLogger(MDorderService.class);

	private @Autowired MDorderMapper orderMapper;

	@Override
	public List<MDorder> findAll() {
		return orderMapper.findAll();
	}

	@Override
	public FeedBackMessage del(Integer id) {
		try {
			orderMapper.deleteOrderPart(id);
			orderMapper.deleteByPrimaryKey(id);
			return new FeedBackMessage(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new FeedBackMessage(false, "删除失败，请联系系统管理员");
	}

	@Override
	public FeedBackMessage addOrUpdate(MDorder order) {
		Example condition = new Example(MDorder.class);
		Criteria criteria = condition.createCriteria();
		criteria.andNotEqualTo("id", order.getId());
		criteria.andEqualTo("orderno", order.getOrderno().trim().length() == 0 ? "-1" : order.getOrderno());

		if (orderMapper.selectByExample(condition).size() > 0) {
			log.debug("Order duplicate: " + order.getCar());
			return new FeedBackMessage(false, "订单号重复");
		}

		if (order.getId() == 0) {
			log.debug("Create new order is: " + order.getOrderno());
			return new FeedBackMessage(orderMapper.insertRecord(order) > 0);
		}
		log.debug("update order name is: " + order.getCar());
		return new FeedBackMessage(orderMapper.updateByPrimaryKey(order) > 0);
	}

	@Override
	public List<MDorder> findCreatedOrder(String dtype) {
		return orderMapper.findCreatedOrder(dtype);
	}
}
