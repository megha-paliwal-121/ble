import { Controller, Post, Body } from '@nestjs/common';
import { BleService } from './app.service';
import { CreateBleDataDto } from './dto/ble.dto';

@Controller('ble')
export class BleController {
  constructor(private readonly bleService: BleService) {}

  @Post('data')
  async createBleData(@Body() createBleDataDto: CreateBleDataDto) {
    return this.bleService.createBleData(createBleDataDto);
  }
}
