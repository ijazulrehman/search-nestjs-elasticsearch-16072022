//

import {
    dotenvLoader,
    selectConfig,
    TypedConfigModule,
} from 'nest-typed-config';

import { IsPort } from "class-validator";

class Config {
    @IsPort()
    public readonly PORT: string = '4009';
}

export const ConfigModule = TypedConfigModule.forRoot({
    schema: Config,
    load: dotenvLoader()
});

export const config = selectConfig(ConfigModule, Config);

