# High-Level Design

A high-level design document  (must be in Markdown). It should include the following (at a minimum):

1. Project motivation: why are you doing it? Who will it benefit (students, senior citizens, teachers, disabled, travelers, etc.)
- We decided to go with this project because it may benefit a real company that needs a wesbite. Tiki Taxi is a new up and coming business in the Hampton Beach area that started April of 2025. This will benefit the business owners and the users of the service. The service is a uber style design where the user will request a ride and the driver will go pick them up to drive them where they want to go. This business is aimed to lower the chances of people drinking and driving, but also open to anyone looking for a ride to get somewhere quicker. 
  
3. List of which project parts will be (at least initially) worked on by which team member(s).
- Dominic will be working on the frontend UI. Collins will be helping me with the frontend work. Sam will be working on the backend.

4. List of external data sources or services that will be used.
- We will add in a map into the website so possibly we will be using leaflet. We will add in libraries with UI tools for the frontend but I am not sure which ones yet. 

**CORE GOALS:**  
- Riders can request rides quickly and easily from their phone on the website.
- Drivers can receive the ride requests, accept them, and update the status.
- Business owners can manage rides/ view past rides/ and basic settings.

**MAIN USER TYPES:**  
1. The Rider
      - Requests the rides from the website
      - See the wait time, status, and the driver information possibly.
      - Receive updates from driver if driver sends some.
2. The Driver
      - See incoming requests real time and on a map.
      - Accepts or declines request
      - Can send message to requester.
3. Business Owners
      - Can view all rides in the past and present
      - Manage owners accounts.
      - Configures the updates on the pages with prices or specialties going on.

**ARCHITECTURE**  
Frontend (React + vite)  
        |  
BackendAPI (Node.js + Express)  
        |   
Database (MongoDB/ PostgreSQL)  


