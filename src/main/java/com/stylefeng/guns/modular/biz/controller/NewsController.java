package com.stylefeng.guns.modular.biz.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.common.persistence.dao.NewsMapper;
import com.stylefeng.guns.common.persistence.model.News;
import com.stylefeng.guns.core.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import tk.mybatis.mapper.entity.Example;

import javax.servlet.http.HttpServletRequest;
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

    @Value("${upload.path}")
    private String filePath;
    @Value("${upload.url}")
    private String baseUrl;

    @Autowired
    private NewsMapper newsMapper;

    @RequestMapping("/manage")
    public String manage(Model model) {
        return PREFIX + "/news.html";
    }

    /**
     * 添加新闻页面
     *
     * @param model
     * @return
     */
    @RequestMapping("/add")
    public String add(Model model) {
        return PREFIX + "/newsAdd.html";
    }

    /**
     * 查询新闻列表
     *
     * @return
     */
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

    /**
     * 图片上传借口
     *
     * @param file    文件
     * @param request 请求
     * @return
     */
    @RequestMapping("/uploadImg")
    @ResponseBody
    public JSONObject uploadImg(@RequestParam("file") MultipartFile file,
                                HttpServletRequest request) {
        String[] filename = (file.getOriginalFilename()).split("[.]");
        String type = filename[filename.length - 1];
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        jsonObject.put("data", jsonArray);
        jsonObject.put("errno", 1);
        String fileName = System.currentTimeMillis() + "." + type;
        try {
            FileUtil.uploadFile(file.getBytes(), filePath, fileName);
            jsonArray.add(baseUrl + fileName);
            jsonObject.put("errno", 0);
        } catch (Exception e) {
            e.printStackTrace();
            return jsonObject;
        }
        //返回json
        return jsonObject;
    }

}
