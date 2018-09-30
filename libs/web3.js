import Web3 from 'web3';

let web3;
// 浏览器环境且已经安装了 Metamask
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);

// 服务器环境或者没有安装 Metamask
} else {
      web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/e19985f444f9458392579f09b17bfd48'));
}

export default web3;