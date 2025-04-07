import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BILL } from '../utils/mutation';
import Auth from '../utils/auth';
import { removeBillId } from '../utils/localStorage';
import type { Bill } from '../models/Bill';
import { useState } from 'react';
import AddBillForm from './AddBillForm';

const SavedBills = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [removeBill, { error }] = useMutation(REMOVE_BILL);
  const [showAddBillModal, setShowAddBillModal] = useState(false); // Estado para controlar el modal

  const userData = data?.me || {};

  const handleDeleteBill = async (billId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      await removeBill({
        variables: { billId },
      });

      removeBillId(billId);
      refetch();
    } catch (err) {
      console.error('Error deleting bill:', err);
      if (error) {
        console.log('GraphQL error details:', error.message);
      }
    }
  };

  // Abrir el modal de agregar factura
  const handleShowAddBillModal = () => setShowAddBillModal(true);

  // Cerrar el modal
  const handleCloseAddBillModal = () => setShowAddBillModal(false);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light p-5" style={{ backgroundColor: '#F4E1C6' }}>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved Bills!</h1>
          ) : (
            <h1>Viewing saved bills!</h1>
          )}
        </Container>
      </div>

      {/* Botón para abrir el modal */}
      <Container>
        <Button variant="primary" onClick={handleShowAddBillModal}>
          Add New Bill
        </Button>
      </Container>

      {/* Modal con el formulario para agregar factura */}
      <Modal show={showAddBillModal} onHide={handleCloseAddBillModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* El formulario de agregar factura */}
          <AddBillForm handleClose={handleCloseAddBillModal} />
        </Modal.Body>
      </Modal>

      <Container>
        <h2 className='pt-5'>
          {userData.savedBills?.length
            ? `Viewing ${userData.savedBills.length} saved ${userData.savedBills.length === 1 ? 'bill' : 'bills'}:`
            : 'You have no saved bills yet!'}
        </h2>
        <Row>
          {userData.savedBills?.map((bill: Bill) => {
            return (
              <Col md='4' key={bill.billId}>
                <Card border='dark'>
                  <Card.Body>
                    <Card.Title>{bill.description || 'No description'}</Card.Title>
                    <p className='small'>Amount: ${bill.amount.toFixed(2)}</p>
                    <p className='small'>Paid by: {bill.paidBy}</p>
                    <p className='small'>Participants: {bill.participants.join(', ')}</p>
                    <p className='small'>Date: {bill.date || 'N/A'}</p>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBill(bill.billId)}
                    >
                      Delete this Bill!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBills;
