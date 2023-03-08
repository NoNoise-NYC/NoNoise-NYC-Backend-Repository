const {Complaints} =  require('../model/complaintsModel');

class ComplaintsController {
  static async createComplaint(userId, title, description, zipCode, severityLevel) {
    try {
      const newComplaint = await Complaints.create({ userId, title, description, zipCode, severityLevel });
      return newComplaint;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getComplaints() {
    try {
      const complaints = await Complaints.grabComplaintsFromDB()
      return complaints;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getComplaintsByUser(userId) {
    try {
      const complaints = await Complaints.find({ userId }).sort({ createdAt: -1 });
      return complaints;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ComplaintsController;
