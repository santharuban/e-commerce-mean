import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, productType: string): any[] {
    const result: any = [];
    if (!value || filterString === "" || productType === "") {
      return value;
    }
    value.forEach((item: any) => {
      if (
        item[productType]
          .trim()
          .toLowerCase()
          .includes(filterString.toLowerCase())
      ) {
        result.push(item);
      }
    });
    return result;
  }
}
