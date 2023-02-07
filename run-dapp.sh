cd dapps/edf-dapp/truffle
npm install @truffle/hdwallet-provider@2.0.0
npm install truffle
truffle compile
truffle migrate --network besu
cd ..
docker build -f DockerFile -t edf-dapp .
docker run -d -it –rm -p 3001:3001 –name edf-dapp 

