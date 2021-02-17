import express from 'express'

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.json({message: 'This is working!'});
});
app.listen(port, ()=>{
    return console.log(`App is listening on port ${port}`);
});