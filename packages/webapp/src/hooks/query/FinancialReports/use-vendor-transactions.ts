// @ts-nocheck
import { useRequestQuery } from '../../useQueryRequest';
import { useDownloadFile } from '../../useDownloadFile';
import { useRequestPdf } from '../../useRequestPdf';
import t from '../types';

/**
 * Retrieve vendors transactions report.
 */
export function useVendorsTransactionsReport(query, props) {
  return useRequestQuery(
    [t.FINANCIAL_REPORT, t.VENDORS_TRANSACTIONS, query],
    {
      method: 'get',
      url: '/financial_statements/transactions-by-vendors',
      params: query,
      headers: {
        Accept: 'application/json+table',
      },
    },
    {
      select: (res) => ({
        data: res.data.table,
        tableRows: res.data.table.rows,
      }),
      defaultData: {
        tableRows: [],
        data: [],
      },
      ...props,
    },
  );
}

export const useVendorsTransactionsXlsxExport = (query, args) => {
  const url = '/financial_statements/transactions-by-vendors';
  const config = {
    headers: {
      accept: 'application/xlsx',
    },
    params: query,
  };
  const filename = 'transactions_by_vendor.xlsx';

  return useDownloadFile({
    url,
    config,
    filename,
    ...args,
  });
};

export const useVendorsTransactionsCsvExport = (query, args) => {
  return useDownloadFile({
    url: '/financial_statements/transactions-by-vendors',
    config: {
      headers: {
        accept: 'application/csv',
      },
      params: query,
    },
    filename: 'transactions_by_vendor.csv',
    ...args,
  });
};
/**
 * Retrieves the balance sheet pdf document data.
 */
export function useTransactionsByVendorsPdf() {
  return useRequestPdf(`financial_statements/transactions-by-vendors`);
}
