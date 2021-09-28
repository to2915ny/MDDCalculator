var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance2').default;
/* GET home page. */
router.get('/', async function(req, res, next) {
  queryOption = {period1: '2010-01-01'}
  
  const results = await yahooFinance.historical(req.query.search,queryOption);
  //console.log(results)
  var data = [];
  var maxPrice = [];
  var mdd = [];
  var currentprice = results[results.length - 1].close;
	if(results){
    var price = []
	for (var i = 0;i<results.length; i++){
		//console.log(results[i]);	
		var json = {};
		var close = results[i].close;
		var date = JSON.stringify(results[i].date);
		date = date.split('T');
		date = date[0].substring(1);
		price.push(results[i].high);
				
		var max = price.reduce( function (previous, current) { 
			return previous > current ? previous:current;
		});
		maxPrice.push(max);
		var dd = ((close - max) / max) * 100;
		
		json.date = date;
		dd = Number.parseFloat(dd).toFixed(2);
		mdd.push(Number(dd));
		json.dd = Number(dd);
		json.price = close;
		data.push(json);
		}
	var min = mdd.reduce( function (previous, current) { 
	return previous > current ? current:previous;
		});
	var average = mdd.reduce(function(a, b){ return a + b / mdd.length;});
	average = Math.round(average);
    //console.log(average);
	}
	var currentdd = data[data.length -1].dd
	for(i=0;i<data.length;i++){
		if(data[i].dd == min){
				var mddDate = data[i].date;
				var mddPrice = data[i].price;
			}
		}
	var avePrice = maxPrice[data.length - 1]  *  (1.0 + average / 100);  		
var title = req.query.search;
title = title.toUpperCase();
res.render('result',{data,min,average,currentprice,title,mddDate,mddPrice,avePrice,currentdd});

});

module.exports = router;
