import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Instrument Records')
@Controller('instruments/records')
export class InstrumentRecordsController {
  @Post()
  create(data: any) {
    
  }
}
