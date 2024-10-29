import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BleData } from './entities/ble.entity';
import { CreateBleDataDto } from './dto/ble.dto';

@Injectable()
export class BleService {
  constructor(
    @InjectRepository(BleData)
    private bleDataRepository: Repository<BleData>,
  ) {}

  // async createBleData(createBleDataDto: CreateBleDataDto): Promise<BleData> {
  //   const bleData = this.bleDataRepository.create(createBleDataDto);
  //   return this.bleDataRepository.save(bleData);
  // }

  async createBleData(bleDataDto: CreateBleDataDto): Promise<BleData> {
    const { deviceId, orgId, deviceLocation, beaconPayloads, metaData } =
      bleDataDto;

    // Convert micro-degree values to decimal degrees for latitude and longitude
    const latitude = deviceLocation.point.latitudeMicro / 1_000_000;
    const longitude = deviceLocation.point.longitudeMicro / 1_000_000;

    // Extract relevant information from the first beacon payload
    const bleManufacturerData = beaconPayloads[0].bleManufacturerData;
    const receiveTime = new Date(beaconPayloads[0].receiveTime.seconds * 1000);
    const rssiDbm = beaconPayloads[0].rssiDbm;

    // Create and populate a new BleData entity
    const bleData = new BleData();
    bleData.deviceId = deviceId;
    bleData.orgId = orgId;
    bleData.latitude = latitude;
    bleData.longitude = longitude;
    bleData.accuracyCm = deviceLocation.accuracyCm;
    bleData.bleManufacturerData = bleManufacturerData;
    bleData.receiveTime = receiveTime;
    bleData.rssiDbm = rssiDbm;
    bleData.type = metaData.type;
    bleData.version = metaData.version;

    // Save the BleData entity to the database
    return await this.bleDataRepository.save(bleData);
  }
}
