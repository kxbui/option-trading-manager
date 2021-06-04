import { Injectable } from '@angular/core';

export class FirestoreBuilderService {
  static build(json: any): any {
    const form = {} as any;

    Object.keys(json).forEach(key => {
      if (json[key] instanceof Array) {
        form[key] = FirestoreBuilderService.buildArray(json[key]);
      } else if (json[key] instanceof Object) {
        form[key] = FirestoreBuilderService.build(json[key]);
      } else {
        form[key] = FirestoreBuilderService.buildField(json, key);
      }
    });
    return form;
  }

  static buildField(json: any, key: string) {
    const type = FirestoreBuilderService.getType(json[key]);
    const value = {} as any;
    value[type] = json[key];
    return value;
  }

  static buildArray(arr: any[]) {
    const values = [] as any[];
    arr.forEach(item => {
      const fields = {} as any;
      Object.keys(item).forEach(k => {
        if (item[k] instanceof Array) {
          fields[k] = FirestoreBuilderService.buildArray(item[k]);
        } else if (item[k] instanceof Object) {
          fields[k] = FirestoreBuilderService.build(item[k]);
        } else {
          fields[k] = FirestoreBuilderService.buildField(item, k);
        }
      });
      values.push({ mapValue: { fields: fields } });
    });
    return { arrayValue: { values: values } };
  }

  static getType(value = '') {
    if (value === null || value === undefined) {
      return 'nullValue';
    } else if (Number.isInteger(value)) {
      return 'integerValue';
    } else {
      return 'stringValue';
    }
  }

  static buildPatchParams(obj: any) {
    const form = [] as any[];
    Object.keys(obj).forEach(key => {
      form.push(`updateMask.fieldPaths=${key}`);
    });
    return form.join('&');
  }
}
