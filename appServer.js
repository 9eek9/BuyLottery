const { Console } = require('console');
const express = require('express');
const path = require('path');
const appServer = express();
const alert = require('alert'); 

const host = 'localhost';
const port = 8082;

var bodyParser = require("body-parser");
appServer.use(bodyParser.urlencoded({ extended: false }));

appServer.use(express.static('public'));

appServer.get('/Lottery',(req, res)=>{
    res.sendFile(__dirname + "/" + 'Lottery.html');
});

appServer.post('/submit-Lottery', (req, res)=> {
    let name = req.body.Name;
    let age = req.body.Age;
    let number = req.body.LotteryNo;

    let ticket = new TicketInfo(name, age, number);

    buyLotteryNumber(ticket);

    
    //res.send('Successfully bought the ticket no ' + number );
    res.sendFile(__dirname + "/" + 'Lottery.html');
});

appServer.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

/////////////////////////////////////////////////////////////////////

class TicketInfo{
    constructor(name, age, ticketNum){
        this.Name = name;
        this.Age = age;
        this.TicketNum = ticketNum;
    }

    setName(newName){
        this.Name = newName;
    }
    
    setAge(newAge){
        this.Age = newAge;
    }

    setTicketNo(newTicketNo){
        this.TicketNum = newTicketNo;
    }
    
    getTicketNo(){
        return this.TicketNum;
    }
};

var ticketLists = [];
let size = 0;


function buyLotteryNumber(ticket){
    
    insertToLists(ticketLists, ticket);

}

function insertToLists(ticketLists, ticket){

    //console.log(ticket.Name);
    //console.log(ticket.Age);
    //console.log(ticket.TicketNum);

    let sizeOfList = sizeOfArray(ticketLists);
    //console.log(sizeOfList);

    if(sizeOfList > 0){
        if(ticketAldySold(ticketLists, sizeOfList, ticket.TicketNum) == true){
            alert("Ticket no "  + ticket.TicketNum + " is aldy bought to someone.")
        }
        else{
                ticketLists[sizeOfList] = {
                    Name: ticket.Name,
                    Age : ticket.Age,
                    TicketNum : ticket.TicketNum
                }
                alert("Successfully bought the ticket no "  + ticket.TicketNum)
        }
    }
    else{
        ticketLists[sizeOfList] = {
            Name: ticket.Name,
            Age : ticket.Age,
            TicketNum : ticket.TicketNum
        }
        alert("Successfully bought the ticket no "  + ticket.TicketNum)
    }

    console.log(ticketLists);
    
}


function sizeOfArray(lists){
    size = 0;
    for(let i in lists){
        size++;
    }
    return size;
}

function ticketAldySold(lists, sizeOfList, ticketNo){
    for(let i = 0; i < sizeOfList; i++){
        console.log(lists[i]);
        console.log(lists[i]["TicketNum"]);
        console.log(ticketNo);
        if(lists[i]["TicketNum"] == ticketNo){
            return true;
        }
    }
    return false;
}
