/** Require external modules */
const ezhtml = require(`ezhtml`);
const ezobjects = require(`ezobjects`);

/** Configure class */
const configTable = {
  className: `Table`,
  extends: ezhtml.Table,
  extendsConfig: ezhtml.configTable,
  properties: [
    { name: `classes`, type: `string`, default: `eztable` }
  ]
};

/** Create class */
ezobjects.createClass(configTable);

Table.prototype.body = function () {
  /** Create table body */
  const tableBody = new ezhtml.TableBody();
  
  /** Add table body to table */
  this.append(tableBody);
  
  /** Return table body for call chaining */
  return tableBody;
};

Table.prototype.data = function () {
  /** Create table data */
  const tableData = new ezhtml.TableData();
    
  let lastContainer = null;
  
  /** Create helper method for finding last containe r*/
  const recursiveLastContainer = (item) => {
    if ( item.constructor.name == `TableRow` )
      lastContainer = item;
    
    if ( typeof item.content !== `function` )
      return;
    
    /** Find last container to nest header in */
    item.content().forEach((childItem) => {
      recursiveLastContainer(childItem);
    });
  };
  
  /** Find last container */
  recursiveLastContainer(this);
  
  /** Throw error if no container found */
  if ( !lastContainer )
    throw new ReferenceError(`Table.data(): Table data must be nested inside table row, but none exists.`);
  
  /** Add table data to last container */
  lastContainer.append(tableData);
  
  /** Return table data for call chaining */
  return tableData;
};

Table.prototype.footer = function () {
  /** Create table footer */
  const tableFooter = new ezhtml.TableFooter();
  
  /** Add table head to table */
  this.append(tableFooter);
  
  /** Return table head for call chaining */
  return tableFooter;
};

Table.prototype.head = function () {
  /** Create table head */
  const tableHead = new ezhtml.TableHead();
  
  /** Add table head to table */
  this.append(tableHead);
  
  /** Return table head for call chaining */
  return tableHead;
};

Table.prototype.header = function () {
  /** Create table header */
  const tableHeader = new ezhtml.TableHeader();
    
  let lastContainer = null;
  
  /** Create helper method for finding last containe r*/
  const recursiveLastContainer = (item) => {
    if ( item.constructor.name == `TableRow` )
      lastContainer = item;
    
    if ( typeof item.content !== `function` )
      return;
    
    /** Find last container to nest header in */
    item.content().forEach((childItem) => {
      recursiveLastContainer(childItem);
    });
  };
  
  /** Find last container */
  recursiveLastContainer(this);
  
  /** Throw error if no container found */
  if ( !lastContainer )
    throw new ReferenceError(`Table.header(): Table header must be nested inside table row, but none exists.`);
  
  /** Add table header to last container */
  lastContainer.append(tableHeader);
  
  /** Return table header for call chaining */
  return tableHeader;
};

Table.prototype.row = function () {
  /** Create table row */
  const tableRow = new ezhtml.TableRow();
  
  let lastContainer = null;
  
  /** Create helper method for finding last containe r*/
  const recursiveLastContainer = (item) => {
    if ( item.constructor.name == `TableHead` || item.constructor.name == `TableBody` || item.constructor.name == `TableFooter` )
      lastContainer = item;
    
    if ( typeof item.content !== `function` )
      return;
    
    /** Find last container to nest header in */
    item.content().forEach((childItem) => {
      recursiveLastContainer(childItem);
    });
  };
  
  /** Find last container */
  recursiveLastContainer(this);

  /** Throw error if no container found */
  if ( !lastContainer )
    throw new ReferenceError(`Table.row(): Table row must be nested inside table head, table body, or table footer, but none exists.`);
  
  /** Add table row to table */
  lastContainer.append(tableRow);
  
  /** Return table row for call chaining */
  return tableRow;
};

/** Export class from module */
module.exports.configTable = configTable;
module.exports.Table = Table;
