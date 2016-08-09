(function(){
    var xmlhttp = new XMLHttpRequest();
    var url = "data.json";
    var sortdata =[];
    /*
     xml request
     ------------------------------------------*/
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);
            transactions(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    /* transactions function
     * ----------------------------------------*/
    function transactions(data) {
        var out = "", tr, td, tdText, th, thText,totalSum= 0,count= 0, avgSalary = [];
        var tbody = document.getElementById('body');
        var thead = document.getElementById('head');

        for(var i = 0 ; i < data.transactions.length; i++){debugger;
            var TransactionMonth = new Date(data.transactions[i].date).getMonth();
            var TransactionYear = new Date(data.transactions[i].date).getFullYear();
            sortdata[i] = {
                name : data.transactions[i].name,
                amount : data.transactions[i].amount,
                date : data.transactions[i].date,
                category : data.transactions[i].category
            }
            for(var avg=0;avg< data.transactions.length;avg++){

                if(sortdata[i].name === data.transactions[avg].name){
                    var avgMonth = new Date(data.transactions[avg].date).getMonth();
                    var avgYear = new Date(data.transactions[avg].date).getFullYear();
                    if(TransactionMonth == avgMonth && TransactionYear == avgYear){
                        count++;
                        totalSum+= data.transactions[avg].amount;
                    }
                }
            }
            avgSalary.push(Math.round(totalSum/count).toFixed(2));
            totalSum = 0;
            count = 0;
        }

        tr = document.createElement('tr');

        /*sort data for thead
         ---------------------------------------*/
        for (key in sortdata[0]) {

            th = document.createElement('th');
            if (key == 'name' || key == 'amount' || key == 'date' || key == 'category') {
                thText = document.createTextNode(key);
                th.appendChild(thText);
                tr.appendChild(th);
            }
        }
        th = document.createElement('th');
        thText = document.createTextNode('Average Salary');
        th.appendChild(thText);
        tr.appendChild(th);
        thead.appendChild(tr);




        /*tbody
         ---------------------------------------------*/
        for (var i = 0; i < sortdata.length; i++) {

            tr = document.createElement('tr');
            for (key in sortdata[i]) {
                if (key == 'name' || key == 'amount' || key == 'date' || key == 'category' || key == 'category') {
                    td = document.createElement('td');
                    tdText = document.createTextNode(data.transactions[i][key]);
                    td.appendChild(tdText);
                    tr.appendChild(td);
                }
            }

            td = document.createElement('td');
            tdText = document.createTextNode(avgSalary[i]);
            td.appendChild(tdText);
            tr.appendChild(td);
            tbody.appendChild(tr);

        }

    }

    /*Filter as per search
     -------------------------------------------*/

    var filter=function(){
        var data = sortdata;
        var tbody = document.getElementById('body');
        var value = document.getElementById('filtertable').value.toLowerCase();
        for(i=0;i<data.length;i++){
            if(!data[i].name.toLowerCase().match(value)){
                document.getElementById('body').getElementsByTagName('tr')[i].style.display="none";
            }else if(data[i] == ''){
                document.getElementById('body').getElementsByTagName('tr')[i].style.display="table-row";
            }else{
                document.getElementById('body').getElementsByTagName('tr')[i].style.display="table-row";
            }
        }
    }
    document.getElementById('filtertable').addEventListener('keyup',filter);


})();




