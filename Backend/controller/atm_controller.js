const atm_blue_print = require('../model/blue_print')

exports.create = async (req, res) => {
    try {
        const add_member = await atm_blue_print.create(req.body)
        res.status(200).json({ success: true, message: "success", data: add_member })
    }
    catch (err) {
        console.log("Some Error", err)
    }
}

// Find By Password
exports.findPass = async (req, res) => {
    try {
        const pass = req.params.pass
        const pass_res = await atm_blue_print.findOne({ password: pass });
        if (pass_res) {
            res.status(200).json({ message: "Success", success: true, data: pass_res })
        }
        else {
            res.status(404).json({ message: "Failed", success: false, data: pass_res })
        }
    }
    catch (err) {
        console.log("Error Come From Password")
    }
}

// Find By Balance
exports.findBal = async (req, res) => {
    try {
        const bal = req.params.bal
        const bal_res = await atm_blue_print.findOne({ balance: bal });
        if (bal_res) {
            res.status(200).json({ message: "Success", success: true, data: bal_res })
        }
        else {
            res.status(404).json({ message: "Failed", success: false, data: bal_res })
        }
    }
    catch (err) {
        console.log("Error Come From Balance")
    }
}

// Update Withdraw

exports.updateWithdraw = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        // console.log(data);
        const with_result=await atm_blue_print.findByIdAndUpdate(
            {_id:id},
            data,
            {new:true}
        );
        res.status(200).json({success:true,message:"success",data:with_result})
    }
    catch(err){
        console.log("Error From Update One")
    }
}