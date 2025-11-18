# TESTING.md

This document outlines how our team will verify that each part of the project is working properly. We use **React**, **Vite**, **Express.js**, and **Vitest** for development and testing.

---

## 1. Frontend (React + Vite)

### **Unit Testing (Vitest + React Testing Library)**

- Test individual components for correct rendering and state updates.
- Verify user interactions such as button clicks, form submissions, and navigation.

### **Integration Testing**

- Test component groups to ensure data flows properly through props, context, or global state.

### **Manual UI Testing**

- Run `npm run dev` and manually test core user flows.
- Check responsiveness and layout on desktop and mobile dimensions.

---

## 2. Backend (Express.js)

### **Unit Testing (Vitest)**

- Test utility functions, controllers, middleware, and validation logic.
- Mock database calls to isolate backend logic.

### **API Endpoint Testing**

- Use **supertest** or Vitest's fetch mocks to test Express routes.
- Validate proper status codes, returned data structures, and error handling.

### **Integration Testing**

- Test API endpoints hitting a test database instance (local or in-memory).
- Confirm backend communicates correctly with external services if applicable.

---

## 3. Build & Deployment Testing

### **Vite Build Verification**

- Run `npm run build` to ensure no compilation errors.
- Test the production build locally with `vite preview`.

### **Server Testing**

- Confirm Express.js runs without runtime errors after deployment.
- Verify API responses behave the same in production as in development.

---

## 4. Continuous Testing Practices

- All pull requests trigger automated test runs (Vitest).
- Code coverage monitored to maintain minimum requirements.
- Developers write tests for new features before merging.

---

## Summary

Our testing strategy ensures reliable functionality across the entire stack—React UI, Express backend, and integration points—using Vitest as the core test runner. This structured approach helps maintain quality and stability throughout development.
