import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.post("/", (req, res) => {
  const { Cname, Cemail, Cdesignation, Csalary, Mname, Mdesignation, CPhone, CDOJ, CDepartment, CSubDepartment, CState, CCity, CPin, CAnnual, CVariable } = req.body.formData;
  try {
    const doc = new PDFDocument();
    const distanceMargin = 18;

    doc.lineWidth(20)
       .lineJoin('round')
       .stroke();

    const maxWidth = 140;
    const maxHeight = 70;

    // Image with bottom margin
    doc.image(
      './Assets/Logomark.png',
      // doc.page.width / 2 - maxWidth / 2
      40,
      60,
      {
        fit: [maxWidth, maxHeight],
        align: 'center',
        valign: 'center',
        margin: {
          top: 50,
          bottom: 50,
          left: 72,
          right: 72
        }
      }
    );


    // Adding a margin below the image
    const bottomMargin = 150;

    let filename = `${Cname}_offer_letter.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');


    const content = `
                                                                                                            TruAD 
                                                                                                            Andheri East
                                                                                                            Mumbai 
                                                                                                            MAHARASHTRA 
                                                                                                            400072

${Cname},
${CPhone}
${Cemail}
${CCity},
${CState},
${CPin},
                                                      Offer of Employment
Dear ${Cname},

Further to our discussions, we are pleased to appoint you as ${Cdesignation} with TruAD, as per the terms and conditions stated below:

1. Your offer letter is valid till ${CDOJ}, and you are required to confirm acceptance of the offer and join on ${CDOJ}. If you do not confirm your acceptance, this offer is treated as withdrawn. To confirm your acceptance of this offer, you are required to respond via email to rohann@truad.co.

2. Reporting and Responsibilities:
   You will report to the undersigned and complete the joining formalities. Your working location will be at Mumbai. We will communicate your reporting manager on joining the organization and completing the joining formalities.

   Note: On your joining date, please bring soft copies of:
   - The original offer letter duly signed and dated by you
   - Passport size photograph (soft copy)
   - The originals and 1 set of soft copies of the following documents:
     * Education degree certificate
     * Relieving letter or resignation acceptance letter from your most recent employer
     * Proof of identity (AADHAR card/Passport and PAN card mandatory)
   Please note that all the above documents are mandatory, and you will not be allowed to join without them.

3. Compensation:
   During your probation period, you will be eligible for a compensation of INR ${CAnnual} per annum as CTC (Cost to Company). Your compensation and other benefits, if any, shall be subject to deductions of all Governmental and local taxes, statutory contributions, etc., as required to be made under the laws of India and shall be paid in accordance with the practices of the Company.

4. Working hours:
   a. Your working hours are from 9:30 am to 6:30 pm, Monday to Friday.
   b. The Company reserves the right to require you to work outside your normal working hours if necessary, in furtherance of your duties.
   c. You will be eligible for leave and other benefits as per the rules of the company.

5. Responsibilities:
   You must effectively, diligently, and to the best of your ability perform all responsibilities and duties and ensure successful completion of the assignments given to you by your reporting manager.

6. Non-disclosure obligations and intellectual property:
   At all times during and after your employment, you will hold in strictest confidence and not use for your own purposes or disclose any intellectual property belonging to the Company without prior authorization in writing by the Company. All work created during your employment is the exclusive property of the Company.

7. Confidentiality:
   You will comply with the confidentiality policy of the Company and maintain as secret the confidential information obtained during your employment. This covenant shall endure during the employment and shall survive the cessation of your Contract with the Company.

8. Company property:
   Any and all company property must be returned upon cessation of employment. You may be held financially responsible for any lost or damaged property.

9. Notice of Change:
   Any change in your personal information should be notified to the Company in writing within 7 days.

10. Termination:
    a. During the probation period, either party may terminate this contract by giving 30 days notice in writing or payment in lieu of salary.
    b. The Company reserves the right to terminate your services for misconduct or other serious issues without prior notice.

11. Exclusivity / Prior Commitment:
    You agree to work exclusively for the Company and not to accept any other employment during your tenure.

12. Non-Compete / Non-Solicit:
    You agree not to compete with the Company or solicit its employees or clients for a period of twelve months after termination.

13. Notices:
    All notices required to be given shall be in writing and delivered personally or by mail.

14. Jurisdiction:
    This contract shall be governed by the laws of India and jurisdiction will be with the courts in Maharashtra.

15. Incentive:
    You shall be entitled to performance-based incentives as determined by the Company.

16. Variable Pay:
    Your compensation package may include variable pay, subject to company policy and performance evaluation.

With best wishes, 
For TruAD

${Mname}
${Mdesignation}

Candidate Undertaking:

I have carefully read and understood the terms and conditions mentioned above. I accept all the terms and conditions mentioned therein.

Name:     Date:     Signature: 
    `;

    doc.text(content, 50, 40,{
      align: 'left',
      indent: 20,
      paragraphGap: 10,
      lineGap: 4,
      baseline: 'middle'
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).send('Error generating PDF');
  }
});

export default app;
