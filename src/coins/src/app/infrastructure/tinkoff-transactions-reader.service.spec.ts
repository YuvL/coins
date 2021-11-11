import {TestBed} from '@angular/core/testing';

import {
	createTinkoffRecord,
	createTinkoffRecordId,
	TinkoffTransactionsReaderService
} from './tinkoff-transactions-reader.service';
import {Workbook} from "exceljs";

describe('TinkoffTransactionsReaderService', () => {
	let service: TinkoffTransactionsReaderService;
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TinkoffTransactionsReaderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('#getRecords should throw error when no sheets in workbook', () => {
		expect(() => service.getRecords(new Workbook())).toThrow("No sheets in workbook");
	});

	it('#getRecords should throw error when sheet has no transactions', () => {
		const workbook = new Workbook();
		const worksheet = workbook.addWorksheet();
		expect(() => service.getRecords(workbook)).toThrow("Sheet has no transactions");
	});

	it('#createTinkoffRecord should return correct tinkoffRecord', () => {
		const workbook = new Workbook();
		const worksheet = workbook.addWorksheet();
		const row = worksheet.addRow([
			"31.08.2021 12:58:41",
			"31.08.2021",
			" *7601 ",
			"OK",
			" -100.99 ",
			" RUB ",
			"-100.99",
			"RUB",
			"6",
			" Супермаркеты ",
			" 5411 ",
			" Дикси ",
			"6.00",
			"0.00",
			"100.99"]);
		const tinkoffRecord = createTinkoffRecord(row);

		expect(tinkoffRecord.amount).toEqual({amount: -100.99, currency: 'RUB'})
		expect(tinkoffRecord.cardNo).toBe("*7601")
		expect(tinkoffRecord.category).toBe("Супермаркеты")
		expect(tinkoffRecord.description).toBe("Дикси")
		expect(tinkoffRecord.MCC).toBe(5411)
		expect(tinkoffRecord.status).toBe("OK")
		expect(tinkoffRecord.tinkoffRecordId).toBe(1627811921)
	});

	it('#createTinkoffRecordId should create 1627811921 when date is 31.08.2021 12:58:41', () => {
		expect(createTinkoffRecordId('31.08.2021 12:58:41')).toBe(1627811921);
		expect(createTinkoffRecordId('31. 08.   2021  12 : 58:42')).toBe(1627811922);
	});
});
