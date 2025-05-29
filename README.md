# MediCare - Medical Website for College Project

A responsive medical website designed for a college project, with AWS cloud integration for backend services.

## Project Overview

MediCare is a comprehensive medical website template that includes features such as:

- Responsive design for all device sizes
- Appointment booking system
- Doctor profiles
- Medical services information
- Contact form
- AWS cloud integration

## Project Structure

```
├── index.html              # Homepage
├── services.html           # Services page
├── appointments.html       # Appointment booking page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Main JavaScript functionality
│   └── aws-config.js       # AWS configuration and integration
├── aws-deploy.json         # AWS CloudFormation template
└── README.md               # Project documentation
```

## Technologies Used

- HTML5, CSS3, JavaScript
- Font Awesome for icons
- jQuery for DOM manipulation
- AWS Services:
  - S3 for static website hosting
  - CloudFront for content delivery
  - DynamoDB for database storage
  - Lambda for serverless functions
  - API Gateway for RESTful APIs

## AWS Deployment Instructions

### Prerequisites

1. An AWS account
2. AWS CLI installed and configured with appropriate credentials
3. Basic knowledge of AWS services

### Deployment Steps

1. **Create an S3 bucket for website hosting**

   ```bash
   aws s3 mb s3://medicare-college-website --region us-east-1
   ```

2. **Upload website files to S3**

   ```bash
   aws s3 sync . s3://medicare-college-website --exclude "aws-deploy.json" --exclude "README.md"
   ```

3. **Deploy AWS resources using CloudFormation**

   ```bash
   aws cloudformation create-stack --stack-name medicare-website --template-body file://aws-deploy.json --capabilities CAPABILITY_IAM
   ```

4. **Monitor the stack creation**

   ```bash
   aws cloudformation describe-stacks --stack-name medicare-website
   ```

5. **Get the CloudFront URL**

   Once the stack is created successfully, you can get the CloudFront URL from the stack outputs:

   ```bash
   aws cloudformation describe-stacks --stack-name medicare-website --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" --output text
   ```

6. **Update AWS configuration**

   After deployment, update the `js/aws-config.js` file with the actual API Gateway endpoint and other AWS resource IDs from the CloudFormation stack outputs.

### Alternative Deployment with AWS Amplify

For an easier deployment process, you can use AWS Amplify:

1. Create a repository for your project (GitHub, GitLab, etc.)
2. Push your code to the repository
3. Go to AWS Amplify Console in the AWS Management Console
4. Click "Connect app" and follow the instructions to connect your repository
5. Configure build settings and deploy

## Local Development

To run the website locally for development:

1. Clone the repository or download the files
2. Open the project folder in your code editor
3. Use a local development server to serve the files (e.g., Live Server extension in VS Code)
4. Open `index.html` in your browser

## AWS Services Configuration

### API Gateway

The website uses API Gateway to handle form submissions. The API has two endpoints:

- `/appointments` - For appointment booking
- `/contact` - For contact form submissions

### DynamoDB

Two DynamoDB tables are used:

- `MediCare_Appointments` - Stores appointment bookings
- `MediCare_ContactForm` - Stores contact form submissions

### Lambda Functions

Two Lambda functions process the form submissions:

- `MediCare_AppointmentHandler` - Processes appointment bookings
- `MediCare_ContactFormHandler` - Processes contact form submissions

## Customization

To customize the website for your needs:

1. Replace the placeholder images in the `images` folder with your own
2. Update the content in the HTML files
3. Modify the CSS styles in `css/styles.css`
4. Update the AWS configuration in `js/aws-config.js` with your own AWS resources

## License

This project is created for educational purposes as part of a college project.

## Acknowledgements

- Font Awesome for icons
- jQuery for JavaScript functionality
- AWS for cloud services
