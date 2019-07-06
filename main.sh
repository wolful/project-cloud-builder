#!/bin/bash
echo $1
echo $2
echo $3

prefix="log/"
endfix="log"

logname=$prefix$1.$endfix;

sh ./docker.sh $1 $2 $3>>$logname
