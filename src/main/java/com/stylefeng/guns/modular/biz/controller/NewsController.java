package com.stylefeng.guns.modular.biz.controller;

import com.alibaba.fastjson.JSONObject;
import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.common.persistence.dao.NewsMapper;
import com.stylefeng.guns.common.persistence.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: liulh
 * Date: 18-4-24
 * Time: 上午11:59
 * Description:  NewsController
 */
@Controller
@RequestMapping("/news")
public class NewsController extends BaseController {
    private String PREFIX = "/modular/news";

    @Autowired
    private NewsMapper newsMapper;

    @RequestMapping("/add")
    public String news(Model model) {
        return PREFIX + "/news.html";
    }

    @RequestMapping("/list")
    @ResponseBody
    public Object list() {
        Example example = new Example(News.class);
        example.setOrderByClause("time desc");
        List<News> list = newsMapper.selectByExample(example);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("list", list);
        return jsonObject;
    }


}
