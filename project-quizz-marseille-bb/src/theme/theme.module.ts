import { Module } from '@nestjs/common';
import { ThemeService } from './services/theme.service';
import { ThemeController } from './controllers/theme.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThemeController],
  providers: [
    ThemeService,
  ],
  exports: [ThemeService],
})
export class ThemeModule {}
