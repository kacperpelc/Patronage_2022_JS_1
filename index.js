
var pizzaList = document.getElementById("pizzaList");
var pizzaData = "";
let urlJson = "https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json"

async function getJson(url)
{
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function defineJson()
{
    pizzaData = await getJson(urlJson);
    setupData();
}

defineJson();


document.getElementById("basketList").innerHTML = "Głodny? Zamów naszą pizzę";
function setupData()
{
    for (let pizza of pizzaData)
    {
        pizza.count = 0;
    
        let pizzaItem = document.createElement("div");
        let pizzaTitle = document.createElement("h1");
        let pizzaOrderButton = document.createElement("div");
        let pizzaText = document.createElement("div");
        let pizzaImage = document.createElement("img");
    
        
    
        pizzaTitle.appendChild(document.createTextNode(
            pizza.id + ". " + pizza.title));
    
        pizzaOrderButton.appendChild(document.createTextNode(
            "ZAMÓW"));
    
        pizzaText.appendChild(document.createTextNode(
            "Składniki: " + pizza.ingredients + 
            "; Cena: " + pizza.price));
    
        pizzaImage.src = pizza.image;
    
        pizzaItem.appendChild(pizzaTitle);
        pizzaItem.appendChild(pizzaText);
        pizzaItem.appendChild(pizzaOrderButton);
        pizzaItem.appendChild(pizzaImage);
    
        pizzaOrderButton.setAttribute("id", pizza.id);
        pizzaOrderButton.setAttribute("class", "button")
        pizzaOrderButton.addEventListener("click", function() {orderPizza(pizza)});    
    
        main.appendChild(pizzaItem);
    }
}


function basketSumCheck()
{
    for (let pizza of pizzaData)
    {
        if (pizza.count > 0)
        return true;
    }
    return false;
}

let basketSum = 0;

function orderPizza(pizza)
{
    let basketItem = document.createElement("div");
    let basketItemTitle = document.createElement("div");
    let basketItemCount = document.createElement("div");
    let basketItemPrice = document.createElement("div");
    let pizzaRemoveButton = document.createElement("div");
    let pizzaTemp = pizza;

    pizzaRemoveButton.appendChild(document.createTextNode(
        "USUŃ"));    
    
    if (!basketSumCheck())
    {
        document.getElementById("basketList").innerHTML = "";
    }

    if (pizza.count == 0)
    {
        pizza.count++; 
        basketList.appendChild(basketItem);
        basketItem.setAttribute("id", "pizza" + pizza.id);
        basketItem.setAttribute("class", "basketItem");

        basketItemTitle.appendChild(document.createTextNode(pizza.title));
        basketItem.appendChild(basketItemTitle);

        basketItemCount.appendChild(document.createTextNode("Ilość: " + pizza.count));
        basketItem.appendChild(basketItemCount);
        
        basketItemCount.setAttribute("id", "basket" + pizza.id);

        basketItemPrice.appendChild(document.createTextNode("Cena: " + pizza.price * pizza.count + " zł"));
        basketItem.appendChild(basketItemPrice);

        basketItem.appendChild(pizzaRemoveButton);

        pizzaRemoveButton.setAttribute("id", pizza.id);
        pizzaRemoveButton.setAttribute("class", "button");
        pizzaRemoveButton.addEventListener("click", function() {removePizza(pizzaTemp)});

        basketItemPrice.setAttribute("id", "basketItemPrice" + pizza.id);
        
        

        for (pizza of pizzaData)
        {
            basketSum = basketSum + pizza.count * pizza.price;
        }

        if (document.getElementById("basketSummary").innerHTML === "")
        {
            basketSummary.appendChild(document.createTextNode("Suma: " + Math.round(basketSum*100) / 100 + " zł"));
        }

        else
        document.getElementById("basketSummary").innerHTML = "Suma: " + Math.round(basketSum*100) / 100 + " zł";
    }

    else
    {
        pizza.count++; 
        document.getElementById("basket" + pizza.id).innerHTML = "Ilość: " + pizza.count;
        document.getElementById("basketItemPrice" + pizza.id).innerHTML = "Cena: " + Math.round(pizza.price * pizza.count * 100) / 100 + " zł";

        basketSum = basketSum + pizza.price;

        document.getElementById("basketSummary").innerHTML = "Suma: " + Math.round(basketSum*100) / 100 + " zł";
    }
}

function removePizza(pizza)
{
    
    if (pizza.count > 1)
    {
        pizza.count--;
        document.getElementById("basket" + pizza.id).innerHTML = "Ilość: " + pizza.count;
        document.getElementById("basketItemPrice" + pizza.id).innerHTML = "Cena: " + Math.round(pizza.price * pizza.count * 100) / 100 + " zł";

        basketSum = basketSum - pizza.price;
        document.getElementById("basketSummary").innerHTML = "Suma: " + Math.round(basketSum*100) / 100 + " zł";
    }

    else if (pizza.count == 1)
    {
        pizza.count--;
        document.getElementById("pizza" + pizza.id).remove();
        basketSum = basketSum - pizza.price;
        document.getElementById("basketSummary").innerHTML = "Suma: " + Math.round(basketSum*100) / 100 + " zł";
    }

    //basketSumFlag
    if (!basketSumCheck())
    {
        document.getElementById("basketSummary").innerHTML = "";
        document.getElementById("basketList").innerHTML = "Głodny? Zamów naszą pizzę";
    }

    //alert(pizza.count);
}



