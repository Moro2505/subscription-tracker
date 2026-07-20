export const generateEmailTemplate = ({
userName,
subscriptionName,
renewalDate,
planName,
price,
paymentMethod,
accountSettingsLink = '#',
supportLink = '#',
daysLeft
}) => {
const formattedDate = new Date(renewalDate).toLocaleDateString('en-US', {
placeholder: 'yyyy-mm-dd',
year: 'numeric',
month: 'long',
day: 'numeric'
});
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Subscription Renewal Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; color: #333333;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">

<!-- Header -->
<tr>
<td style="background-color: #0070f3; padding: 30px; text-align: center;">
    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Subscription Reminder</h1>
</td>
</tr>
<!-- Body Content -->
<tr>
<td style="padding: 40px 30px;">
    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #555555;">Hi <strong>${userName}</strong>,</p>
    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #555555;">
    This is a friendly reminder that your subscription for <strong>${subscriptionName}</strong> is scheduled to renew in <span style="color: #ff3366; font-weight: bold;">${daysLeft} days</span>.
    </p>
    <!-- Details Card -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
    <tr>
        <td style="padding-bottom: 10px; font-size: 14px; color: #64748b;"><strong>Plan Name:</strong></td>
        <td style="padding-bottom: 10px; font-size: 14px; color: #1e293b; text-align: right;">${planName}</td>
    </tr>
    <tr>
        <td style="padding-bottom: 10px; font-size: 14px; color: #64748b;"><strong>Amount to Charge:</strong></td>
        <td style="padding-bottom: 10px; font-size: 14px; color: #1e293b; text-align: right; font-weight: 600;">$${price}</td>
    </tr>
    <tr>
        <td style="padding-bottom: 10px; font-size: 14px; color: #64748b;"><strong>Renewal Date:</strong></td>
        <td style="padding-bottom: 10px; font-size: 14px; color: #1e293b; text-align: right;">${formattedDate}</td>
    </tr>
    <tr>
        <td style="font-size: 14px; color: #64748b;"><strong>Payment Method:</strong></td>
        <td style="font-size: 14px; color: #1e293b; text-align: right;">${paymentMethod}</td>
    </tr>
    </table>
    <!-- Action Button -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 30px;">
    <tr>
        <td align="center" style="border-radius: 6px; background-color: #0070f3;">
        <a href="${accountSettingsLink}" target="_blank" style="display: inline-block; padding: 14px 30px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">Manage Subscription</a>
        </td>
    </tr>
    </table>
    <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
    If you wish to make changes to your plan or update your payment details, please visit your account settings before the renewal date.
    </p>
</td>
</tr>
<!-- Footer -->
<tr>
<td style="padding: 20px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
    <p style="margin: 0 0 10px 0;">Need help? Contact our <a href="${supportLink}" style="color: #0070f3; text-decoration: none;">Support Team</a>.</p>
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Subscription Tracker. All rights reserved.</p>
</td>
</tr>
</table>
</body>
</html>
`;
};
export const generateExpiredEmailTemplate = ({
userName,
subscriptionName,
price,
renewLink = '#',
}) => {
return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Expired</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; color: #333333;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eef2f1;">
        <!-- Header -->
        <tr>
        <td style="background-color: #e11d48; padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Subscription Expired 🔔</h1>
        </td>
        </tr>
        <!-- Body Content -->
        <tr>
        <td style="padding: 40px 30px;">
            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #555555;">Hi <strong>${userName}</strong>,</p>
            <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #555555;">
            We would like to inform you that your subscription for <strong>${subscriptionName}</strong> has expired today.
            </p>
            
            <!-- Info Card -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 30px;">
            <tr>
                <td style="padding: 20px;">
                <table role="presentation" cellspacing="0" cellpadding="10" border="0" width="100%">
                    <tr>
                    <td width="35%" style="font-size: 14px; color: #666666; font-weight: bold; padding: 5px 0;">Plan Name:</td>
                    <td style="font-size: 14px; color: #333333; padding: 5px 0;">${subscriptionName}</td>
                    </tr>
                    <tr>
                    <td style="font-size: 14px; color: #666666; font-weight: bold; padding: 5px 0;">Previous Price:</td>
                    <td style="font-size: 14px; color: #333333; padding: 5px 0;">${price}</td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>

            <p style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.5; color: #666666;">
            If you wish to continue enjoying this service without interruption, you can easily renew your subscription at any time by clicking the button below.
            </p>

            <!-- Action Button -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 20px;">
            <tr>
                <td style="border-radius: 5px; background-color: #e11d48; text-align: center;">
                <a href="${renewLink}" target="_blank" style="background-color: #e11d48; border: 1px solid #e11d48; border-radius: 5px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: bold; padding: 12px 24px; text-decoration: none;">Renew Subscription Now 🚀</a>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
`;
};

export const emailTemplates = [
{
    label: "7 days before reminder",
    generateSubject: (data) => `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 })
},
{
    label: "5 days before reminder",
    generateSubject: (data) => `⏳ Upcoming Renewal: 5 Days Left for ${data.subscriptionName}`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 })
},
{
    label: "2 days before reminder",
    generateSubject: (data) => `⚠️ Action Required: Your ${data.subscriptionName} Subscription Renews in 2 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 })
},
{
    label: "1 day before reminder",
    generateSubject: (data) => `🚨 Final Notice: Your ${data.subscriptionName} Subscription Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 })
},
{
    label: "expired",
    generateSubject: (data) => `Your subscription for ${data.subscriptionName} has expired 🔔`,
    generateBody: (data) => generateExpiredEmailTemplate({
    userName: data.userName,
    subscriptionName: data.subscriptionName,
    price: data.price,
    })
}
];
