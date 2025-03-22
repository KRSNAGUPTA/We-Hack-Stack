import express from 'express';
const app = express();
import cors from 'cors';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});