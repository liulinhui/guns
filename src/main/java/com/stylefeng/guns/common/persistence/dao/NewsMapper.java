package com.stylefeng.guns.common.persistence.dao;

import com.stylefeng.guns.common.persistence.model.News;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: liulh
 * Date: 18-4-24
 * Time: 上午11:49
 * Description:  NewsMapper
 */
@Repository
public interface NewsMapper extends Mapper<News> {

}
