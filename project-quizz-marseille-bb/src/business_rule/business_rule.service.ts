import { Injectable } from '@nestjs/common';
import { CreateBusinessRuleDto } from './dto/create-business_rule.dto';
import { UpdateBusinessRuleDto } from './dto/update-business_rule.dto';

@Injectable()
export class BusinessRuleService {
  create(createBusinessRuleDto: CreateBusinessRuleDto) {
    return 'This action adds a new businessRule';
  }

  findAll() {
    return `This action returns all businessRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessRule`;
  }

  update(id: number, updateBusinessRuleDto: UpdateBusinessRuleDto) {
    return `This action updates a #${id} businessRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessRule`;
  }
}
