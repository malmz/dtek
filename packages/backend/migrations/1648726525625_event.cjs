/* eslint-disable no-undef */
/**
 * @typedef { import("node-pg-migrate").MigrationBuilder } MigrationBuilder
 * @typedef { import("node-pg-migrate").ColumnDefinitions } ColumnDefinitions
 */

/**
 * @type {ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param {MigrationBuilder} pgm
 * @returns {Promise<void>}
 */
exports.up = async (pgm) => {
  pgm.createTable('dtek_events', {
    id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: {
        precedence: 'ALWAYS',
      },
    },
    title: { type: 'text', notNull: true },
    body: { type: 'text', notNull: true },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func(`timezone('utc'::text, now())`),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func(`timezone('utc'::text, now())`),
    },
    start_at: { type: 'timestamp with time zone', notNull: true },
    end_at: { type: 'timestamp with time zone', notNull: true },
    place: { type: 'text' },
  });
};

/**
 * @param {MigrationBuilder} pgm
 * @returns {Promise<void>}
 */
exports.down = async (pgm) => {
  pgm.dropTable('dtek_events');
};
