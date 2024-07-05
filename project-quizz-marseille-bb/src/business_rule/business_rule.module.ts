import { Module } from '@nestjs/common';
import { BusinessRuleService } from './business_rule.service';
import { BusinessRuleController } from './business_rule.controller';

@Module({
  controllers: [BusinessRuleController],
  providers: [BusinessRuleService],
})
export class BusinessRuleModule {}
