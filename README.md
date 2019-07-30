# project-cloud-builder
Cloud build for web. Build a project and download result by a github url.

<img src="https://img.alicdn.com/tfs/TB1dkkQboGF3KVjSZFmXXbqPXXa-600-499.gif" width="600" />

## Usage

If you want replay it, please install it like below.

```
git clone https://github.com/wolful/project-cloud-builder.git
docker build -t yourname/yourRepoName:v1
docker run -d -p 8090:8090 $imagesId
```

If you just want use it for building,

```
docker pull wolfulfl/web-build:1.0.4
docker run -d -p 8090:8090 $imagesId
```

> Notes: Docker required in your environment, please install it before start.

[中文介绍](https://www.wisewufu.com/2019/06/09/cloud-build-base/)
