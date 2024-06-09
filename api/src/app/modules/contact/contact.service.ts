import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { Transporter } from '../../../helpers/Transporter';

interface ContactPayload {
    email: string;
    firstName: string;
    lastName: string;
    subject: string;
    text: string;
}

const contactUs = async (payload: ContactPayload): Promise<{ message: string }> => {
    const { email, firstName, lastName, subject, text } = payload;

    if (!email || !firstName || !lastName || !subject || !text) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Missing required fields!');
    }
    try {
        const fixedMessage = `<b>Thanks for mailing us, We have received your mail.</b>`;
        const mailOptions = {
            from: `"${firstName + ' ' + lastName}" <${email}>`,
            to: email,
            subject: subject,
            html: `<pre>${text}</pre><br><p>${fixedMessage}</p>`
        };
        await Transporter.sendMail(mailOptions);
        return {
            message: "Successful message has been sent!"
        }
    } catch (error) {
        throw new ApiError(httpStatus.NO_CONTENT, "Unable to send message!")
    }
}

export const ContactService = {
    contactUs
}
