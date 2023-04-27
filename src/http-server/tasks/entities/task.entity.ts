import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Task {
  id!: string;

  @Length(1, 255)
  title!: string;

  @IsDate()
  @Type(() => Date)
  created!: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  due!: Date | null;

  @IsBoolean()
  done!: boolean;

  @IsInt()
  @Min(1)
  @Max(100)
  priority!: number;

  authorId!: string;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
