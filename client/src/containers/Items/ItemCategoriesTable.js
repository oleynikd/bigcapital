import React, { useCallback, useMemo } from 'react';
import Icon from 'components/Icon';
import ItemsCategoryConnect from 'connectors/ItemsCategory.connect';
import DialogConnect from 'connectors/Dialog.connector';
import LoadingIndicator from 'components/LoadingIndicator';
import { compose } from 'utils';
import DataTable from 'components/DataTable';
import {
  Button,
  Popover,
  Menu,
  MenuItem,
  Position,
} from '@blueprintjs/core';

const ItemsCategoryList = ({
  categories,
  onFetchData,
  onDeleteCategory,
  onEditCategory,
  openDialog,
  count,
  onSelectedRowsChange,
}) => {
  const handelEditCategory = (category) => () => {
    openDialog('item-form', { action: 'edit', id: category.id });
    onEditCategory(category.id);
  };

  const handleDeleteCategory = (category) => () => {
    onDeleteCategory(category);
  };

  const actionMenuList = (category) => (
    <Menu>
      <MenuItem text='Edit Category' onClick={handelEditCategory(category)} />
      <MenuItem
        text='Delete Category'
        onClick={handleDeleteCategory(category)}
      />
    </Menu>
  );

  const columns = useMemo(() => [
    {
      id: 'name',
      Header: 'Category Name',
      accessor: 'name',
      width: 150,
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
      className: 'description',
      width: 150,
    },
    {
      id: 'count',
      Header: 'Count',
      accessor: (r) => r.count || '',
      className: 'count',
      width: 50,
    },
    {
      id: 'actions',
      Header: '',
      Cell: ({ cell }) => (
        <Popover
          content={actionMenuList(cell.row.original)}
          position={Position.RIGHT_BOTTOM}
        >
          <Button icon={<Icon icon='ellipsis-h' />} />
        </Popover>
      ),
      className: 'actions',
      width: 50,
      disableResizing: false
    },
  ], [actionMenuList]);

  const handelFetchData = useCallback(() => {
    onFetchData && onFetchData();
  }, []);

  const handleSelectedRowsChange = useCallback((selectedRows) => {
    onSelectedRowsChange && onSelectedRowsChange(selectedRows.map(s => s.original));
  }, [onSelectedRowsChange]);

  return (
    <LoadingIndicator spinnerSize={30}>
      <DataTable
        columns={columns}
        data={Object.values(categories)}
        onFetchData={handelFetchData}
        manualSortBy={true}
        selectionColumn={true}
        expandable={true}
        onSelectedRowsChange={handleSelectedRowsChange}
      />
    </LoadingIndicator>
  );
};

export default compose(
  DialogConnect,
  ItemsCategoryConnect,
)(ItemsCategoryList);