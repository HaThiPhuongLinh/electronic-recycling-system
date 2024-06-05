import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'extrabold',
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    boldText: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    itemSection: {
        marginBottom: 20,
    },
    companyInfo: {
        marginTop: 10,
    },
    note: {
        marginTop: 20,
        fontSize: 12,
        fontStyle: 'italic',
        color: 'red',
    },
    largeText: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    },
});

const OrderPDF = ({ orderData }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Order Confirmation</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.boldText}>OrderID: <Text style={styles.text}>#{orderData.quotingItemId}</Text></Text>
                <Text style={styles.boldText}>Date Of Offer: <Text style={styles.text}>{orderData.date}</Text></Text>
                <Text style={styles.boldText}>Customer Name: <Text style={styles.text}>{orderData.customer.name}</Text></Text>
                <Text style={styles.boldText}>Email: <Text style={styles.text}>{orderData.customer.email}</Text></Text>
                <Text style={styles.boldText}>Address: <Text style={styles.text}>{orderData.customer.address}</Text></Text>
            </View>
            <View style={[styles.section, styles.itemSection]}>
                <View style={styles.row}>
                    <Text style={styles.boldText}>Item</Text>
                    <Text style={styles.boldText}>Conditions</Text>
                    <Text style={styles.boldText}>Price</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{orderData.product.name}</Text>
                    <View style={styles.column}>
                        {orderData.conditions.map((condition, index) => (
                            <Text key={index} style={styles.text}>{condition.name}</Text>
                        ))}
                    </View>
                    <Text style={styles.text}>${orderData.product.price}</Text>
                </View>
                <View style={styles.row}>
                    <Text>----------------------------------------------------------------------------------------</Text>
                </View>
            </View>
            <View style={styles.companyInfo}>
                <Text style={styles.boldText}>Company: <Text style={styles.text}>TechTradeIn</Text></Text>
                <Text style={styles.boldText}>Address: <Text style={styles.text}>11567 E Broadview Dr</Text></Text>
                <Text style={styles.boldText}>Phone: <Text style={styles.text}>+48 654-430-309</Text></Text>
                <Text style={styles.boldText}>Email: <Text style={styles.text}>techtradein@gmail.com</Text></Text>
            </View>
            <View style={styles.note}>
                <Text style={styles.largeText}>
                    Please print this PDF and include it in the box with your device. Send the package to the company's address.
                </Text>
                <Text style={styles.largeText}>
                    Note: Ensure the device is properly packed with adequate shock protection.
                </Text>
            </View>
        </Page>
    </Document>
);

export default OrderPDF;
