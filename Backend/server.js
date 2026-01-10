import express from "express"
import cors from "cors"
import mongoose from "mongoose";


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err) => {
        console.log(err)
    })


const userSchema1 = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const userSchema2 = new mongoose.Schema({
    flight: String,
    airline: String,
    aircraft: String,
    from: String,
    to: String,
    status: String,
    time: String,
    gate: String,
    completed: Boolean
});

const internalshuttle = new mongoose.Schema({
    shuttleid: { type: String, required: true },
    flightno: { type: String, required: true },
    gate: { type: String, required: true },
    type: { type: String, enum: ["Internal"], required: true },
    routefrom: String,
    routeto: String,
    pickup: String,
    drop: String,
    schedule: String,
    status: { type: String, enum: ["Running", "Delayed", "Maintenance"] },
    staff: String
});

const runwaySchema = new mongoose.Schema({
    gate: String,        // "Gate A1"
    runwayCode: String,  // "02L"
    status: String
});

const externalshuttle = new mongoose.Schema({
    shuttleid: { type: String, required: true },
    type: { type: String, enum: ["External"], required: true },
    routefrom: String,
    routeto: String,
    pickup: String,
    drop: String,
    schedule: String,
    status: { type: String, enum: ["Running", "Delayed", "Maintenance"] },
    staff: String
});

const staff = new mongoose.Schema({
    staffid:String,
    name: String,
    email: String,
    password: String,
    role: String,
    dept: String,
    shift: String,
    status: String,
    access:String,
    action : String
});

const passcenger = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const admin = mongoose.model('admin', userSchema1);

const flight = mongoose.model('flight', userSchema2);

const internal = mongoose.model('internal', internalshuttle);
const external = mongoose.model('external', externalshuttle);

const runwaystatus = mongoose.model('runway', runwaySchema);

const staffmodel = mongoose.model('staff', staff);

const passenger = mongoose.model('passenger', passcenger);

app.get('/adminpass', async (req, res) => {
    let data = await admin.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/adminpass/:id', async (req, res) => {
    let data = await admin.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/flightdetail', async (req, res) => {
    let data = await flight.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/flightdetail/:id', async (req, res) => {
    let { id } = req.params;
    let data = await flight.findById(id);
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})



app.get('/internalshuttle/:id', async (req, res) => {
    let { id } = req.params;
    let data = await internal.findById(id);
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/internalshuttle', async (req, res) => {
    let data = await internal.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/externalshuttle/:id', async (req, res) => {
    let { id } = req.params;
    let data = await external.findById(id);
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/externalshuttle', async (req, res) => {
    let data = await external.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/runway', async (req, res) => {
    let data = await runwaystatus.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/staff', async (req, res) => {
    let data = await staffmodel.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/staff/:id', async (req, res) => {
    let { id } = req.params;
    let data = await staffmodel.findById(id);
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.post('/staffpost',(req,res)=>{
    let data = new staffmodel(req.body);
    data.save();
    res.status(201).send("Data Saved Successfully");
})

app.get('/passenger', async (req, res) => {
    let data = await passenger.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.post('/internalshuttle', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is empty" });
        }

        const { shuttleid, flightno, gate, type } = req.body;

        // Custom validation for Logic
        if (!shuttleid) {
            return res.status(400).json({ error: "Shuttle ID is required" });
        }

        if (type === "Internal") {
            if (!flightno || !gate) {
                return res.status(400).json({ error: "Flight Number and Gate Number are required for Internal Shuttles" });
            }
        }

        const data = new internal(req.body);
        await data.save();
        res.status(201).json({ message: "Data Saved Successfully" });

    } catch (err) {
        console.error("Error saving internal shuttle:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/externalshuttle', async (req, res) => {
    if (!req.body) {
        return req.status(400).send("Give the Proper Details")
    }
    const data = new external(req.body);
    await data.save();
    res.status(201).send("Data Saved Successfully");
})

app.post('/adminpass/update', async (req, res) => {
    if (!req.body) {
        return req.status(400).send("Give the Proper Details")
    }
    const data = new admin(req.body);
    await data.save();

    res.status(201).send("Data Saved Successfully");

})

app.post('/flightdetail/add', async (req, res) => {
    if (!req.body) {
        return req.status(400).send("Give the Proper Details")
    }
    const data = new flight(req.body);
    await data.save();
    res.status(201).send("Data Saved Successfully");
})

app.post('/addpassenger', async (req, res) => {
    if (!req.body) {
        return req.status(400).send("Give the Proper Details")
    }
    const data = new passenger(req.body);
    await data.save();
    res.status(201).send("Data Saved Successfully");
})

app.put('/adminpass/updatedetail/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    await flight.findByIdAndUpdate(id, data, { new: true });
    res.send("Data Updated Successfully");
})

app.put('/internalshuttle/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    await internal.findByIdAndUpdate(id, data, { new: true });
    res.send("Data Updated Successfully");
})

app.put('/externalshuttle/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    await external.findByIdAndUpdate(id, data, { new: true });
    res.send("Data Updated Successfully");
})

// /flightdetail/fli/${flightNo}

app.put('/flightdetail/fli/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    await flight.findByIdAndUpdate(id, data, { new: true });
    res.send("Data Updated Successfully");
})

app.put('/staff/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    await staffmodel.findByIdAndUpdate(id, data, { new: true });
    res.send("Data Updated Successfully");
})


app.delete('/internalshuttle/:id', async (req, res) => {
    const id = req.params.id;
    await internal.findByIdAndDelete(id);
    res.send("Data Deleted Successfully");
})

app.delete('/externalshuttle/:id', async (req, res) => {
    const id = req.params.id;
    await external.findByIdAndDelete(id);
    res.send("Data Deleted Successfully");
})

app.delete('/flightdetail/:id', async (req, res) => {
    const id = req.params.id;
    await flight.findByIdAndDelete(id);
    res.send("Data Deleted Successfully");
})

// app.delete('/todo/:id',async (req,res)=>{
//     const id = req.params.id;
//     await Tasks.findByIdAndDelete(id);
//     res.send("Data Deleted Successfully");
// })




app.get('/runwaystatus', async (req, res) => {
    try {
        let data = await runwaystatus.find();
        if (data.length === 0) {
            // Seed initial data if empty
            const seedData = [
                { gate: "Gate A1", runwayCode: "02L", status: "Available" },
                { gate: "Gate B3", runwayCode: "02R", status: "In Use" }
            ];
            data = await runwaystatus.insertMany(seedData);
        }
        res.json(data);
    } catch (err) {
        console.error("Error fetching runway status:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.put('/runwaystatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Available", "In Use", "Maintenance"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const updatedRunway = await runwaystatus.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedRunway) {
            return res.status(404).json({ error: "Runway not found" });
        }

        res.json(updatedRunway);
    } catch (err) {
        console.error("Error updating runway status:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})