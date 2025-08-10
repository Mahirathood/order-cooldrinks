import express from "express";
import { path } from "express/lib/application";
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () =>{
  console.log('sever is listening on port')
})
