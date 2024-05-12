import {Request} from "express";

export interface RequestDto {
    limit: number;
    search: string;
    pageKey: string;
    state: string;
    sortBy: string;
    sortOrder: "ASC" | "DESC";
}


export interface CustomRequest extends Request<{},{},{},RequestDto>{

}