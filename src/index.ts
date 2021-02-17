import express from 'express'

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.json({message: 'It works!'});
});
app.listen(port, ()=>{
    return console.log(`App is listening on port ${port}`);
});