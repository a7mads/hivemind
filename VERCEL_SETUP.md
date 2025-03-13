# Setting up GSAP Authentication in Vercel

To use GSAP premium plugins (Club GreenSock) in your Vercel deployment, you need to set up authentication with your GSAP account. Follow these steps:

## 1. Get your GSAP authentication token

1. Log in to your GreenSock account at [https://greensock.com/account/](https://greensock.com/account/)
2. Navigate to the "API Keys" section
3. Copy your npm token (it should look something like `01234567-89ab-cdef-0123-456789abcdef`)

## 2. Add the token to Vercel environment variables

1. Go to your project in the Vercel dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add a new environment variable:
   - Name: `GSAP_TOKEN`
   - Value: Your GSAP npm token that you copied in step 1
   - Environments: Production, Preview, Development (check all)
5. Click "Save"

## 3. Redeploy your project

1. Go to the "Deployments" tab
2. Find your latest deployment
3. Click the three dots menu (⋮) and select "Redeploy"
4. Wait for the deployment to complete

Your project should now successfully build with the GSAP premium plugins.

## Troubleshooting

If you still encounter authentication issues:

1. Verify that the environment variable is correctly set
2. Make sure your GSAP account is active and in good standing
3. Check that the package.json and .npmrc files are correctly configured
4. Try a fresh deployment by pushing a small change to your repository 