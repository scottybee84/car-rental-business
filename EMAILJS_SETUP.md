# EmailJS Setup Guide

## Current Configuration

Your Service ID is already set: `service_gix2268`

## Step 1: Get Your Public Key

1. Go to your EmailJS dashboard: https://dashboard.emailjs.com
2. Click on **Account** in the left sidebar
3. Click on **General** 
4. Find your **Public Key** (it looks like: `xxxxxxxxxxxxxxxxxxxxx`)
5. Copy it and update `.env` file:
   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

## Step 2: Create an Email Template

1. In EmailJS dashboard, go to **Email Templates** in the left sidebar
2. Click **"+ Create New Template"**
3. Choose your service: **Gmail** (service_gix2268)
4. Configure the template:

### Template Settings:
- **Template Name**: Tesla Rental Inquiry (or any name you prefer)
- **Subject**: New Tesla Rental Inquiry - {{customer_name}}

### Email Content:
Use this template:

```
New Tesla Rental Inquiry

Customer Information:
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

Rental Details:
Pickup Date: {{pickup_date}}
Return Date: {{return_date}}
Pickup Location: {{pickup_location}}
Return Location: {{return_location}}
Duration: {{rental_days}} days
Rate Type: {{rate_type}}

Pricing:
Daily Rate: {{daily_rate}}
Airport Fee: {{airport_fee}}
Total Price: {{total_price}}

Message:
{{customer_message}}
```

### Template Variables Used:
- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{customer_message}}`
- `{{pickup_date}}`
- `{{return_date}}`
- `{{pickup_location}}`
- `{{return_location}}`
- `{{rental_days}}`
- `{{rate_type}}`
- `{{daily_rate}}`
- `{{airport_fee}}`
- `{{total_price}}`

5. Click **Save**
6. Copy the **Template ID** (it looks like: `template_xxxxxxxx`)
7. Update `.env` file:
   ```
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   ```

## Step 3: Update .env File

Edit the `.env` file in the root of your project and replace:
- `YOUR_TEMPLATE_ID` with your actual template ID
- `YOUR_PUBLIC_KEY` with your actual public key

## Step 4: Restart Your Dev Server

After updating the `.env` file, restart your development server:
```bash
npm run dev
```

## Testing

1. Fill out the booking form on your website
2. Click "Check Availability"
3. Fill out the contact form in the modal
4. Submit the form
5. Check your email (scottybee@gmail.com) for the inquiry

## Troubleshooting

- Make sure all three values in `.env` are set correctly
- Ensure the template variables match exactly (case-sensitive)
- Check the browser console for any error messages
- Verify your EmailJS service is connected and active


