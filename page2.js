// load currenci

populateFields();
function populateFields(){
    var from = document.getElementById('from');
  
     $.getJSON('popularcurrencies.json', function(data) { 
        var currencyEmojiArray=data.currencies;       
       currencyEmojiArray.forEach(element => {
      
         var option1 = document.createElement("option");

         option1.innerHTML = element.emoji +"  "+ element.code ;
         option1.value = element.code;
         from.appendChild(option1);
       });
  });
  }

  function display(){

    var node= document.getElementById("output");
    node.querySelectorAll('*').forEach(n => n.remove());

    var base = document.getElementById('from').value

    var url = 'https://api.exchangeratesapi.io/latest?base='+base;
    console.log(url);
    $.ajax({
      url: url,
      data: {
        format: 'json'
      },
      error: function() {
        console.log("error");
      },
      dataType: 'json',
      success: function(data) {
         console.log(data);
         var counter = 0;
        Object.keys(data.rates).forEach(
            
            (key) => {
                counter++;
                //test
                var row = node.insertRow();
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                cell0.innerHTML = ""+counter;
                cell1.innerHTML = data.base;
                cell2.innerHTML = data.rates[key] + " "+key;
                cell3.innerHTML = new Date();

                console.log(key,data.rates[key]);
        });
      },
      type: 'GET'
    });
  }

  