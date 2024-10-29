import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: string; // Corresponds to "deviceId" in the payload

  @Column()
  orgId: string; // Corresponds to "orgId" in the payload

  @Column('float')
  latitude: number; // Converted from "deviceLocation.point.latitudeMicro"

  @Column('float')
  longitude: number; // Converted from "deviceLocation.point.longitudeMicro"

  @Column('int')
  accuracyCm: number; // Corresponds to "deviceLocation.accuracyCm"

  @Column('text')
  bleManufacturerData: string; // Corresponds to "beaconPayloads[0].bleManufacturerData"

  @Column('timestamp')
  receiveTime: Date; // Converted from "beaconPayloads[0].receiveTime.seconds" to Date

  @Column()
  rssiDbm: number; // Corresponds to "beaconPayloads[0].rssiDbm"

  @Column()
  type: number; // Corresponds to "metaData.type"

  @Column()
  version: string; // Corresponds to "metaData.version"
}
