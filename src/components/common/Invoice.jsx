import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Defs,
  RadialGradient,
  Stop,
  Rect,
} from '@react-pdf/renderer';
import logo from '../../assets/LOGO.png';
import { useGlobalStore } from '../../store/store';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {},
  header: {
    width: '100%',
    height: '70px',
    backgroundColor: '#0a0d25',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 25px',
  },
  logo: {
    width: '50px',
    height: '50px',
    // marginLeft: '16px',
  },
  invoiceHeading: {
    color: 'white',
    fontWeight: 'semibold',
  },
  heading: {
    textAlign: 'center',
    marginTop: '50px',
  },
  headingText: {
    fontSize: '25px',
    fontWeight: 'bold',
  },
  invoiceDetails: {
    textAlign: 'center',
    marginTop: '50px',
  },
  invoiceDetailsText: {
    fontSize: '18px',
    fontWeight: 'medium',
  },
  description: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '25px',
    marginTop: '50px',
  },
  descriptionBox: {
    width: '350px',
    height: '100px',
    border: '1px solid #0a0d25',
    borderRadius: '16px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f1f1',
  },
  invoiceContent: {
    width: '725px',
    height: '250px',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  centered: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '50px',
    position: 'relative',
  },

  lowerBox: {
    width: '80%',
    position: 'absolute',
    bottom: '0',
    backgroundColor: '#0a0d25',
    height: '25px',
    borderRadius: '16px',
  },
  upperBox: {
    width: '100%',
    height: '100%',
    border: '1px solid #0a0d25',
    backgroundColor: '#f2f1f1',
    borderRadius: '16px',
    display: 'flex',
    padding: '25px',
  },
  leftUpperBox: {
    width: '50%',
    height: '100%',
    borderRadius: '1px solid black',
  },
  contentText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  commentsBox: {
    width: '725px',
    height: 'auto',
    border: '1px solid #0a0d25',
    borderRadius: '16px',
    padding: '25px 25px',
    backgroundColor: '#f2f1f1',
  },
});

const Invoice = ({ invoice, user }) => {
  console.log(invoice);

  const calculatePrice = () => {
    let totalPrice = 0;
    totalPrice += parseInt(invoice?._product?.price);
    if (invoice?._complementaryProduct)
      totalPrice += parseInt(invoice?._complementaryProduct?.price);
    return totalPrice;
  };

  return (
    <Document>
      <Page size='A3' style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image src={logo} style={styles.logo} />
          </View>
          <View>
            <Text style={styles.invoiceHeading}>
              {user.lang === 'es' ? 'FACTURA' : 'INVOICE'}
            </Text>
          </View>
        </View>

        <View style={styles.heading}>
          <Text style={styles.headingText}>
            Digital Plastic Orthodontic Planning Service
          </Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.invoiceDetailsText}>
            {user.lang === 'es' ? 'Número de factura' : 'Invoice Number'}:{' '}
            {invoice?.invoiceNumber}
          </Text>
          <Text style={styles.invoiceDetailsText}>
            {user.lang === 'es'
              ? 'Número de planificación de factura'
              : 'Planning Number'}
            : {invoice?._plan?.planningNumber || '-'}
          </Text>
          <Text style={styles.invoiceDetailsText}>
            {user.lang === 'es' ? 'Fecha' : 'Dated'}:{' '}
            {moment(invoice?.createdAt).format('MM/DD/YYYY')}
          </Text>
        </View>

        <View style={styles.description}>
          <View style={styles.descriptionBox}>
            <Text style={styles.invoiceDetailsText}>Nebula Nexus LLC</Text>
            <Text style={styles.invoiceDetailsText}>
              8206 Louisiana Blvd NE Ste B,
            </Text>
            <Text style={styles.invoiceDetailsText}>
              #10080, Albuquerque, NM 87113, US
            </Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.invoiceDetailsText}>
              {invoice?._dentist?.billingInformation?.company}
            </Text>
            <Text style={styles.invoiceDetailsText}>
              {invoice?._dentist?.billingInformation?.cnif}
            </Text>
            <Text style={styles.invoiceDetailsText}>
              {invoice?._dentist?.billingInformation?.address
                ? `${invoice?._dentist?.billingInformation?.address}, `
                : ''}
              {invoice?._dentist?.billingInformation?.city
                ? `${invoice?._dentist?.billingInformation?.city},`
                : ''}
              {invoice?._dentist?.billingInformation?.postalCode
                ? `${invoice?._dentist?.billingInformation?.postalCode},`
                : ''}
              {invoice?._dentist?.billingInformation?.country}
            </Text>
          </View>
        </View>

        <View style={styles.centered}>
          <View style={styles.invoiceContent}>
            <View style={styles.upperBox}>
              <Text style={styles.contentText}>
                Doctor: {invoice?._dentist?.name || '-'}
              </Text>
              <Text style={styles.contentText}>
                {user.lang === 'es' ? 'Paciente' : 'Patient'}:{' '}
                {invoice?._patient?.name || '-'}
              </Text>
              <Text style={styles.contentText}>
                {user.lang === 'es' ? 'Número de paciente' : 'Patient Number'}:
                {invoice?._patient?.patientNumber || '-'}
              </Text>
              <Text style={styles.contentText}>
                {user.lang === 'es' ? 'Planificación' : 'Planning'}:{' '}
                {invoice?._plan?.planningNumber || '-'}
              </Text>

              <Text style={styles.contentText}>
                {user.lang === 'es' ? 'Producto' : 'Product'}:{' '}
                {/* {invoice?._product?.product || '-'} */}
                {invoice?._plan?.product?.name ||
                  invoice?._product?.product ||
                  '-'}
              </Text>
              <Text style={styles.contentText}>
                {user.lang === 'es'
                  ? 'Producto complementario'
                  : 'Complementary Product'}
                : {invoice?._complementaryProduct?.product || '-'}
              </Text>
              <Text style={styles.contentText}>
                {user.lang === 'es' ? 'Precio' : 'Price'}:{' '}
                {calculatePrice() || '-'}
              </Text>
            </View>
          </View>
        </View>
        {invoice?.comment && (
          <View style={styles.centered}>
            <View style={styles.commentsBox}>
              <Text>{invoice?.comment || '-'}</Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default Invoice;
