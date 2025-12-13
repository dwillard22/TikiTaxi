# OAuth Setup Guide for TikiTaxi

This guide will help you configure Google and Apple OAuth authentication for the TikiTaxi application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Google OAuth Setup](#google-oauth-setup)
- [Apple OAuth Setup](#apple-oauth-setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

## Prerequisites

- A Google Cloud Platform account
- An Apple Developer account (for Apple Sign In)
- Node.js and npm installed
- Access to your project's frontend and backend directories

## Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "New Project"
3. Enter a project name (e.g., "TikiTaxi") and click "Create"

### Step 2: Enable Google+ API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity Services"
3. Click on it and press "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" (unless you have a Google Workspace)
   - Fill in the required information:
     - App name: TikiTaxi
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue" through the scopes and test users steps
4. Back in Credentials, select "Web application" as the application type
5. Add authorized JavaScript origins:
   - `http://localhost:5173` (Vite default port)
   - `http://localhost:3000` (if using different port)
   - Your production domain (e.g., `https://tikitaxi.com`)
6. Add authorized redirect URIs:
   - `http://localhost:5173` (for local development)
   - Your production domain
7. Click "Create"
8. **Copy your Client ID** - you'll need this for your `.env` file

### Step 4: Add Client ID to Environment Variables

Add the Client ID to your `client/.env` file (see example below).

## Apple OAuth Setup

### Step 1: Register Your App with Apple

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Click on "Identifiers" and then the "+" button
4. Select "App IDs" and click "Continue"
5. Select "App" and click "Continue"
6. Fill in:
   - Description: TikiTaxi
   - Bundle ID: `com.tikitaxi.app` (or your preferred bundle ID)
7. Under "Capabilities", enable "Sign In with Apple"
8. Click "Continue" and then "Register"

### Step 2: Create a Service ID

1. In "Identifiers", select "Services IDs" and click "+"
2. Fill in:
   - Description: TikiTaxi Web Service
   - Identifier: `com.tikitaxi.service` (or your preferred service ID)
3. Enable "Sign In with Apple" and click "Configure"
4. Add your domain and redirect URLs:
   - Primary App ID: Select the App ID you created
   - Website URLs:
     - Domains: `localhost` (for development) and your production domain
     - Return URLs: `http://localhost:5173/auth/apple/callback` and production callback URL
5. Click "Save" and then "Continue" and "Register"

### Step 3: Create a Key

1. Go to "Keys" and click "+"
2. Enter a key name (e.g., "TikiTaxi Sign In Key")
3. Enable "Sign In with Apple"
4. Click "Configure" and select your Primary App ID
5. Click "Save" and then "Continue"
6. **Download the key file** (`.p8` file) - you can only download it once!
7. Note the Key ID shown on the page

### Step 4: Add Apple Credentials to Environment Variables

Add the necessary Apple credentials to your `server/.env` file (see example below).

## Environment Variables

### Client Environment Variables (`client/.env`)

Create a `.env` file in the `client` directory with the following:

```env
# Google OAuth Client ID
# Get this from Google Cloud Console > APIs & Services > Credentials
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Backend API URL
# Change this to your production API URL when deploying
VITE_API_URL=http://localhost:3000
```

**Example:**
```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
VITE_API_URL=http://localhost:3000
```

### Server Environment Variables (`server/.env`)

Create a `.env` file in the `server` directory with the following:

```env
# Server Port
PORT=3000

# Google OAuth (Optional - if you need to verify tokens server-side)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth
APPLE_TEAM_ID=your-apple-team-id
APPLE_CLIENT_ID=com.tikitaxi.service
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY_PATH=./path/to/AuthKey_XXXXXXXXXX.p8

# JWT Secret (for generating session tokens)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Example:**
```env
PORT=3000
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
APPLE_TEAM_ID=ABC123DEF4
APPLE_CLIENT_ID=com.tikitaxi.service
APPLE_KEY_ID=XYZ987ABC6
APPLE_PRIVATE_KEY_PATH=./keys/AuthKey_XYZ987ABC6.p8
JWT_SECRET=my-super-secret-jwt-key-min-32-characters-long-for-security
```

## Important Notes

### Security Best Practices

1. **Never commit `.env` files to version control**
   - Add `.env` to your `.gitignore` file
   - Use `.env.example` files as templates (without actual secrets)

2. **Use different credentials for development and production**
   - Create separate OAuth apps for development and production
   - Use environment-specific `.env` files

3. **Keep your secrets secure**
   - Don't share `.env` files publicly
   - Rotate secrets if they're ever exposed

### File Structure

After setup, your project should look like this:

```
TikiTaxi/
├── client/
│   ├── .env                    # Client environment variables
│   └── ...
├── server/
│   ├── .env                    # Server environment variables
│   ├── keys/                   # Store Apple private key here
│   │   └── AuthKey_XXXXX.p8
│   └── ...
└── ...
```

### .gitignore

Make sure your `.gitignore` includes:

```
# Environment variables
.env
.env.local
.env.*.local

# Apple keys
*.p8
keys/
```

## Testing

### Test Google OAuth

1. Start your development server:
   ```bash
   cd client
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`
3. Click "Continue with Google"
4. You should be redirected to Google's sign-in page
5. After signing in, you should be redirected back to your app

### Test Apple OAuth

1. Make sure your Apple Sign In is configured
2. Navigate to `http://localhost:5173/login`
3. Click "Continue with Apple"
4. You should see Apple's sign-in interface
5. After signing in, you should be redirected back to your app

### Troubleshooting

**Google OAuth not working:**
- Verify your `VITE_GOOGLE_CLIENT_ID` is correct
- Check that your redirect URI matches exactly in Google Console
- Ensure your JavaScript origin is authorized
- Check browser console for errors

**Apple OAuth not working:**
- Verify all Apple credentials are correct
- Ensure the private key file path is correct
- Check that your service ID is properly configured
- Verify redirect URIs match in Apple Developer Portal

**CORS errors:**
- Make sure your backend CORS settings allow your frontend origin
- Check that `VITE_API_URL` matches your backend URL

## Next Steps

After setting up OAuth:

1. Test both Google and Apple authentication flows
2. Implement user session management
3. Add user profile pages
4. Set up database to store user information
5. Implement logout functionality
6. Add error handling and user feedback

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)

