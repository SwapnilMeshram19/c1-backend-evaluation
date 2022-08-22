const express = require("express");
const dns=require("node:dns");
const app = express();

app.use(express.json());
const products = [{
    id:'1',
    title:"tshirt",
    price:'20000'
}];



app.get("/products", (req, res) => {
  res.send({
    products,
  });
});

app.post("/products/add", (req, res) => {
  try {
    const product  = req.body
    const { title,price } = product
    console.log(title);
    let max = 0;
    products.forEach((product) => {
      max = Math.max(max, product.id);
    });
    let data = {
      id: max + 1,
      title,
      price
    };

    products.push(data);

    return res.send("product has been added");
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("internal server Error");
  }
});

app.post("/getmeip",(req,res)=>{

    try {
        const {url}=req.body;
        console.log(url)
        dns.lookup(url, (err, address, family) => {
            
            return res.send(address)
          });
       
    } catch (error) {
        console.log(error);
        return res.status(500).send("internal server Error");
    }
   

})

app.put("/products/:id",(req,res)=>{
    let temp=null;
    let pid=req.params.id
    let changeProduc=products.find((ele,index)=>{
        if(ele.id==pid){
            temp=index
            return ele.id==pid
        }
    })
    changeProduc={...changeProduc,...req.body}
    products[temp]=changeProduc
    return res.send("product has been changed")
})


app.delete('/products/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id)

    let index=-1;

    products.find((product,i)=>{
        if(product.id==id){
            
        }
    })
})

app.listen(8080, () => {
  console.log("server started on http://localhost:8080");
});
