import { injectable } from "inversify";
import { Like, Repository } from "typeorm";
import { IPaginationRequest, IPaginationResponse } from "../interfaces";
import { getMilliSeconds } from "../utils";

@injectable()
export class PaginationService<T> {

    constructor() { }

    async findRecords(paginationProps: IPaginationRequest<T>, repository: Repository<T>, fields?: Array<string>) {

        const limit = paginationProps.limit || 0;
        const skip = paginationProps.skip || 0;
        const filter = paginationProps.filter || [];
        const order = paginationProps.sort || {};

        const result: IPaginationResponse<T> = {
            limit: limit,
            skip: skip
        };

        let query = {};
        for (let i = 0; i < filter.length; i++) {
            query[filter[i].column] = Like(filter[i].value);
        }

        const data: [T[], number] = await repository.findAndCount({
            skip: paginationProps.skip,
            take: paginationProps.limit,
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