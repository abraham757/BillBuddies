export const getSavedBillIds = () => {
  const savedBillIds = localStorage.getItem('saved_bills')
    ? JSON.parse(localStorage.getItem('saved_bills')!)
    : [];

  return savedBillIds;
};

export const saveBillIds = (billIdArr: string[]) => {
  if (billIdArr.length) {
    localStorage.setItem('saved_bills', JSON.stringify(billIdArr));
  } else {
    localStorage.removeItem('saved_bills');
  }
};

export const removeBillId = (billId: string) => {
  const savedBillIds = localStorage.getItem('saved_bills')
    ? JSON.parse(localStorage.getItem('saved_bills')!)
    : null;

  if (!savedBillIds) {
    return false;
  }

  const updatedSavedBillIds = savedBillIds?.filter((savedBillId: string) => savedBillId !== billId);
  localStorage.setItem('saved_bills', JSON.stringify(updatedSavedBillIds));

  return true;
};
