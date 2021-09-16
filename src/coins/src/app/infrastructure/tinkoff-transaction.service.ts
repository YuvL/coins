import {Injectable} from '@angular/core';
import {Money} from "../domain/models";
import {Row, Workbook} from "exceljs";

@Injectable({
	providedIn: 'root'
})
export class TinkoffTransactionService {

	constructor() {
	}

	getRecords(workbook: Workbook): tinkoffRecord[] | undefined | never {
		const worksheet = workbook.getWorksheet(0);
		const rowCount = worksheet.rowCount;
		return worksheet.getRows(1, rowCount)?.map(row => createTinkoffRecord(row));
	}
}


interface tinkoffRecord {
	tinkoffRecordId: TinkoffRecordId;
	cardNo: CardNo;
	status: Status;
	amount: Money;
	MCC: MCC;
	category: Category;
	description: Description;
}

type Status = 'OK';
type Category = string;
type MCC = number;
type Description = string;
type CardNo = string;
type TinkoffRecordId = number;
const createTinkoffRecordId = (date: Date): TinkoffRecordId => date.getTime();


function createTinkoffRecord(row: Row): tinkoffRecord | never {
	console.log(row);
 throw "";
}
