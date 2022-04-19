import { Locale } from '../locale-provider';

/* eslint-disable no-template-curly-in-string */
const localeValues: Locale = {
  locale: 'en',
  FormModal: {
    newForm: 'Create ${label}',
    editForm: 'Edit ${label}',
  },
  Table: {
    emptyText: 'This page has no data, whether go to',
    firstPage: 'Page one',
    ascend: 'ascend',
    descend: 'descend',
    cancelSort: 'Unsort',
    batchOperation: 'Batch operation',
    selectedItemsText: 'Selected ${size} items',
    operation: 'operation',
  },
  Pagination: {
    goToPage: 'Go to page',
    totalText: 'Totally ${total} items',
    pageSizeText: '${size} items / page',
  },
};

export default localeValues;
