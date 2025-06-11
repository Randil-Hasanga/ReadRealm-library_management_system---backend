import { PartialType } from '@nestjs/swagger';
import { CreateDipDto } from './create-dip.dto';

export class UpdateDipDto extends PartialType(CreateDipDto) {}
