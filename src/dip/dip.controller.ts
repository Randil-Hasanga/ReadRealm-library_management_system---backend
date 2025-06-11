import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DipService } from './dip.service';
import { CreateDipDto } from './dto/create-dip.dto';
import { UpdateDipDto } from './dto/update-dip.dto';

@Controller('dip')
export class DipController {
  constructor(private readonly dipService: DipService) { }

  @Get('basic')
  basic() {
    return this.dipService.basic();
  }

  @Get('clr')
  color_space() {
    return this.dipService.color_space();
  }

  @Get('hst')
  histogram() {
    return this.dipService.histogram();
  }

  @Get('sf')
  spartial_filtering() {
    return this.dipService.spartial_filtering();
  }

  @Get('morph')
  morphological() {
    return this.dipService.morphological();
  }

  @Get('it')
  intensity_transformation() {
    return this.dipService.intensity_transformation();
  }

  @Get('edge')
  edge_detection(){
    return this.dipService.edge_detection();
  }
}
