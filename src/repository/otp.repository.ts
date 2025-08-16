import OtpModel from "../schemas/otp.schema";

interface OtpDTO {
  email: string;
  code: string;
}

class OtpRepository {
  async create(otp: OtpDTO) {
    const addedOtp = new OtpModel(otp);
    return await addedOtp.save();
  }

  async find(email: string) {
    const addedOtp = await OtpModel.findOne({ email });
    if (!addedOtp) {
      throw new Error("Código no encontrado");
    }

    return addedOtp;
  }
}

const otpRepository = new OtpRepository();

export default otpRepository;
