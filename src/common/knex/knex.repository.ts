import { Inject, Injectable } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { BaseRepository } from "../base.repository";
import { KnexService } from "./knex.service";

@Injectable()
export class KnexRepository<T> implements BaseRepository<T> {
    private tableName: string
    
    constructor(
        private readonly knex: KnexService,
        @InjectPinoLogger(KnexService.name) private readonly logger: PinoLogger,
    ) {}

    setTableName(name: string) {
        this.tableName = name;
    }

    insert(value: T): Promise<T> {
        return this.knex.getKnex()
        .insert<T>(value)
        .into(this.tableName)
        .first()
    }

    async batch(values: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, value: Partial<T>) {
        this.knex.getKnex()
            .update(value)
            .into(this.tableName)
            .where({ id }) 
    }

    select(criteria: Partial<T>, options = ["*"]): Promise<T[]> {
        return this.knex.getKnex()
            .select(options)
            .from(this.tableName)
            .where(criteria)
    }

    selectById(id: string, options = ["*"]): Promise<T> {
        return this.knex.getKnex()
            .select(options)
            .from(this.tableName)
            .where({ id })
            .first()
    }

    deleteById(id: string) {
        this.knex.getKnex()
            .from(this.tableName)
            .where({ id })
            .del()
    }

}