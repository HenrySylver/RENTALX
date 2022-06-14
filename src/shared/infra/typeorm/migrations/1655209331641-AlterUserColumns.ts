import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserColumns1655209331641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "name",
      new TableColumn({ name: "full_name", type: "varchar" })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "full_name",
      new TableColumn({ name: "name", type: "varchar" })
    );
  }
}
