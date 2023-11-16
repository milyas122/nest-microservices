import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { CardDto } from '@app/common/dto/card.dto';
import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
