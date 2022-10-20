# How to run

1. Open project in Intellij
2. Go to Register.js and change `change_email_here@gmail.com` with user email you want to register
3. Then select `Bearer ACCESS_TOKEN` token, click `CTRL + SHIFT + R` and replace all occurrences with your access token obtained from swagger. (3 occurrences)
4. Build application with `npm install` (skip this step if you have already done this)
5. Start application with `npm start`
6. Start forwarding webhooks with `stripe listen --forward-to localhost:8080/api/v1/payment/webhooks`
