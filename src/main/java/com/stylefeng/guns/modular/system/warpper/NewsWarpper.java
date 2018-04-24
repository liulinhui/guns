package com.stylefeng.guns.modular.system.warpper;

import com.stylefeng.guns.common.warpper.BaseControllerWarpper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: liulh
 * Date: 18-4-24
 * Time: 下午2:06
 * Description:  NewsWarpper
 */
public class NewsWarpper extends BaseControllerWarpper {

    public NewsWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    protected void warpTheMap(Map<String, Object> map) {
    }
}
