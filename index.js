const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function getNumberData() {
  const data = fs.readFileSync('data.json');
  return JSON.parse(data);
}

app.get('/', (req, res) => {
  console.log(req);
  console.log("\n\n");
  const currentDate = new Date();
  const localDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  const NumberData = getNumberData();
  const numToPut = NumberData[localDate];
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${numToPut}</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
  </head>
  <body>
    <main>
    <div class = "date-Container">
        <h1>${localDate}</h1>
    </div>
    <div class = "number-Container">
        <h1>${numToPut}</h1>  
    </div>
    </main>
  </body>
</html>
`);
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
