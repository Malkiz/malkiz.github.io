Deploying your Google Apps Script from your GitHub repository requires you to manually perform the setup steps within your Google account, as Google has no direct integration with GitHub for automatic deployment.

Here are the steps to deploy the script and configure the entire comments system.

### 1. Set up the Google Services

* **Create the Google Form:** Go to [Google Forms](https://forms.google.com/) and create a new form with fields for Name, Comment, and Post URL.
* **Create the Google Sheet:** In the Responses tab - Link the form to a new Google Sheet to store the responses.
* **Create the Apps Script Project:** Go to the comments Google Sheet, then select **Extensions > Apps Script**. Copy the code from `Code.gs` into the Apps Script editor.
* **Show manifest file:** In the Apps Script editor, click Settings (gear icon) > Show "appsscript.json" manifest file in editor.
* **Set Permissions:** Copy the `appsscript.json` file from this directory into the Apps Script editor. This file configures the script's permissions and settings.

***

### 2. Deploy the Apps Script

* **Deploy as a Web App:** In the Apps Script editor, click **Deploy > New deployment**.
* **Configure Deployment:** Choose "Web app" as the type, set "Who has access" to **Anyone**, and click **Deploy**.
* **Authorize the Script:** The first time you deploy, you will be prompted to authorize the script. Follow the steps to grant it the necessary permissions.
* **Get the URL:** Once deployed, copy the unique Web App URL. This is the endpoint your Jekyll site will use for comments.

***

### 3. Update Your Jekyll Site

* **Update Your Jekyll Configuration:** In your `_config.yml` file, add the Apps Script URL you just copied.
* **Commit and Push:** Commit these changes to your GitHub repository and push them to GitHub Pages. This will update your live blog with the new comments functionality.
