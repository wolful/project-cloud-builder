#!/bin/bash
# 创建一个dockerfile文件
# 直接使用当前目录下的dockerfile
docker pull node:9

# 随机分配名称
imagesName=$(cat /proc/sys/kernel/random/uuid)


# build docker镜像
docker build -t $imagesName --build-arg URL=$2 --build-arg REPONAME=$3 .

imagesId=$(docker images | grep $imagesName |awk '{print $3}')

docker run -d  $imagesId

# 获取containerId
containerId=$(docker ps | grep $imagesId  |awk '{print $1}')

# 把docker生成的文件拷贝出来，放在静态服务中，打印防止结束的标志
docker cp $containerId:/home/Service/$3/build.zip ./code/$containerId.zip
docker cp $containerId:/home/Service/$3/dist  ./code/$containerId

#docker cp $containerId:/home/Service/$3/test2.zip ./code/$containerId.zip
echo Dist address is: https://${yourdomain}/code/$containerId.zip

# 完成后删除镜像
docker stop $containerId
docker rm $containerId
echo rmcontainer
docker rmi $imagesId

echo End.
