import { Test, TestingModule } from '@nestjs/testing';
import { BusinessRuleService } from './business_rule.service';

describe('BusinessRuleService', () => {
  let service: BusinessRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessRuleService],
    }).compile();

    service = module.get<BusinessRuleService>(BusinessRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
