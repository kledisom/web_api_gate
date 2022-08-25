 const express = require('express'); 
 const bodyParser = require('body-parser');  
 var cors = require('cors'); 
 const axios = require('axios'); 
 const fetch = require('node-fetch')
 var xml2js = require('xml2js'); 
 const app = express(); 


 app.use(cors()); 

 app.use(bodyParser.json()); 
 // Express modules / packages 

 app.use(bodyParser.urlencoded({ extended: true })); 
 // Express modules / packages 

 app.use(express.static('public')); 
 // load the files that are in the public directory 


 app.get('/', (req, res) => { 
   res.send("verys") 
 }) 
 app.get('/sobre', (req, res) => { 
   res.send("lk") 
 }) 



 app.post('/user', async (req, res) => {

//# Receber dados da url



//## Consulta a api da braspress;
    var dadoTray = {
        cep: req.query.cep,
        cep_destino: req.query.cep_destino,
        prods: req.query.prods,
    }
    const arr = dadoTray.prods.split(" ");
   

    console.log(arr)
   
   let data = {"cnpjRemetente":60701190000104, 
   "cnpjDestinatario":30539356867, 
   "modal":"R","tipoFrete":"1", 
    "cepOrigem":2323000, 
    "cepDestino":dadoTray.cep, 
    "vlrMercadoria":100.00, 
    "peso":50.55,"volumes":10, 
    "cubagem":[{"altura":0.46, 
    "largura":0.67, 
    "comprimento":0.67, 
    "volumes":10}]} 
          
           var authorizationBasic = 'Y2xpZW50ZTpjbGllbnRl'; 
            var response = await fetch('https://api.braspress.com/v1/cotacao/calcular/json', { 
                method: "POST", 
                body: JSON.stringify(data), 
                headers: {"Content-type": "application/json; charset=UTF-8", 
                    'Authorization': 'Basic ' + authorizationBasic, 
                } 
               }) 
           .then(response => response.json()) 
           //console.log(response.id)
         

           const id = response.id; 
           const prazo = response.prazo; 
           const totalFrete = response.totalFrete; 
       
          var obj = {
            "cotacao": {
              "resultado": {
                "codigo": id,
                "transportadora": "BRASPRESS",
                "servico": "braspress",
                "transporte": "TERRESTRE",
                "valor": totalFrete,
                "peso": 5.334,
                "prazo_min": prazo,
                "prazo_max": prazo,
                "imagem_frete": "https://fretefacil.tray.com.br/images/sedex.png",
                "aviso_envio": "",
                "entrega_domiciliar": 1
              }
            }
          }


//### Convete o json em XML e retorna;
          var builder = new xml2js.Builder(); 
          var xml = builder.buildObject(obj); 
      
        //console.log(xml); 
    
        res.set('Content-Type', 'text/xml');

     return res.send(xml);   

 }) 


 app.listen(3000, () => { // Listen on port 3000 
   console.log('Listening!') // Log when listen success 
 }) 


 function trayReq() { 
  
 } 

 function braspress(cep) { 
   let data = {"cnpjRemetente":60701190000104, 
     "cnpjDestinatario":30539356867, 
     "modal":"R","tipoFrete":"1", 
      "cepOrigem":2323000, 
      "cepDestino":cep, 
      "vlrMercadoria":100.00, 
      "peso":50.55,"volumes":10, 
      "cubagem":[{"altura":0.46, 
      "largura":0.67, 
      "comprimento":0.67, 
      "volumes":10}]} 
			
			 var authorizationBasic = 'Y2xpZW50ZTpjbGllbnRl'; 
				 fetch('https://api.braspress.com/v1/cotacao/calcular/json', { 
				  method: "POST", 
				  body: JSON.stringify(data), 
				  headers: {"Content-type": "application/json; charset=UTF-8", 
				      'Authorization': 'Basic ' + authorizationBasic, 
				  } 
				 }) 
			 .then(response => response.json()) 
			 .then(result => {
                console.log('ENVIADO', result)
            }) 
			 .catch(err => console.log(err)); 

 } 
 



 function trayRes() { 

   var obj = {name: "Super", Surname: "Man", age: 23}; 

    var builder = new xml2js.Builder(); 
    var xml = builder.buildObject(obj); 

   console.log(xml); 
 } 

 /* fetch('https://viacep.com.br/ws/01001000/json/') 
 .then(response => response.json()) 
 .then(result => console.log(result)) 
 .catch(err => console.log(err));  */