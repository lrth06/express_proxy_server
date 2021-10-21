require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

// Inject ENV Variables
const port = process.env.PORT
const baseURL = process.env.API_URL
const apiKey = process.env.API_KEY


app.use(cors())
app.use(express.json())

app.get('/api/random/:request',async(req,res)=>{
    console.log(req.params.request)
    let request =req.params.request
    let url = baseURL + '?api_key='+apiKey+'&'+request
    console.log(url)
   try{
    const response = await axios.get(url)
    if(response){
        console.log(response)
        res.status(200).json(response.data)
    }
   }catch(err){
    console.log(err)
   }
})

app.get('/api/date/:request',async (req, res) => {
    console.log(req.params.request)
    let request =req.params.request
    let url = `${baseURL}?api_key=${apiKey}&date=${request}`
    console.log(url)
   try{
    const response = await axios.get(url)
    if(response){
        console.log(response)
        res.status(200).json(response.data)
    }
   }catch(err){
    console.log(err)
    res.send(err)
   }
})


  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
