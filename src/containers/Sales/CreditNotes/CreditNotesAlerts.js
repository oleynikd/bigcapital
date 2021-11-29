import React from 'react';

const CreditNoteDeleteAlert = React.lazy(() =>
  import('../../Alerts/CreditNotes/CreditNoteDeleteAlert'),
);

/**
 * Credit notes alerts.
 */
export default [
  {
    name: 'credit-note-delete',
    component: CreditNoteDeleteAlert,
  },
];
