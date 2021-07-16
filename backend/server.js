const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require('./routes/auth');
const connectDB = require('./database/db');
const eventRouts =require('./routes/event');

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/event',eventRouts);

const port = process.env. PORT || 8040

  app.listen(port, () => {
    console.log(`Listning on port ${port}`);
  });