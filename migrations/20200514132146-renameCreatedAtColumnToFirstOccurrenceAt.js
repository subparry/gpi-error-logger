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

var oldName = "created_at";
var newName = "first_occurrence_at";

exports.up = function (db) {
  return db.renameColumn("errors", oldName, newName);
};

exports.down = function (db) {
  return db.renameColumn("errors", newName, oldName);
};

exports._meta = {
  version: 1,
};
