import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessRuleService } from './business_rule.service';
import { CreateBusinessRuleDto } from './dto/create-business_rule.dto';
import { UpdateBusinessRuleDto } from './dto/update-business_rule.dto';

@Controller('business-rule')
export class BusinessRuleController {
  constructor(private readonly businessRuleService: BusinessRuleService) {}

  @Post()
  create(@Body() createBusinessRuleDto: CreateBusinessRuleDto) {
    return this.businessRuleService.create(createBusinessRuleDto);
  }

  @Get()
  findAll() {
    return this.businessRuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessRuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessRuleDto: UpdateBusinessRuleDto) {
    return this.businessRuleService.update(+id, updateBusinessRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessRuleService.remove(+id);
  }
}
