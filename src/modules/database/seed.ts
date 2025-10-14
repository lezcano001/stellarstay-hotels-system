import { DataSource } from "typeorm";
import { ILogger } from "../common/logger.port";
import { RoomOrmEntity } from "./entities/room.orm-entity";
import { RoomTypeOrmEntity } from "./entities/roomType.orm-entity";

// Apply injection to this.
export async function seedDatabase(
  logger: ILogger,
  dataSource: DataSource
) {
  const repoRoom = dataSource.getRepository(RoomOrmEntity);
  const repoRoomType = dataSource.getRepository(RoomTypeOrmEntity);
  
  const tables = dataSource.entityMetadatas.map((meta) => `"${meta.tableName}"`);

  if (tables.length === 0) {
    logger.info("No tables found to clear.");
    return;
  }

  const truncateSQL = `
    TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE;
  `;

  await dataSource.query(truncateSQL);

  const deluxe = repoRoomType.create({
    name: 'Deluxe',
    baseRate: 120,
    description: 'Deluxe room',
  });

  await repoRoomType.save(deluxe);

  const room1 = repoRoom.create({
    roomNumber: '101',
    description: 'Deluxe room 101',
    roomType: deluxe
  });

  await repoRoom.save(room1);

  logger.info('Database seeded successfully');
}