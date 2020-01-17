const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/schema', (req,res) => {
    db.get('schemas')
    .push(req.body)
    .write()
    res.status(200).json({err:null, message:"successfully stored", code: 200, data : req.body});
});

app.get('/schema/:id', async (req,res) => {
    const schmemaId = req.params.id || 1;
    const _ = await db.get('schemas')
    .find({ id : parseInt(schmemaId) })
    .value();
    res.status(200).json(_);
});


app.get('/schema/v1', (req,res)=>{
    const schema = {
        name : {
            type : 'input',
            value : 'string',
            validate : true,
            rule : "/^[A-Za-z ]+$/g",
            required : true,
            placeholder : 'Enter your full name...',
            labelName : 'name'
        },
        age : {
            type : 'input',
            value : 'integer',
            validate : true,
            rule : "/[^a-z^A-Z]+$/g",
            required : true,
            placeholder : 'Enter your age...',
            labelName : 'age'
        },
        range_salary :{
            type : 'select',
            value : 'string',
            validate : false,
            rule : null,
            required : true,
            placeholder : '',
            labelName : 'range_salary',
            data : {
                salary :['0-3000000', '3000001-5000000']
            }
        },
        gender: {
            type : 'radio',
            value : 'string',
            validate : false,
            rule : null,
            required : true,
            placeholder : null,
            labelName : 'gender',
            data : {
                gender : ['Male','Female']
            }
        },
        phone_number : {
            type : 'input',
            value : 'string',
            validate : true,
            rule : "/^[0-9]{10,20}$/g",
            required : true,
            placeholder : 'Enter your phone number...',
            labelName : 'phone-number'
        }
    }
    res.json(schema);
})
app.get('/schema/v2', (req,res)=>{
    const schema = {
        name: {
            id: "name",
            class: "name",
            type: 'input',
            value: String,
            validate: false,
            rule: null,
            required: true,
            placeHolder: "Name",
            labelName: "Name"
        },
        
        dateOfBirth: {
            id: "dateOfBirth",
            class: "date-of-birth",
            type: 'datepicker',
            value: Date,
            validate: true,
            rule: null,
            required: true,
            placeHolder: Date.now(),
            labelName: "Date of Birth"
        },
        
        phoneNumber: {
            id: "phoneNumber",
            class: "phone-number",
            type: 'input',
            value: String,
            validate: true,
            rule: "/^\+[1-9]{13}$/",
            required: true,
            placeHolder: "Phone Number",
            label: "Phone Number"
        },
        
        address: {
            id: "address",
            class: "address",
            type: 'textarea',
            value: String,
            validate: false,
            rule: null,
            required: true,
            placeHolder: "Address",
            label: "Address"
        },
        
        country: {
            id: "country",
            class: "country",
            type: 'select',
            value: Object,
            data: [
                {
                    id: 1,
                    name: "Indonesia",
                    value: "Indonesia"
                },
                {
                    id: 2,
                    name: "Malaysia",
                    value: "Malaysia"
                }
            ],
            validate: false,
            rule: '',
            required: true,
            placeHolder: "Country",
            label: "Country"
        },
        
        idNumber: {
            id: "idNumber",
            class: "id-number",
            type: 'input',
            value: String,
            validate: true,
            rule: "/^[1-9]{10}$/",
            required: true,
            placeHolder: "ID Number",
            label: "ID Number"
        },
        
        gender: {
            id: "gender",
            class: "gender",
            type: 'radio',
            value: Object,
            data: [
                {
                    id: 1,
                    name: "Male",
                    value: "male"
                },
                {
                    id: 2,
                    name: "Female",
                    value: "female"
                }
            ],
            validate: false,
            rule: '',
            required: true,
            defaultValue: {
                    id: 1,
                    name: "Male",
                    value: "male"
                },
            label: "Gender"
        },
        
        salary: {
            id: "salary",
            class: "salary",
            type: 'radio',
            value: Object,
            data: [
                {
                    id : 1,
                    name : "Ak",
                    value : "ak"
                }
            ],
            validate: false,
            rule: null,
            required: true,
            defaultValue: "Salary",
            label: "Salary"
        }
    }
    res.json(schema);
})
app.get('/schema/v3', (req,res)=>{
    const schema = {
        name: {
          type: 'text',
          value: String,
          validate: true,
          rule: "/^[A-Za-z ]*$/", // no number only alphabets
          warningMessage: "Please enter a valid name",
          required: true,
          placeholder: "Enter your name",
          labelName: "Name"
        },
        email: {
          type: 'email',
          value: String,
          validate: true,
          rule: "/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/", // valid email address
          warningMessage: "Please enter a valid email address",
          required: true,
          placeholder: "Enter your email",
          labelName: "Email"
        },
        phoneNumber: {
          type: 'text',
          value: String,
          validate: true,
          rule: "/^[0-9]{12,12}$/", // valid phone number no alphabets only number, no longer than 12 characters
          warningMessage: "Please enter a valid phone number",
          required: true,
          placeholder: "Enter your phone number",
          labelName: "Phone Number",
        },
        gender: {
          type: 'select',
          value: String,
          validate: false,
          rule: "",
          warningMessage: "",
          required: true,
          placeholder: "",
          labelName: "Gender",
          data: {
            defaultValue: [
              "Male",
              "Female",
              "Rather not say"
            ]
          }
        },
        dateOfBirth: {
          type: 'date',
          value: Date,
          validate: false,
          rule: "",
          warningMessage: "",
          required: true,
          placeholder: "",
          labelName: "Date of Birth",
          data: {
            minDate: "1990-01-31"
          }
        },
        address: {
          type: 'textarea',
          value: String,
          validate: false,
          rule: "",
          warningMessage: "",
          required: true,
          placeholder: "",
          labelName: "Address",
        },
        jobExperience: {
          type: 'checkbox',
          value: Array,
          validate: false,
          rule: "",
          warningMessage: "",
          required: false,
          placeholder: "",
          labelName: "Address",
          data: {
            defaultValue: [
              "Frontend Developer",
              "Backend Developer",
              "Web Developer",
              "UI/UX Engineer",
              "Database Administrator",
              "Software Quality Engineer",
              "Data Analyst",
              "DevOps Engineer"
            ]
          }
        }
      }
      res.json(schema);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))