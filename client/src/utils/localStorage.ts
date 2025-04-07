export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')!)
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr: string[]) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId: string) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')!)
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId: string) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
/* Remove Book related code and replace with:
GROUPS: Use getSavedGroupIds, saveGroupIds, and removeGroupId to handle group data.
EXPENSES: Use getSavedExpenses, saveExpenses, and removeExpense to manage expense data.

For debts: The getSavedDebts, saveDebts, and removeDebt functions help with debt data.
*/