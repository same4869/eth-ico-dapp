const fs = require('fs-extra');
const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/ProjectList.json');
const { interface, bytecode } = require(contractPath);

// 2. 配置 provider
const provider = new HDWalletProvider(
    'wheel gadget pupil able kite harvest pumpkin provide correct budget task fish',
    'https://rinkeby.infura.io/e19985f444f9458392579f09b17bfd48'
);

// 3. 初始化 web3 实例
const web3 = new Web3(provider);

(async () => {
    // 4. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('钱包账户：', accounts);
    console.log('部署合约的账户：', accounts[0]);

    // 5. 创建合约实例并且部署
    console.time('contract-deploy');
    const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode })
            .send({ from: accounts[0], gas: '2000000' });
    console.timeEnd('contract-deploy');

    // console.log('合约部署成功：', result);
    // console.log('合约部署成功：', result.options.address);
    const contractAddress = result.options.address;

    console.log('合约部署成功:', contractAddress);
    console.log('合约查看地址:', `https://rinkeby.etherscan.io/address/${contractAddress}`);

    // 6. 合约地址写入文件系统
    const addressFile = path.resolve(__dirname, '../address.json');
    fs.writeFileSync(addressFile, JSON.stringify(contractAddress));
    console.log('地址写入成功:', addressFile);

    process.exit();
})();
