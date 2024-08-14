import React, { useState } from 'react';
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import { TextField, Autocomplete, Button, Box } from '@mui/material';
import "./contact.css"

const Contact = () => {
  const [userdata, setUserdata] = useState({ email: "", number: "", message: "" });

  const Property = [
    { label: 'For Rent' },
    { label: 'For Sale' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    formData.append("access_key", "7354be8a-228e-4337-a88c-c78ed6109bae");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      alert('Form Submitted Successfully');
    }
  };
  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <div className='contact-container'>
      <div className='container'>
        <form className='Contact' onSubmit={handleSubmit}>
          <div className='Contact-item'>
            <h1>Contact us</h1>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
              }}
            >
              <TextField
                helperText="Please enter your Email"
                label='Email'
                name='email'
                onChange={handleChange}
                value={userdata.email}
                required
              />
              <TextField
                helperText="Mobile Number"
                label='Number'
                name='number'
                onChange={handleChange}
                value={userdata.number}
                required
              />
            </Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Property}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Property" />}
            />
            <TextField
              id='filled-multiline-flexible'
              label='Enquiry'
              name='message'
              multiline
              maxRows={3}
              variant='filled'
              onChange={handleChange}
              value={userdata.message}
              required
            />
            <Button variant="contained" type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
      </section>
    </>
  )
}

export default Contact
