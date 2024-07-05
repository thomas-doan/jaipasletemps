import { Test, TestingModule } from '@nestjs/testing';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';

describe('ThemeController', () => {
  let controller: ThemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemeController],
      providers: [ThemeService],
    }).compile();

    controller = module.get<ThemeController>(ThemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
