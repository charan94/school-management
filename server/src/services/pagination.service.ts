import { injectable } from "inversify";
import { Like, Repository } from "typeorm";
import { LOGGER } from "../config/logger";
import { IPaginationRequest, IPaginationResponse } from "../interfaces";
import { getMilliSeconds } from "../utils";

@injectable()
export class PaginationService<T> {

    constructor() { }

    async findRecords(paginationProps: IPaginationRequest<T>, repository: Repository<T>, fields?: Array<string>) {

        const limit = parseInt(`${paginationProps.limit}`) || 10;
        const skip = parseInt(`${paginationProps.skip}`) || 0;
        const filter = paginationProps?.filter ? JSON.parse(`${paginationProps?.filter}`) : [];
        const order = paginationProps?.sort ? JSON.parse(`${paginationProps?.sort}`) : {};

        const result: IPaginationResponse<T> = {
            limit,
            skip
        };

        let query = {};
        for (let i = 0; i < filter.length; i++) {
            query[filter[i].column] = Like(`%${filter[i].value}%`);
        }

        const data: [T[], number] = await repository.findAndCount({
            skip: skip,
            take: limit,
            order: order,
            where: query
        });

        result.records = data[0].map((record: any) => {
            if (record?.created) {
                record.created = getMilliSeconds(record.created);
            }
            if (record?.updated) {
                record.updated = getMilliSeconds(record.updated);
            }
            delete record?.id;
            delete record?.deleted;
            return record;
        });
        result.totalRecords = data[1];
        return result;
    }
}