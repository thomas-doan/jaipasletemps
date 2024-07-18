import { Theme } from '@prisma/client';
import { CreateThemeDto } from '../dto/create-theme.dto';

export interface IThemeService {
    createTheme(createThemeDto: CreateThemeDto): Promise<Theme>;
    findAll(): Promise<Theme[]>;
    findOne(id: string): Promise<Theme>;
    update(id: string, updateThemeDto: CreateThemeDto): Promise<Theme>;
    remove(id: string): Promise<void>;
}
