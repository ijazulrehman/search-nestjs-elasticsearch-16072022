import { BaseEntity, ObjectIdColumn } from 'typeorm';

import { ObjectUtils } from 'typeorm/util/ObjectUtils';

export interface IAttributes {
  [name: string]: any;
}

export abstract class Base extends BaseEntity {
  constructor(attributes?: IAttributes) {
    super();
    if (attributes) {
      ObjectUtils.assign(this, attributes);
    }
  }

  @ObjectIdColumn()
  _id: string;
}
