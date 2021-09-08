import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';

import 'style/pages/FinancialStatements/Journal.scss';

import DashboardPageContent from 'components/Dashboard/DashboardPageContent';

import JournalTable from './JournalTable';
import JournalHeader from './JournalHeader';
import JournalActionsBar from './JournalActionsBar';
import { JournalSheetProvider } from './JournalProvider';
import { JournalSheetLoadingBar, JournalSheetAlerts } from './components';

import withCurrentOrganization from '../../Organization/withCurrentOrganization';
import withDashboardActions from 'containers/Dashboard/withDashboardActions';
import withJournalActions from './withJournalActions';

import { compose } from 'utils';

/**
 * Journal sheet.
 */
function Journal({
  // #withPreferences
  organizationName,

  // #withJournalActions
  toggleJournalSheetFilter
}) {
  const [filter, setFilter] = useState({
    fromDate: moment().startOf('year').format('YYYY-MM-DD'),
    toDate: moment().endOf('year').format('YYYY-MM-DD'),
    basis: 'accural',
  });

  // Handle financial statement filter change.
  const handleFilterSubmit = useCallback(
    (filter) => {
      const _filter = {
        ...filter,
        fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
        toDate: moment(filter.toDate).format('YYYY-MM-DD'),
      };
      setFilter(_filter);
    },
    [setFilter],
  );

  // Hide the journal sheet filter drawer once the page unmount.
  useEffect(() => () => {
    toggleJournalSheetFilter(false);
  }, [toggleJournalSheetFilter]);

  return (
    <JournalSheetProvider query={filter}>
      <JournalActionsBar />

      <DashboardPageContent>
        <div class="financial-statement financial-statement--journal">
          <JournalHeader
            onSubmitFilter={handleFilterSubmit}
            pageFilter={filter}
          />
          <JournalSheetLoadingBar />
          <JournalSheetAlerts />

          <div class="financial-statement__body">
            <JournalTable
              companyName={organizationName}
              journalQuery={filter}
            />
          </div>
        </div>
      </DashboardPageContent>
    </JournalSheetProvider>
  );
}

export default compose(
  withDashboardActions,
  withJournalActions,
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(Journal);
