const express = require('express')
const app = express.Router()
const yearController=require('../../Controller/Admins/financialYearAssign');
const{headController,getHeadFields, deleteHead, updateHead} = require('../../Controller/Admins/feesHead');
const ledgerController = require('../../Controller/Admins/feesLedger');
const accountController = require('../../Controller/Admins/accountDetails');
const feesAllotController = require('../../Controller/Admins/feesAllotment');
app.post("/year",yearController);
app.post("/head",headController);
app.get("/head",getHeadFields)
app.delete("/head",deleteHead)
app.put('/head',updateHead)
app.post("/ledger",ledgerController);
app.post("/account",accountController);
app.post("/feesAllot",feesAllotController);
module.exports=app;