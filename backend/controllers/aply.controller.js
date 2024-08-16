import Aply from "../models/aply.model.js";
import nodemailer from "nodemailer";
import mjml2html from "mjml";
import dotenv from "dotenv";

dotenv.config();
// MJML email template
const mjmlTemplate = `
<mjml>
  <mj-body background-color="#f4f4f4" font-size="13px">
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-image src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png" alt="" align="center" border="none" width="600px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009FE3" vertical-align="top" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-text align="left" color="#ffffff" font-size="45px" font-weight="bold" font-family="Open Sans, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Welcome aboard</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009fe3" padding-bottom="20px" padding-top="20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="left" color="#ffffff" font-size="22px" font-family="Open Sans, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">
          <span style="color:#FEEB35">Hello {{fullName}},</span><br /><br />
          Welcome to DEV-SERVICES.
        </mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="Open Sans, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">
          Thank you for choosing DEV-SERVICES ! We're thrilled that you've applied for our services. Your application has been received and we'll get back to you shortly. If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:miranjatracy@gmail.com" style="color: #FEEB35;">miranjatracy@gmail.com</a>
        </mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="Open Sans, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">
          Thanks,<br />
          The DEV-SERVICES Team
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column width="33.33%">
        <mj-image src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Service 1" width="150px" padding="10px"></mj-image>
        <mj-text align="center" color="#333333" font-size="16px" font-family="Open Sans, Helvetica, Arial, sans-serif" padding="10px">Web development</mj-text>
      </mj-column>
      <mj-column width="33.33%">
        <mj-image src="https://images.pexels.com/photos/2447046/pexels-photo-2447046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Service 2" width="150px" padding="10px"></mj-image>
        <mj-text align="center" color="#333333" font-size="16px" font-family="Open Sans, Helvetica, Arial, sans-serif" padding="10px">App development</mj-text>
      </mj-column>
      <mj-column width="33.33%">
        <mj-image src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Service 3" width="150px" padding="10px"></mj-image>
        <mj-text align="center" color="#333333" font-size="16px" font-family="Open Sans, Helvetica, Arial, sans-serif" padding="10px">UI designer</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009fe3" padding="20px">
      <mj-column width="100%">
        <mj-social font-size="15px" icon-size="30px" mode="horizontal">
          <mj-social-element name="facebook" href="https://www.facebook.com/TechSolSoftwareKenya" background-color="#009fe3"></mj-social-element>
          <mj-social-element name="twitter" href="https://twitter.com/TechSolKenya" background-color="#009fe3"></mj-social-element>
          <mj-social-element name="linkedin" href="https://www.linkedin.com/company/techsol-software-kenya" background-color="#009fe3"></mj-social-element>
          <mj-social-element name="instagram" href="https://www.instagram.com/TechSolKenya" background-color="#009fe3"></mj-social-element>
        </mj-social>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column width="100%">
        <mj-text align="center" color="#333333" font-size="12px" font-family="Open Sans, Helvetica, Arial, sans-serif">
          © 2024 TechSol Software Kenya. All rights reserved.<br />
          <a href="#" style="color: #009fe3;">Privacy Policy</a> | <a href="#" style="color: #009fe3;">Terms of Service</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: "tchasingajacques@gmail.com",
    pass: "jetr ilme zxaz fmvl"
  },
});

export const createAply = async (req, res) => {
  const { fullName, email, typeofservices, description, imageUrls } = req.body;

  try {
    const newAply = new Aply({ fullName, email, typeofservices, description, imageUrls });
    await newAply.save();

    res.status(201).json({
      success: true,
      message: 'Your application was sent successfully',
      data: newAply,
    });

    // Replace placeholder in MJML template
    const mjmlWithFullName = mjmlTemplate.replace('{{fullName}}', fullName);

    // Convert MJML to HTML
    const { html: emailHtml } = mjml2html(mjmlWithFullName);

    // Sending email to the user
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your application was sent successfully',
      html: emailHtml,
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(409).json({
      success: false,
      message: 'Aply creation failed, please check your code',
      error: error.message,
    });
  }
};

// this will be used to view all the aplys in our admin pages
export const getAply = async (req, res) => {
  try {
      const aplys = await Aply.find().sort({ createdAt: -1 });
      res.status(200).json({
          success: true,
          message: 'Aplys fetched successfully',
          data: aplys,
      });
  } catch (error) {
      res.status(404).json({
          success: false,
          message: 'Aplys not found',
          error: error.message,
      });
  }
}


// this will used to be aplied in our admins pages to view the aply details
export const getAplyById = async (req, res) => {
    const { id } = req.params;
    try {
        const aply = await Aply.findById(id);
        res.status(200).json({
            success : true,
            message : 'Aply fetched by signle data successfully',
            data : aply,
        });
    } catch (error) {
        res.status(404).json({
            success : false,
            message : 'Aply not found',
            error : error,
        });
    }
}

export const singout = (req, res, next) => {
  try {
    res.clearCookie("access_token").json({
      message: "Signout successfully",
    });
  } catch (error) {
    next(error);
  }
};
