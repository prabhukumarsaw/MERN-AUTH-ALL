import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';


const app = express();
const port = 8080;


// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');  //less hackers know about our stack

// Define routes
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });


//HTTP GET Request
app.get('/', (req, res) => {
  res.status(201).json("Home GET Slow Request");
});

/* api routes */

app.use('/api', router)


// Start the server only when we have valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
          })

    } catch (error) {
        console.log('Cannot Connect to the Server')
    }
}).catch(error =>{
    console.log('Invalid Database connection');
})



