// 往 ProjectList 合约实例中写入示例数据
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const ProjectList = require('../compiled/ProjectList.json');
const address = require('../address.json');

const web3 = new Web3(new HDWalletProvider(
        'wheel gadget pupil able kite harvest pumpkin provide correct budget task fish',
        'https://rinkeby.infura.io/e19985f444f9458392579f09b17bfd48'
));
const contract = new web3.eth.Contract(JSON.parse(ProjectList.interface), address);

(async () => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      const projects = [
            {
                  description: 'Ethereum DApp Tutorial',
                  minInvest: web3.utils.toWei('0.01', 'ether'),
                  maxInvest: web3.utils.toWei('0.1', 'ether'),
                  goal: web3.utils.toWei('1', 'ether'),
            },
            {
                  description: 'Ethereum Video Tutorial',
                  minInvest: web3.utils.toWei('0.1', 'ether'),
                  maxInvest: web3.utils.toWei('1', 'ether'),
                  goal: web3.utils.toWei('5', 'ether'),
            },
      ];
      console.log(projects);

      const owner = accounts[0];
      const results = await Promise.all(projects.map(x =>
            contract
                  .methods.createProject(x.description, x.minInvest, x.maxInvest, x.goal)
                  .send({ from: owner, gas: '1000000' })
            )
      );

      console.log(results);
})();