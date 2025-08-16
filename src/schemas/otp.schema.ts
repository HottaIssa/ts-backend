import { Document, model, Schema } from "mongoose";

export type TOtp = {
  email: string;
  code: string;
  expiricy: Date;
};

export interface IOtp extends TOtp, Document {}

const EXP_SECONDS: number = parseInt(process.env.OTP_EXP_SECONDS ?? "300");

const otpSchema = new Schema(
  {
    email: {
      type: String,
    },
    code: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: {
        expires: EXP_SECONDS,
        partialFilterExpression: { verified: false },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: EXP_SECONDS,
    },
  },
  {
    timestamps: true,
    expiresAfterSeconds: EXP_SECONDS,
  },
);

const Otp = model("otp", otpSchema);

export default Otp;
