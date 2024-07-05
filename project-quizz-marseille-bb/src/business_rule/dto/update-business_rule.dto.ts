import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessRuleDto } from './create-business_rule.dto';

export class UpdateBusinessRuleDto extends PartialType(CreateBusinessRuleDto) {}
