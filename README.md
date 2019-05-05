# EZ Tables v2.0.1

This is a small module designed to provide rendering of HTML tables with a very simple API that can be used by itself or in compatible conjunction with other EZ HTML based modules.

## Installation

`npm i eztables`

## Example

```javascript
/** Require external modules */
const ejs = require(`ejs`);
const express = require(`express`);
const ezhtml = require(`ezhtml`);
const eztables = require(`eztables`);
const fs = require(`fs`);
const octicons = require(`octicons`);

const app = express();

app.get(`/`, (req, res) => {
  const table = new eztables.Table();
  
  table.head();
  table.row();
  table.header().text(`Column 1`);
  table.header().text(`Column 2`);
  table.header().text(`&nbsp;`);
  table.header().text(`&nbsp;`);
  table.body();
  table.row();
  table.data().text(`Data 1`);
  table.data().text(`Data 2`);
  table.data().style(`text-align: center;`).append(new ezhtml.Anchor().href(`edit?id=1`).text(octicons.pencil.toSVG({ width: 16 })));
  table.data().style(`text-align: center;`).append(new ezhtml.Anchor().href(`delete?id=1`).text(octicons.trashcan.toSVG({ width: 16 })));
                    
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
```

## Table Class

The main component of EZ Tables is the Table class.  In most cases, the EZ Tables API allows everything to be driven from this class and there is no need to instansiate the individual table segments, rows, cells, etc, separately, although they certainly can be.

* **Table.body()** - Append table body to table
* **Table.data()** - Append table data cell to last table row
* **Table.footer()** - Append table footer to table
* **Table.head()** - Append table head to table
* **Table.header()** - Append table header cell to last table row
* **Table.row()** - Append table row to last table segment added, prioritizing footer, body, then header
* See the documentation for [EZ HTML Elements and Container Elements](https://github.com/om-mani-padme-hum/ezhtml#method-signatures-common-to-all-elements) for all other methods that apply to this table
* See elsewhere in the [EZ HTML](https://github.com/om-mani-padme-hum/ezhtml) documentation for all other methods available for table segments and cells, and note the methods can usually be chained together

## License

MIT