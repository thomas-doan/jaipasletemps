import { CreateQuestionDto } from '../../question/dto/create-question.dto';

export class CreateThemeDto {
    name: string;
    description: string;
    questions: CreateQuestionDto[];
}
