package com.stylefeng.guns.common.persistence.dao;

import com.stylefeng.guns.common.persistence.model.Relation;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

/**
 * <p>
  * 角色和菜单关联表 Mapper 接口
 * </p>
 *
 * @author stylefeng
 * @since 2017-07-11
 */
@Repository
public interface RelationMapper extends Mapper<Relation> {

}