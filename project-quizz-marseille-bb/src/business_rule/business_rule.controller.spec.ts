import { Test, TestingModule } from '@nestjs/testing';
import { BusinessRuleController } from './business_rule.controller';
import { BusinessRuleService } from './business_rule.service';

describe('BusinessRuleController', () => {
  let controller: BusinessRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessRuleController],
      providers: [BusinessRuleService],
    }).compile();

    controller = module.get<BusinessRuleController>(BusinessRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
