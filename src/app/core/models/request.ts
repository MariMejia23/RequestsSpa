import { Person } from "./person";
import { Status } from "./status";

export class Request {
    id?: number | undefined;
    statusId: number | undefined;
    status?: Status | undefined;
    personId: number | undefined;
    person?: Person | undefined;
}