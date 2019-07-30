echo repoId: $1
echo repoUrl: $2
echo repoName: $3

cd repo

mkdir $1

cd $1

echo [1/5] Cloing repo...
git clone $2
cd $3

echo [2/5] Npm installing...
npm install

echo [3/5] Npm building...
npm run build

echo [4/5] Zipping...
zip -r ../../../code/$1.zip ./dist/

echo [5/5] Builded, you can download it at relative address: http://location.host/code/$1.zip


# echo [5/6] Getting ip..., you can try download it at location.host/code/$1.zip before get ip.
# ips=$(curl ifconfig.me | awk '{print $1}')

# echo [6/6] Builded, you can download it at http://$ips:8090/code/$1.zip or https://

