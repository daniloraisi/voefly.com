module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'fly-site'),
        username: env('DATABASE_USERNAME', 'fly-site'),
        password: env('DATABASE_PASSWORD', 'fly-site'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
