import React from 'react'
import { Grid, Image, Header, List, Label, Input, Form, Checkbox, Button } from 'semantic-ui-react'
import Faker from 'faker'

class AccountDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //  this.setFakeData()
    }


    render() {
        return (

            <div>

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column >
                            <Header as='h3'>Personal Details</Header>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field inline>
                                        <label>First Name</label>
                                        <Input value={Faker.name.firstName()} transparent readOnly placeholder='First name' />
                                    </Form.Field>

                                    <Form.Field inline>
                                        <label>Last Name</label>
                                        <Input value={Faker.name.lastName()} transparent readOnly placeholder='First name' />
                                    </Form.Field>

                                    <Form.Field inline>
                                        <label>Address</label>
                                        <Input transparent readOnly placeholder='Address' value={Faker.address.streetAddress()} />
                                        <Input transparent readOnly placeholder='City' value={Faker.address.city()} />
                                        <Input transparent readOnly placeholder='State' value={Faker.address.state()} />
                                        <Input transparent readOnly placeholder='Zip' value={Faker.address.zipCode()} />
                                    </Form.Field>

                                    <Form.Field inline>
                                        <label>Phone</label>
                                        <Input transparent readOnly placeholder='Phone' value={Faker.phone.phoneNumberFormat()} />
                                    </Form.Field>
                                    <Form.Field inline>
                                        <label>Email</label>
                                        <Input transparent readOnly placeholder='Email' value={Faker.internet.email()} />
                                    </Form.Field>


                                </Form.Group>
                            </Form>
                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column >
                            <Header as='h3'>Account Details</Header>
                            <Form>
                                <Form.Group widths='equal'>

                                    <Form.Field inline>
                                        <label>Account Number</label>
                                        <Input value={Faker.finance.account()} transparent readOnly placeholder='Account Number ' />
                                    </Form.Field>

                                    <Form.Field inline>
                                        <label>Last Visited</label>
                                        <Input transparent readOnly placeholder='Address' value={Faker.date.past()} />

                                    </Form.Field>

                                    <Form.Field inline>
                                        <label>Next Visit</label>
                                        <Input transparent readOnly placeholder='Phone' value={Faker.date.future()} />
                                    </Form.Field>

                                    <Form.Field inline>
                                        <label>Pending Payments</label>
                                        <Input transparent readOnly placeholder='Phone' value={`$${Faker.finance.amount()}`} />
                                    </Form.Field>

                                </Form.Group>
                            </Form>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>


            </div>
        )
    }
}

export default AccountDetail;


