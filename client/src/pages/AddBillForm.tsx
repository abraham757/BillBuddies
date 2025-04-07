import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_BILL } from '../utils/mutation';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';

const AddBillForm = () => {
  const [billData, setBillData] = useState({
    billId: '',
    amount: 0,
    description: '',
    participants: '',
    paidBy: '',
    date: '',
  });

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

 

  const [saveBill] = useMutation(SAVE_BILL, { refetchQueries: [{ query: GET_ME }] });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const participantsArray = billData.participants
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p);

        console.log('Bill to save---------------', billData);
      const { data } = await saveBill({
        variables: {
          billData: {
            billId: billData.billId,
            amount: parseFloat(String(billData.amount)),
            description: billData.description,
            participants: participantsArray,
            paidBy: billData.paidBy,
            date: billData.date,
          },
        },
      });

      console.log('Bill saved:', data);
      setBillData({
        billId: '',
        amount: 0,
        description: '',
        participants: '',
        paidBy: '',
        date: '',
      });
      setValidated(false);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      <h2>Add a New Bill</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
          Something went wrong while saving the bill!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label>Bill ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a unique bill ID"
            name="billId"
            value={billData.billId}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="amount"
            value={billData.amount}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={billData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Participants (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., alice,bob,charlie"
            name="participants"
            value={billData.participants}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Paid By</Form.Label>
          <Form.Control
            type="text"
            name="paidBy"
            value={billData.paidBy}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={billData.date}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Bill
        </Button>
      </Form>
    </>
  );
};

export default AddBillForm;
