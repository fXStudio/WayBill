package cn.fxtech.pfatwebsite.caches;

import org.springframework.stereotype.Component;

@Component
public class KeyUtil {
	private long key;

	public long getKey() {
		return key;
	}

	public void setKey(long key) {
		this.key = key;
	}
}
