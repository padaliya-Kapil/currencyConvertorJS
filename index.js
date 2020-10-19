// load currencies
 function populateFields(){
  var from = document.getElementById('from-group');
  var to = document.getElementById('to-group');

   $.getJSON('currencies.json', function(data) { 
     var currencyEmojiArray=data.currencies;       
     currencyEmojiArray.forEach(element => {
    
       var option1 = document.createElement("option");
       var option2 = document.createElement("option");
       option1.innerHTML = element.emoji +"  "+ element.code ;
       option1.value = element.code;
       from.appendChild(option1);

       option2.innerHTML = element.emoji +"  "+ element.code ;
       option2.value = element.code;
       to.appendChild(option2);
     });

    console.log();
});
}

  
  function display(target='GBP',base='USD',amount=0){
    let api_key = 'c8d7266f9153c19fcbc4'
    var url = 'https://free.currconv.com/api/v7/convert?q='+ target+'_'+base+','+base+'_'+target+'&compact=ultra&apiKey='+ api_key;
    console.log(url);
    $.ajax({
      url: url,
      data: {
        format: 'json'
      },
      error: function() {
        console.log("error");
      },
      dataType: 'jsonp',
      success: function(data) {
        var conversion_rate = data[target+"_"+base];
        var reverse_rate = data[base+"_"+target];
        console.log(conversion_rate , reverse_rate);
        document.getElementById('base-amount').innerHTML = amount + " "+target + " = ";
        document.getElementById('output').innerHTML = parseFloat(amount)*parseFloat(conversion_rate) + " "+base;
        document.getElementById('base-rate').innerHTML = " 1 " + target + " = " + conversion_rate + " "+base;
        document.getElementById('reverse-rate').innerHTML = " 1 " + base + " = " + reverse_rate + " "+target;
      },
      type: 'GET'
    });
  }

function calculate(){
  var amount = document.getElementById('amount').value;
  if(amount===''){
    amount = 0;
  }
  var from = document.getElementById('from-group').value;
  var to = document.getElementById('to-group').value;
  display(from,to,amount)  
}


 