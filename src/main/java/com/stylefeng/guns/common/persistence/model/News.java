package com.stylefeng.guns.common.persistence.model;


import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: liulh
 * Date: 18-4-24
 * Time: 上午11:43
 * Description:  News
 */
public class News extends Base {
    private static final long serialVersionUID = 1L;
    private String language; //语言 en,ch,jp
    private String title; //标题
    private String draft; //摘要
    private String text; //正文
    private Date time; // 新闻提交时间时间
    private String home; //是否在首页显示 ,0:不显示  1：首页显示
    private String comment; //备注
    private String realtime; //发布时间

    public String getRealtime() {
        return realtime;
    }

    public void setRealtime(String realtime) {
        this.realtime = realtime;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDraft() {
        return draft;
    }

    public void setDraft(String draft) {
        this.draft = draft;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getHome() {
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
