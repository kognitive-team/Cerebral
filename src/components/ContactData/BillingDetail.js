import React from 'react'
import { Table } from 'semantic-ui-react'
import faker from 'faker'
import _ from 'lodash'
import { formatDate } from '../utils'

class BillingDetail extends React.Component {

    constructor(props) {
        super(props)
    }

    loadBillingData() {

        var billingTransactions = []
        for (var i = 0; i < 10; i++) {
            const fakeTransactionObj = faker.helpers.createTransaction()
            billingTransactions.push(fakeTransactionObj)
        }
        return billingTransactions
    }

    render() {
        const billingTransactions = this.loadBillingData()

        return (

            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Detail</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {billingTransactions.map( (transaction) => {
                           return <Table.Row>
                                <Table.Cell>
                                   <React.Fragment>{transaction.name}</React.Fragment> 
                                </Table.Cell>
                                <Table.Cell>
                                  {formatDate(transaction.date,"MM/DD/YYYY")} 
                                  </Table.Cell>
                                  <Table.Cell>
                                  {transaction.amount} 
                                  </Table.Cell> 
                                  <Table.Cell>
                                  {transaction.type} 
                                  </Table.Cell> 
                            </Table.Row>
                        }
                    )}
                </Table.Body>
            </Table>


        )
    }
}

export default BillingDetail;