import { config } from './../../../libs/config/src';

export function ormConfig(): any {
  return {
    type: config.DATABASE_CLIENT,
    host: config.DATABASE_HOST,
    port: parseInt(config.DATABASE_PORT),
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: 'admin',
    connectTimeout: config.DATABASE_CONNECTION_TIME_OUT,
    acquireTimeout: config.DATABASE_ACQUIRE_TIME_OUT,
    extra: {
      connectionLimit: config.DATABASE_CONNECTION_LIMIT,
    },
    entities: ['dist/**/entity/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    subscribers: ['dist/observers/subscribers/*.subscriber.js'],
    cli: {
      entitiesDir: 'src/components/**/entity',
      migrationsDir: 'src/database/migrations',
      subscribersDir: 'src/observers/subscribers',
    },
  };
}
