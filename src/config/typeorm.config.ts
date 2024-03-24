import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig : TypeOrmModuleOptions={
    type : 'postgres',
    host :'localhost',
    port :5432,
    username :'postgres',
    password :'postgres',
    database :'taskmanagement',
    autoLoadEntities: true,
    synchronize : true,
}