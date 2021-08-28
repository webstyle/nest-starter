import { Injectable } from "@nestjs/common";
import Knex, { Knex as QueryBuilder } from 'knex';
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { KnexPoolOptions } from "./knex.types";

const defaultPool: KnexPoolOptions = { min: 0, max: 7 }

@Injectable()
export class KnexService {
    private knex: QueryBuilder

    constructor(@InjectPinoLogger(KnexService.name) private readonly logger: PinoLogger) {}

    connect(connection: Record<string, string>, pool: KnexPoolOptions = defaultPool) {
        let conn = {
            client: 'pg',
            connection,
            migrations: {
                tableName: 'migrations'
            },
            pool
        }
        this.knex = Knex(conn)
        this.checkState()
        return this.knex;
    }

    getKnex() {
        return this.knex;
    }

    private async checkState() {
        const {rows: [time] } = await this.knex.raw(`select now()`);
        this.logger.info(`Database was connected successfully. DB Time :  ${time.now}`)
    }
}