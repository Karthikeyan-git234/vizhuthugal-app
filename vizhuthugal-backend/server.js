require('dotenv').config();

const express = require('express');
const cors = require('cors');

const employeeRoutes = require('./routes/employeeroute');
const authRoutes = require('./routes/authRoutes');
const workRoutes = require('./routes/workRouts');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Running');
});

app.use('/api/employees', employeeRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/work', workRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});