const express = require('express');
const app = express();

// Use the PORT environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});