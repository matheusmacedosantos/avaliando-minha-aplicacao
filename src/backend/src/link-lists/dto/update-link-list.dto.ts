import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkListDto } from './create-link-list.dto';

export class UpdateLinkListDto extends PartialType(CreateLinkListDto) {}
