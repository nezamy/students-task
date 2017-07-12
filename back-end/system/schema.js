/*!
 * schema
 * Copyright(c) 2017 Mahmoud Elnezamy
 * Website http://nezamy.com
 * MIT Licensed
 */
'use strict';
var knex;
var sequence = require('when/sequence');
var _ = require('lodash');
var Schema = schema.prototype;

function schema(schema, connection){
    this._schema = schema;
    knex = require('knex')({
        client: 'mysql',
        connection: connection
    });
}

Schema.createTable = function(tableName){
    var self = this;
    return knex.schema.createTable(tableName, function (table) {
        var column;
        var columnKeys = _.keys(self._schema[tableName]);
        _.each(columnKeys, function (key) {
            if (self._schema[tableName][key].type === 'text' && self._schema[tableName][key].hasOwnProperty('fieldtype')) {
                column = table[self._schema[tableName][key].type](key, self._schema[tableName][key].fieldtype);
            }
            else if (self._schema[tableName][key].type === 'string' && self._schema[tableName][key].hasOwnProperty('maxlength')) {
                column = table[self._schema[tableName][key].type](key, self._schema[tableName][key].maxlength);
            }
            else {
                column = table[self._schema[tableName][key].type](key);
            }
            if (self._schema[tableName][key].hasOwnProperty('nullable') && self._schema[tableName][key].nullable === true) {
                column.nullable();
            }
            else {
                column.notNullable();
            }
            if (self._schema[tableName][key].hasOwnProperty('primary') && self._schema[tableName][key].primary === true) {
                column.primary();
            }
            if (self._schema[tableName][key].hasOwnProperty('unique') && self._schema[tableName][key].unique) {
                column.unique();
            }
            if (self._schema[tableName][key].hasOwnProperty('unsigned') && self._schema[tableName][key].unsigned) {
                column.unsigned();
            }
            if (self._schema[tableName][key].hasOwnProperty('references')) {
                column.references(self._schema[tableName][key].references);
            }
            if (self._schema[tableName][key].hasOwnProperty('defaultTo')) {
                column.defaultTo(self._schema[tableName][key].defaultTo);
            }
        });
    });
};

Schema.createTables = function(){
    var tables = [];
    var tableNames = _.keys(this._schema);
    var self = this;
    tables = _.map(tableNames, function (tableName) {
        console.log(`Creating table ${tableName}`);
        return function () {
            return self.createTable(tableName);
        };
    });
    return sequence(tables);
};

module.exports = schema;