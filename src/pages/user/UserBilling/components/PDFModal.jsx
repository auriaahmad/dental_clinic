import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import Invoice from '../../../../components/common/Invoice';
import Modal from '../../../../components/common/Modal';
import { useGlobalStore } from '../../../../store/store';

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '80vh',
    padding: '32px 0',
  },
});

const PDFModal = ({ open, setOpen, invoice }) => {
  const { user } = useGlobalStore(state => state);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        maxWidth: '600px',
        width: '100%',
        zIndex: '99999999999999999999',
      }}
    >
      <PDFViewer style={styles.viewer}>
        <Invoice invoice={invoice} user={user} />
      </PDFViewer>
    </Modal>
  );
};

export default PDFModal;
