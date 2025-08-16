import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

class EmailService {
  async sendEmail(email: string, code: string) {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Código de verificación",
      html: `Este es tu código de verificación: <strong>${code}</strong>`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

const emailService = new EmailService();

export default emailService;
