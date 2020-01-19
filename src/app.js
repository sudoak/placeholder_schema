const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortId = require('shortid');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/schema', (req,res) => {
    db.get('schemas')
    .push(req.body)
    .write()
    res.status(200).json({err:null, message:"successfully stored", code: 200, data : req.body});
});

app.get('/schema/:id', async (req,res) => {
    const schmemaId = req.params.id || 1;
    const _ = await db.get('schemas')
    .find({ id : parseInt(schmemaId) })
    .value();
    res.status(200).json(_);
});

app.put('/schema/:id',(req,res)=>{
    const schmemaId = req.params.id || 1;
    db.get('schemas')
    .find({ id: parseInt(schmemaId) })
    .assign({ schema : req.body.schema})
    .write();
    res.status(200).json(req.body);
});

app.delete('/schema/:id',(req,res) => {
    const schmemaId = req.params.id;
    if(schmemaId){
        db.get('schemas')
        .remove({ id: parseInt(schmemaId) })
        .write()
    }
    res.json({err:null, message:"Successfully Deleted"});
});

app.get('/schema/data/:id',(req,res)=>{
    const schmemaId = req.params.id;
    let _ = []
    if(schmemaId){
        _ = db.get(schmemaId)
        .value()
    }
    res.json(_);
});

app.post('/schema/data',(req,res)=>{

    const schmemaId = String(req.body.id) || "1";
    req.body.id = shortId.generate();
    const hasDbMapping = db.has(schmemaId).value()
    if(!hasDbMapping){
        setArraySchema(schmemaId);
    }
    const _= db.get(schmemaId)
    .push(req.body)
    .write()

    res.status(200).json({err:null, message:"successfully stored", code: 200, data : req.body});
});

app.delete('/schema/data/:schemaId/:id',(req,res)=>{
    const schmemaId = req.params.schemaId;
    const id = req.params.id;
    if(schmemaId,id){
        db.get(schmemaId)
        .remove({ id })
        .write()
        return res.json({err:null, message:"Successfully deleted"})
    }
    return res.status(400).json({err:"Bad Request"});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function setArraySchema (_) {
    db.set(_, [])
    .write();
    return;
}