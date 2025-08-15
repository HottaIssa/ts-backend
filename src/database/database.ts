import { connect } from "mongoose";

export async function ConnectDatabase() {
  try {
    await connect(process.env.MONGO_URL ?? "");
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log(`A ocurrido un error con la base de datos ${e}`);
  }
}
