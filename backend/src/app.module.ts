import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsController } from './words/words.controller';
import { WordsService } from './words/words.service';
import { PrismaService } from './prisma.service';
import { CorsMiddleware } from './cors.middleware';
import { PartOfSpeechesController } from './part-of-speeches/part-of-speeches.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RandomFlashHistoryController } from './random-flash-history/random-flash-history.controller';
import { RandomFlashHistoryService } from './random-flash-history/random-flash-history.service';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [
    AppController,
    WordsController,
    PartOfSpeechesController,
    UsersController,
    RandomFlashHistoryController,
  ],
  providers: [
    AppService,
    WordsService,
    PrismaService,
    UsersService,
    RandomFlashHistoryService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
