import {Injectable} from '@angular/core';
import {Currency, Money} from "../domain/models";
import {Row, Workbook} from "exceljs";
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class TinkoffTransactionsReaderService {

	constructor() {
	}

	getRecords(workbook: Workbook): tinkoffRecord[] | undefined | never {
		if (!workbook.worksheets.length) {
			throw "No sheets in workbook";
		}

		const worksheet = workbook.getWorksheet(1);
		const rowCount = worksheet.rowCount;
		if (rowCount < 2) {
			throw "Sheet has no transactions";
		}

		return worksheet
			.getRows(1, rowCount)
			?.slice(1)//header
			?.map(row => createTinkoffRecord(row));
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

export const createTinkoffRecordId = (text: string): TinkoffRecordId => moment(text, 'dd.MM.yyyy hh:mm:ss').toDate().getTime() / 1000

class NeverError extends Error {
	constructor(value: never) {
		super(`Unreachable statement: ${value}`);
	}
}

export function getCurrency(text: string) : Currency {
	const curr = <Currency>text.trim();
	switch (curr) {
		case "RUB":
		case "USD":
			return curr;
		default:
			throw new NeverError(curr);
	}
}
function createStatus(text: string) : Status {
	const status = <Status>text;
	switch (status) {
		case "OK":
			return "OK";
		default:
			throw new NeverError(status);
	}
}

export function createTinkoffRecord(row: Row): tinkoffRecord | never {
	return {
		MCC: Number(row.getCell(11).text),
		amount: {
			amount: Number(row.getCell(5).text),
			currency: getCurrency(row.getCell(6).text)
		},
		cardNo: row.getCell(3).text.trim(),
		category: row.getCell(10).text.trim(),
		description: row.getCell(12).text.trim(),
		status: createStatus(row.getCell(4).text),
		tinkoffRecordId: createTinkoffRecordId(row.getCell(1).text)
	};
}
