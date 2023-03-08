const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const complaintSchema = new Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  zipCode: { type: String, required: true },
  severityLevel: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model("complaints", complaintSchema);

class Complaints {
  static async grabComplaintsFromDB() {
    try {
      const complaints = await Complaint.find({}).sort({ createdAt: -1 });
      return complaints;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createComplaintToDB(userId, title, description, zipCode, severityLevel) {
    try {
      const newComplaint = await Complaint.create({ userId, title, description, zipCode, severityLevel });
      return newComplaint;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Complaints, Complaint };

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
});
