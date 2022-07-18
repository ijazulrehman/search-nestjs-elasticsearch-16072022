//

import {
  dotenvLoader,
  selectConfig,
  TypedConfigModule,
} from 'nest-typed-config';

import { IsNumber, IsNumberString, IsPort, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

class Config {
  @IsPort()
  public readonly PORT: string = '4009';

  @IsString()
  public readonly ES_HOST: string;

  @IsString()
  public readonly DATABASE_CLIENT: string;

  @IsString()
  public readonly DATABASE_NAME: string;

  @IsString()
  public readonly DATABASE_USERNAME: string;

  @IsString()
  public readonly DATABASE_HOST: string;

  @IsPort()
  public readonly DATABASE_PORT: string = '27017';

  @IsString()
  public readonly DATABASE_PASSWORD: string;

  @IsNumberString()
  @Transform(({ value }: { value: string }) => Number(value))
  public readonly DATABASE_CONNECTION_TIME_OUT: number;

  @IsNumberString()
  @Transform(({ value }: { value: string }) => Number(value))
  public readonly DATABASE_ACQUIRE_TIME_OUT: number;

  @IsNumberString()
  @Transform(({ value }: { value: string }) => Number(value))
  public readonly DATABASE_CONNECTION_LIMIT: number;
}

export const ConfigModule = TypedConfigModule.forRoot({
  schema: Config,
  load: dotenvLoader(),
});

export const config = selectConfig(ConfigModule, Config);
