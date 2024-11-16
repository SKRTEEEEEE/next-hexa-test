import mongoose, { Document, QueryOptions, UpdateQuery } from "mongoose"

export type MongooseBaseRepository<
TBase,
TPrimary extends TBase & MongooseBase,
> = {
  create(data: Omit<TBase, 'id' >): Promise<TPrimary>
  readById(id: string): Promise<TPrimary | null>
  updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  ): Promise<TPrimary | null>
  delete(id:string):Promise<boolean>
}
export type MongooseBase = {
    id: string
    createdAt: string
    updatedAt: string
  }
  export type TimestampBase = {
     createdAt: Date;
     updatedAt: Date;
 }
export type MongooseDocument = Document