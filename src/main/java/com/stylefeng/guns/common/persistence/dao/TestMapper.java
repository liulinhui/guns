package com.stylefeng.guns.common.persistence.dao;

import com.stylefeng.guns.common.persistence.model.Test;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author stylefeng
 * @since 2017-07-11
 */
@Repository
public interface TestMapper extends Mapper<Test> {

}