#!/bin/bash

echo $1
echo $2
echo $3

prefix="log/"
endfix="log"

logname=$prefix$1.$endfix;

# --build-arg CONT_IMG_VER=v2.0.1 .
sh build.sh $1 $2 $3>>$logname

