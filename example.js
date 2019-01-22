/** Require external modules */
const ejs = require(`ejs`);
const express = require(`express`);
const eztables = require(`./index`);
const fs = require(`fs`);

const app = express();

app.get(`/`, (req, res) => {
  const table = new eztables.Table();
  
  table.head();
  table.header().text(`Serial #`);
  table.header().text(`Stock #`);
  table.header().text(`&nbsp;`);
  table.header().text(`&nbsp;`);
  table.body();
  table.data().text(`Q791234`);
  table.data().text(`CZH-4016`);
  table.editButton(1);
  table.deleteButton(1);
  
  /** Render EJS template with our rendered form */
  const html = ejs.render(fs.readFileSync(`example.ejs`).toString(), { table: table.render(6) });
  
  /** Send HTML to requestor */
  res.send(html);
});

/** Create route for example CSS */
app.get(`/css/:file`, (req, res) => {
  res.sendFile(__dirname + `/css/` + req.params.file);
});

/** Create route for example images */
app.get(`/images/:file`, (req, res) => {
  res.sendFile(__dirname + `/images/` + req.params.file);
});

/** Create route for jQuery */
app.get(`/js/jquery.min.js`, (req, res) => {
  res.sendFile(__dirname + `/node_modules/jquery/dist/jquery.min.js`);
});

app.listen(7000, () => {
  console.log(`Web server up and running on port 7000!`);
});
