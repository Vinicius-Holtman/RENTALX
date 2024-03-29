import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer"
import fs from "fs"
import handlebars from "handlebars"

@injectable()
class EtherealMailProvider implements IMailProvider {
  private cliente: Transporter

  constructor() {
    nodemailer
    .createTestAccount()
    .then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.cliente = transporter;
    })
    .catch((err) => console.error(err))
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContent)

    const templateHtml = templateParse(variables)

    const message = await this.cliente.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHtml
    })

    console.log("Message sent: %s", message);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider }