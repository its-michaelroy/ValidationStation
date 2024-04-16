import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { api } from "../utilities";


const MainPage = () => {
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    const [submit, setSubmit] = useState(false);
    const [emailDetails, setEmailDetails] = useState(null);
    const [icon, setIcon] = useState(null);


const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(false);
    try {
        const newemail = {email_address:email}
        console.log('email',newemail)
    const response = await api.post('email/', newemail);
    if(response.status === 201){
        console.log('email sent', response.data)
        setSubmit(true)

        console.log('emailId', email)
        fetchEmailDetails(email)
    }
}  catch (error) {
        console.log('error', error)
    }
}

const fetchEmailDetails = async (identifier) => {
    try {
            const response = await api.get(`email/single_record/${identifier}`); // get single record
            if (response.status === 200) {
                // const responseData = JSON(response.data)
                // console.log('email details:', responseData);
                setEmailDetails(response.data);
                fetchIconInfo(response.data.isKnownSpammerDomain, response.data.is_valid);
            }
        } catch (error) {
            console.log('error fetching email:', error);
        }
    };

    const fetchIconInfo = async (isSpam, isValid) => {
        try {
            const endpoint = !isSpam && isValid ? 'icons/isValid/' : 'icons/notValid/';
            const iconResponse = await api.get(endpoint);
            if (iconResponse.status === 200) {
                setIcon(iconResponse.data);
                console.log('Icon:', iconResponse.data);
            } else {
                console.log('Failed to retrieve icon');
            }
        } catch (error) {
            console.log('error fetching icon:', error);
        }
    };

    return(
        <>
        <h1>Main ValidationStation Page</h1>
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        {submit && (
            <div className="mt-3 alert alert-success" role="alert">
                Validating email...
            </div>
        )}

        {emailDetails && (
            <div className="mt-3 alert alert-info" role="alert">
                Email Details:<br/>
                Email:{emailDetails.email_address} <br/>
                Is Valid:{emailDetails.is_valid.toString()} <br/>
                Is Spam:{emailDetails.isKnownSpammerDomain.toString()}
            </div>
        )}
            {icon && (
                <div>
                    <img src={icon} alt="Icon for Email Validation" />
                </div>
        )}
    </div>
    </>
    )
}


export default MainPage;
