const express = require('express')
const multer = require("multer");

const app = express.Router()
const yearController=require('../../Controller/Admins/financialYearAssign');
const{headController,getHeadFields, deleteHead, updateHead} = require('../../Controller/Admins/feesHead');
const {addLedger, getLedgerFields, deleteLedger, updateLedger} = require('../../Controller/Admins/feesLedger');
const {getAccount, addAccount, deleteAccount, updateAccount }= require('../../Controller/Admins/accountDetails');
const feesAllotController = require('../../Controller/Admins/feesAllotment');
const { verifyAdmin, verifyToken } = require('../../miscellaneous/Verification');
const { handleBulkUpload } = require('../../Controller/Admins/bulkUpload');

const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post("/year", verifyToken,verifyAdmin,yearController.createYear);
app.get("/year", verifyToken,verifyAdmin,yearController.getYears);
app.put("/year/:id", verifyToken, verifyAdmin, yearController.updateYear);
app.delete("/year/:id", verifyToken, verifyAdmin, yearController.deleteYear);





app.post("/head", verifyToken, verifyAdmin, headController);
app.get("/head", verifyToken, verifyAdmin, getHeadFields)
app.delete("/head", verifyToken, verifyAdmin, deleteHead)
app.put('/head', verifyToken, verifyAdmin, updateHead)


app.post("/ledger", verifyToken, verifyAdmin, addLedger);
app.get("/ledger", verifyToken, verifyAdmin, getLedgerFields)
app.delete('/ledger', verifyToken, verifyAdmin, deleteLedger)
app.put('/ledger', verifyToken, verifyAdmin, updateLedger)

app.post("/account", verifyToken, verifyAdmin, addAccount);
app.get('/account', verifyToken, verifyAdmin, getAccount)
app.delete('/account', verifyToken, verifyAdmin, deleteAccount)
app.put('/account', verifyToken, verifyAdmin, updateAccount)

app.post("/feesAllot", verifyToken, verifyAdmin, feesAllotController);
app.post("/bulkUpload", upload.single("file"), handleBulkUpload);
module.exports=app;