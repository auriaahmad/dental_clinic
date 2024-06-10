import React, { useEffect, useState } from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { useLocation } from 'react-router';
import { downloadInvoiceAPI } from '../../apis/billing';
import Invoice from './Invoice';

const styles = StyleSheet.create({
  viewer: {
    maxWidth: '90%',
    height: window.innerHeight,
  },
});

const PDFViewerPage = () => {
  const location = useLocation();
  const [invoice, setInvoice] = useState();

  useEffect(() => {
    const splittedPath = location.pathname.split('/');
    const _billing = splittedPath[splittedPath.length - 1];

    const downloadInvoice = async billing => {
      const response = await downloadInvoiceAPI(_billing);
      setInvoice(response.data.invoice);
    };
    downloadInvoice();
  }, []);

  return (
    <div>
      <PDFViewer style={styles.viewer}>
        <Invoice invoice={invoice} />
      </PDFViewer>
    </div>
  );
};

export default PDFViewerPage;
