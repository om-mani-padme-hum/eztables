# EZ Tables v1.0.0

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

## License

MIT