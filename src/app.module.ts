import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './services/search/search.module';
import { BookModule } from './components/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormconfig';
import { ObserverModule } from './observers/observer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig()),
    SearchModule,
    BookModule,
    ObserverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
