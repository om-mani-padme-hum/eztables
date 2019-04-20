/** Require external modules */
const ejs = require(`ejs`);
const express = require(`express`);
const ezhtml = require(`ezhtml`);
const eztables = require(`./index`);
const fs = require(`fs`);
const octicons = require(`octicons`);

/** Create express app */
const app = express();

/** Create route for example at URL root */
app.get(`/`, (req, res) => {
  /** Create EZ Table */
  const table = new eztables.Table();
  
  /** Create table head */
  table.head();
  
  /** Create table row in table head */
  table.row();
  
  /** Create table headers */
  table.header().text(`Column 1`);
  table.header().text(`Column 2`);
  table.header().text(`&nbsp;`);
  table.header().text(`&nbsp;`);
  
  /** Create table body */
  table.body();
  
  /** Loop from 1 to 10 for demo table row numbers... */
  for ( let i = 1; i <= 10; i++ ) {
    /** Create table row in table body */
    table.row();
    
    /** Create table data cells with example data and edit/delete buttons */
    table.data().text(`Row ${i} Data 1`);
    table.data().text(`Row ${i} Data 2`);
    table.data().style(`text-align: center;`).append(new ezhtml.Anchor().href(`edit?id=${i}`).text(octicons.pencil.toSVG({ width: 16 })));
    table.data().style(`text-align: center;`).append(new ezhtml.Anchor().href(`delete?id=${i}`).text(octicons.trashcan.toSVG({ width: 16 })));
  }
  
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
