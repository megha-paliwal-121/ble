import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PointDto {
  @IsInt()
  latitudeMicro: number;

  @IsInt()
  longitudeMicro: number;
}

class DeviceLocationDto {
  @ValidateNested()
  @Type(() => PointDto)
  point: PointDto;

  @IsInt()
  accuracyCm: number;
}

class ReceiveTimeDto {
  @IsInt()
  seconds: number;
}

class BeaconPayloadDto {
  @IsString()
  bleManufacturerData: string;

  @ValidateNested()
  @Type(() => ReceiveTimeDto)
  receiveTime: ReceiveTimeDto;

  @IsInt()
  rssiDbm: number;
}

class MetaDataDto {
  @IsInt()
  type: number;

  @IsString()
  version: string;
}

export class CreateBleDataDto {
  @IsString()
  deviceId: string;

  @IsString()
  orgId: string;

  @ValidateNested()
  @Type(() => DeviceLocationDto)
  deviceLocation: DeviceLocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BeaconPayloadDto)
  beaconPayloads: BeaconPayloadDto[];

  @ValidateNested()
  @Type(() => MetaDataDto)
  metaData: MetaDataDto;
}
