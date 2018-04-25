#!/usr/bin/env bash
git pull

#默认8080端口
port=8080

if [ "$1" ];then
    port="$1"
fi


mvn clean package -Dmaven.test.skip=true

#关闭8080端口
kill -9 $(lsof -i:${port} |awk '{print $2}' | tail -n 2)

cd target/
java -Duser.timezone=GMT+8 -jar sg-server.jar --spring.profiles.active=produce --server.port=${port}