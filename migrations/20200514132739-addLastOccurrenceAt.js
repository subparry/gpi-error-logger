"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

var colName = "last_occurrence_at";
var colSpec = {
  type: "timestamp",
};

exports.up = function (db) {
  return db.addColumn("errors", colName, colSpec);
};

exports.down = function (db) {
  return db.removeColumn("errors", colName);
};

exports._meta = {
  version: 1,
};
