import OtpRepository from "../repository/otp.repository";
import { encrypt } from "../utils/encript";
import EmailService from "./email.service";

class OtpServices {
  async get(email: string) {
    return OtpRepository.find(email);
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async create(email: string) {
    try {
      const code = this.generateOTP();
      const encryptedCode = await encrypt(code.toString());

      await OtpRepository.create({ email, code: encryptedCode });
      await EmailService.sendEmail(email, code.toString());
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

const otpService = new OtpServices();

export default otpService;
