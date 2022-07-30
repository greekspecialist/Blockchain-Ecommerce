const Koa = require('koa')
const Router = require('@Koa/router')
const cors = require('@koa/cors')
const ethers = require('ethers')
const PaymentProcessor = require('../frontend/src//contracts/PaymentProcessor.json');
const {Payment} = require ('./db.js');
const { $Size } = require('sift');

const app = new Koa();
const route = new Router();

const items = {
   '1': {id: 1, url:'http://UrlToDownloadItem1'},
   '2': {id: 2, url:'http://UrlToDownloadItem2'},

};

router.get('/api/getPaymentId/:itemId', async ctx =>{
   const paymentId = (Math.random()* 10000).toFixed(0);
   await Payment.creat({
      id: paymentId,
      itemId: ctx.params.itemId,
      paid: false
   });

   ctx.body = {
      paymentId: paymentId
   };
});

router.get('/api/getItemUrl/:paymentId', async ctx =>{
   const payment = await Payment.findOne({id: ctx.params.paymentId});
   if (payment && payment.paid ===true){
      ctx.body ={
         url: item[payment.itemId].url
      };
   } else {
      ctx.body ={
         url: ''
      };
   }
});


 
app 
   .use(cors())
   .use(router.routes())
   .use(router.allowdMethods());

app.listen(4000, () =>{
   console.log('Server running on port 4000') 
});

const listenToEvents = () => {
   const provide = new ethers.providers.JsonRpcProvider('http://localhost:9545');
   const networlId = '5777';

   const paymentProcessor = new ethers.Contract(
      PaymentProcessor.networks[networkId].address,
      PaymentProcessor.abhi,
      provider
   );
   paymentProcessor.on('PaymentDone', async(payer,amount,paymentId, date) =>{
      console.log(
         `from ${payer},
         amount ${amount},
         paymentId ${paymentId},
         date ${(new Date(date.toNumber()* 100)).toLocaleString()}`
   );
   const payment = await Payment.findOne({id: paymentId});
   if (payment) {
      payment.paid = true;
      await payment.save();
       }
   });
};
listenToEvents()