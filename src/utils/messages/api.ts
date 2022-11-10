const ID_CHILD_EXAMPLE = 'e782da6a-6498-412a-9da9-450d09295bfc';
const ID_GIFT_EXAMPLE = 'c6baf9e8-d18e-4c84-9777-eaa85d4544dc';

export enum ApiMessage {
  THE_ONE_RESUL = 'The one result.',
  ARRAY_OF_ALL_RECORDS = 'Array of all records.',
  THE_RECORD_DELETED = 'The record deleted.',
  THE_RECORD_NOT_FOUND = 'The record not found.',
  THE_RECORD_HAS_BEEN_SUCCESSFULLY_CREATED = 'The record has been successfully created.',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  INVALID_INPUT = 'Invalid input',
  CANNOT_DELETE_GIVEN_RECORD = 'Cannot delete given record.',
  THE_RECORD_ID = 'The record ID',
  THE_RECORD_HAS_BEEN_SUCCESSFULLY_ASSIGNED_TO_THE_SECOND_RECORD = 'The record has been successfully assigned to the second record.',
}

export const ApiExamples = {
  idChild: ID_CHILD_EXAMPLE,
  idGift: ID_GIFT_EXAMPLE,
  addGiftForChild: {
    a: {
      summary: 'Gift',
      value: {
        giftId: ID_GIFT_EXAMPLE,
      },
    },
    b: {
      summary: 'No Gift',
      value: {
        giftId: '',
      },
    },
    c: {
      summary: 'The incorrect data',
      value: {
        giftId: 'dsad',
      },
    },
  },
  addNewChild: {
    a: {
      summary: 'The correct data',
      value: {
        name: 'Bill',
      },
    },
    b: {
      summary: 'The incorrect data - example 1',
      value: {
        name: '',
      },
    },
    c: {
      summary: 'The incorrect data - example 2',
      value: {
        name: 'As',
      },
    },
  },
  oneGift: {
    a: {
      summary: 'The correct data',
      value: ID_GIFT_EXAMPLE,
    },
    b: {
      summary: 'The incorrect data',
      value: '22',
    },
  },
  oneChild: {
    a: {
      summary: 'The correct data',
      value: ID_CHILD_EXAMPLE,
    },
    b: {
      summary: 'The incorrect data',
      value: '22',
    },
  },
  addNewGift: {
    a: {
      summary: 'The correct data',
      value: {
        name: 'Train',
        count: 20,
      },
    },
    b: {
      summary: 'The incorrect data - example 1',
      value: {
        name: 'Doll',
        count: 0,
      },
    },
    c: {
      summary: 'The incorrect data - example 2',
      value: {
        name: 'Do',
        count: 10,
      },
    },
  },
};
