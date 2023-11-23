
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://home:home@cluster0.sulz4do.mongodb.net/OPENAI?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res)=>console.log("db is connected")).catch((err)=>console.log(`not connected db`,err))
