const express = require('express')
const app = express.Router()
const yearController=require('../../Controller/Admins/financialYearAssign');
const{headController,getHeadFields, deleteHead, updateHead} = require('../../Controller/Admins/feesHead');
const {addLedger, getLedgerFields, deleteLedger, updateLedger} = require('../../Controller/Admins/feesLedger');
const {getAccount, addAccount, deleteAccount, updateAccount }= require('../../Controller/Admins/accountDetails');
const feesAllotController = require('../../Controller/Admins/feesAllotment');
app.post("/year",yearController);
app.post("/head",headController);
app.get("/head",getHeadFields)
app.delete("/head",deleteHead)
app.put('/head',updateHead)


app.post("/ledger",addLedger);
app.get("/ledger",getLedgerFields)
app.delete('/ledger',deleteLedger)
app.put('/ledger',updateLedger)

app.post("/account",addAccount);
app.get('/account',getAccount)
app.delete('/account',deleteAccount)
app.put('/account',updateAccount)

app.post("/feesAllot",feesAllotController);
module.exports=app;