import { MigrationInterface, QueryRunner } from "typeorm";

export class Project1733299141077 implements MigrationInterface {
    name = 'Project1733299141077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`BaseModel\` (\`_id\` varchar(36) NOT NULL, \`auditCreatedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`auditCreatedBy\` varchar(50) NOT NULL, \`auditModifiedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`auditModifiedBy\` varchar(50) NULL, \`auditDeletedDateTime\` datetime(6) NULL, \`auditDeletedBy\` varchar(50) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`borrower\` (\`_id\` varchar(36) NOT NULL, \`auditCreatedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`auditCreatedBy\` varchar(50) NOT NULL, \`auditModifiedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`auditModifiedBy\` varchar(50) NULL, \`auditDeletedDateTime\` datetime(6) NULL, \`auditDeletedBy\` varchar(50) NULL, \`name\` varchar(100) NOT NULL, \`phoneNumber\` varchar(100) NOT NULL, \`loanAmount\` int NOT NULL, \`totalInstallments\` int NOT NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`installmentSchedule\` (\`_id\` varchar(36) NOT NULL, \`auditCreatedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`auditCreatedBy\` varchar(50) NOT NULL, \`auditModifiedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`auditModifiedBy\` varchar(50) NULL, \`auditDeletedDateTime\` datetime(6) NULL, \`auditDeletedBy\` varchar(50) NULL, \`installmentNumber\` int NOT NULL, \`dueDate\` varchar(100) NOT NULL, \`amountDue\` float NOT NULL DEFAULT '0', \`status\` varchar(100) NOT NULL, \`loan_id\` varchar(36) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`loan\` (\`_id\` varchar(36) NOT NULL, \`auditCreatedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`auditCreatedBy\` varchar(50) NOT NULL, \`auditModifiedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`auditModifiedBy\` varchar(50) NULL, \`auditDeletedDateTime\` datetime(6) NULL, \`auditDeletedBy\` varchar(50) NULL, \`loanAmount\` float NOT NULL DEFAULT '0', \`totalInstallments\` int NOT NULL, \`outStandingAmount\` float NOT NULL DEFAULT '0', \`loanStartDate\` varchar(100) NOT NULL, \`loanStatus\` varchar(100) NOT NULL, \`borrower_id\` varchar(36) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`_id\` varchar(36) NOT NULL, \`auditCreatedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`auditCreatedBy\` varchar(50) NOT NULL, \`auditModifiedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`auditModifiedBy\` varchar(50) NULL, \`auditDeletedDateTime\` datetime(6) NULL, \`auditDeletedBy\` varchar(50) NULL, \`paymentAmount\` float NOT NULL DEFAULT '0', \`paymentDate\` varchar(100) NOT NULL, \`paymentMethod\` varchar(100) NOT NULL, \`paymentStatus\` varchar(100) NOT NULL, \`loan_id\` varchar(36) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`installmentSchedule\` ADD CONSTRAINT \`FK_8dc6430729dc8e52c4956b98630\` FOREIGN KEY (\`loan_id\`) REFERENCES \`loan\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_c96fb603d6c2ef272f16c98369d\` FOREIGN KEY (\`borrower_id\`) REFERENCES \`borrower\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_0202d49c491e0181a0e7212dc15\` FOREIGN KEY (\`loan_id\`) REFERENCES \`loan\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_0202d49c491e0181a0e7212dc15\``);
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_c96fb603d6c2ef272f16c98369d\``);
        await queryRunner.query(`ALTER TABLE \`installmentSchedule\` DROP FOREIGN KEY \`FK_8dc6430729dc8e52c4956b98630\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP TABLE \`loan\``);
        await queryRunner.query(`DROP TABLE \`installmentSchedule\``);
        await queryRunner.query(`DROP TABLE \`borrower\``);
        await queryRunner.query(`DROP TABLE \`BaseModel\``);
    }

}
