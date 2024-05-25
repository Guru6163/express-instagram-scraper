// index.js
import express from 'express';
import portfolioRoutes from './routes/portfolio.js';

const app = express();

app.use('/api', portfolioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
