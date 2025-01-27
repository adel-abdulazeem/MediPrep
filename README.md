# **MediPrep Guide**

## **Overview**

**MediGuide** is a web application designed to assist medical staff, especially nursing staff, in preparing medication doses accurately. The application provides information on compatible solutions for diluting medications (especially antibiotics), stability after reconstitution (even for the same product manufactured by different companies), optimal storage conditions, and preparation methods. The data is regularly updated by a team of pharmacists and approved by a committee president to ensure accuracy and reliability.

## **Key Features**

1. **Search Functionality:**
   - Users can search for medications by name to retrieve detailed information.
2. **Pharmacist Management:**
   - Pharmacists can add and update medication data.
3. **Approval Workflow:**
   - A committee president reviews and approves or rejects updates.
4. **Search Logs Analysis:**
   - Search logs are stored to analyze trends and optimize the database.
5. **Notifications:**
   - Push notifications via APIs like Twilio to notify users about approved updates.
6. **Authentication:**
   - Secure authentication using Passport.js local strategy.

---

## **User Roles**

### **1. Pharmacist**

- **Capabilities:**
  - Add new medication data.
  - Update existing medication details.
  - View the status of submitted updates.

### **2. Committee President**

- **Capabilities:**
  - View submitted updates from pharmacists.
  - Approve or reject updates.
  - Provide feedback on rejected updates.

### **3. Low-End User (Nurse/Staff)**

- **Capabilities:**
  - Search for medication details.
  - View approved information about medications.

---

## **Stack Overview**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** React
- **Authentication:** Passport.js (local strategy)
- **Notifications:** Twilio API
---

## **Push Notifications with Twilio**

- Triggered after a committee president approves a medication update.
- Sends a notification to relevant users about the update.
---

## **Future Enhancements**

1. Add multi-language support for a global audience.
3. Build a mobile app for better accessibility.
4. Include reminders for medications with short stability periods.

---

## **Conclusion**

MediGuide is designed to streamline the workflow for medical staff, ensuring they have reliable, up-to-date information about medication preparation and storage. This system will enhance patient safety, optimize nursing time, and ensure accountability for pharmacists.

